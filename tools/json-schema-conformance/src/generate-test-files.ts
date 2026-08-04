import { existsSync } from "node:fs";
import {
  mkdir,
  mkdtemp,
  readFile,
  rename,
  rm,
  writeFile,
} from "node:fs/promises";
import {
  basename,
  dirname,
  extname,
  isAbsolute,
  join,
  relative,
  resolve,
  sep,
} from "node:path";
import { packageRoot } from "./config.js";
import { getTestSuiteFilePaths } from "./get-test-suite-file-paths.js";
import { parseTestGroups } from "./parse-test-groups.js";
import { renderTestModule } from "./render-test-module.js";

export interface GenerateTestFilesOptions {
  suiteDirectory: string;
  outputDirectory: string;
  exclude?: string[];
  runnerModulePath?: string;
}

function normalizePath(path: string): string {
  return path.split(sep).join("/");
}

function containsPath(parent: string, child: string): boolean {
  const path = relative(parent, child);
  return (
    path === "" ||
    (path !== ".." && !path.startsWith(`..${sep}`) && !isAbsolute(path))
  );
}

function toModuleSpecifier(path: string): string {
  const normalized = normalizePath(path);
  return normalized.startsWith(".") ? normalized : `./${normalized}`;
}

function kebabCase(value: string): string {
  return value
    .replace(/([a-z\d])([A-Z])/g, "$1-$2")
    .replace(/[_\s]+/g, "-")
    .toLowerCase();
}

function outputPathsFor(relativeSourcePath: string): {
  fixture: string;
  test: string;
} {
  const extension = extname(relativeSourcePath);
  const directory = dirname(relativeSourcePath);
  const name = kebabCase(basename(relativeSourcePath, extension));
  const parent = directory === "." ? "" : directory;
  return {
    fixture: join(parent, `${name}.json`),
    test: join(parent, `${name}.test.ts`),
  };
}

/**
 * Copies selected upstream JSON fixtures byte-for-byte and generates thin test
 * modules in a staging directory before replacing the previous output.
 *
 * @throws If input/output paths overlap, exclusions are stale, fixture JSON is
 * invalid, or two source names map to the same generated path.
 */
export async function generateTestFiles({
  suiteDirectory,
  outputDirectory,
  exclude = [],
  runnerModulePath = join(packageRoot, "src", "run-test-groups.js"),
}: GenerateTestFilesOptions): Promise<string[]> {
  const resolvedSuiteDirectory = resolve(suiteDirectory);
  const resolvedOutputDirectory = resolve(outputDirectory);
  const outputParent = dirname(resolvedOutputDirectory);

  if (
    resolvedOutputDirectory === outputParent ||
    containsPath(resolvedSuiteDirectory, resolvedOutputDirectory) ||
    containsPath(resolvedOutputDirectory, resolvedSuiteDirectory)
  ) {
    throw new Error(
      `Output directory must be a non-root path outside the input suite: ${resolvedOutputDirectory}`,
    );
  }

  await mkdir(outputParent, { recursive: true });
  const stagingDirectory = await mkdtemp(
    join(outputParent, `.${basename(resolvedOutputDirectory)}-`),
  );
  const generatedPaths: string[] = [];
  const claimedOutputPaths = new Set<string>();

  try {
    for (const testFilePath of await getTestSuiteFilePaths(
      resolvedSuiteDirectory,
      exclude,
    )) {
      const relativeSourcePath = relative(resolvedSuiteDirectory, testFilePath);
      const outputPaths = outputPathsFor(relativeSourcePath);
      const normalizedSourcePath = normalizePath(relativeSourcePath);

      for (const outputPath of Object.values(outputPaths)) {
        const normalizedOutputPath = normalizePath(outputPath);
        if (claimedOutputPaths.has(normalizedOutputPath)) {
          throw new Error(
            `${normalizedSourcePath} collides with another generated output at ${normalizedOutputPath}`,
          );
        }
        claimedOutputPaths.add(normalizedOutputPath);
      }

      const finalOutputPath = join(resolvedOutputDirectory, outputPaths.test);
      const stagingTestPath = join(stagingDirectory, outputPaths.test);
      const stagingFixturePath = join(stagingDirectory, outputPaths.fixture);
      const fixture = await readFile(testFilePath, "utf8");
      parseTestGroups(normalizedSourcePath, fixture);
      const runnerImport = toModuleSpecifier(
        relative(dirname(finalOutputPath), runnerModulePath),
      );

      await mkdir(dirname(stagingTestPath), { recursive: true });
      await writeFile(stagingFixturePath, fixture);
      await writeFile(
        stagingTestPath,
        renderTestModule({
          runnerImport,
          fixtureImport: `./${basename(outputPaths.fixture)}`,
          source: normalizedSourcePath,
        }),
      );
      generatedPaths.push(finalOutputPath);
    }

    const backupDirectory = `${stagingDirectory}-previous`;
    const hadPreviousOutput = existsSync(resolvedOutputDirectory);

    if (hadPreviousOutput) {
      await rename(resolvedOutputDirectory, backupDirectory);
    }

    try {
      await rename(stagingDirectory, resolvedOutputDirectory);
    } catch (error) {
      if (hadPreviousOutput) {
        await rename(backupDirectory, resolvedOutputDirectory);
      }
      throw error;
    }

    if (hadPreviousOutput) {
      await rm(backupDirectory, { recursive: true, force: true });
    }
    return generatedPaths;
  } catch (error) {
    await rm(stagingDirectory, { recursive: true, force: true });
    throw error;
  }
}
