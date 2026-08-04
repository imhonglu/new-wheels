import { readdir, readFile } from "node:fs/promises";
import { basename, dirname, join, relative, sep } from "node:path";
import { createTestCaseId } from "./failure-baseline.js";
import { getTestSuiteFilePaths } from "./get-test-suite-file-paths.js";
import { parseTestGroups } from "./parse-test-groups.js";
import { renderTestModule } from "./render-test-module.js";
import type { FailureBaseline, SuiteLock } from "./types.js";

export interface VerifyFailureBaselineOptions {
  baseline: FailureBaseline;
  generatedDirectory: string;
  lock: SuiteLock;
  runnerModulePath: string;
}

export interface FailureBaselineSummary {
  failureCount: number;
  fixtureCount: number;
  groupCount: number;
  testCaseCount: number;
}

function normalizePath(path: string): string {
  return path.split(sep).join("/");
}

function moduleSpecifier(path: string): string {
  const normalized = normalizePath(path);
  return normalized.startsWith(".") ? normalized : `./${normalized}`;
}

/**
 * Verifies that generated fixtures, test modules, and expected failures form
 * one exact baseline for the pinned upstream revision.
 *
 * @throws If revisions, generated pairs, wrapper contents, suite sizes, or
 * expected-failure identifiers differ from the baseline.
 */
export async function verifyFailureBaseline({
  baseline,
  generatedDirectory,
  lock,
  runnerModulePath,
}: VerifyFailureBaselineOptions): Promise<FailureBaselineSummary> {
  if (baseline.revision !== lock.revision) {
    throw new Error(
      `Failure baseline revision ${baseline.revision} does not match suite revision ${lock.revision}`,
    );
  }

  const testCaseIds = new Set<string>();
  let groupCount = 0;
  const fixturePaths = await getTestSuiteFilePaths(generatedDirectory);
  const generatedEntries = await readdir(generatedDirectory, {
    recursive: true,
    withFileTypes: true,
  });
  const testPaths = generatedEntries
    .filter((entry) => entry.isFile() && entry.name.endsWith(".test.ts"))
    .map((entry) => join(entry.parentPath, entry.name));
  const relativeTestPaths = new Set(
    testPaths.map((path) => normalizePath(relative(generatedDirectory, path))),
  );

  for (const fixturePath of fixturePaths) {
    const fixture = normalizePath(relative(generatedDirectory, fixturePath));
    const testPath = fixturePath.replace(/\.json$/, ".test.ts");
    const relativeTestPath = normalizePath(
      relative(generatedDirectory, testPath),
    );

    if (!relativeTestPaths.has(relativeTestPath)) {
      throw new Error(`Generated fixture has no test module: ${fixture}`);
    }

    const module = await readFile(testPath, "utf8");
    const sourceLiteral = module.match(/^ {2}("(?:[^"\\]|\\.)*"),$/m)?.[1];

    if (sourceLiteral === undefined) {
      throw new Error(`Cannot read source path from ${relativeTestPath}`);
    }

    const source = JSON.parse(sourceLiteral) as unknown;

    if (typeof source !== "string") {
      throw new Error(`Invalid source path in ${relativeTestPath}`);
    }

    const expectedModule = renderTestModule({
      runnerImport: moduleSpecifier(
        relative(dirname(testPath), runnerModulePath),
      ),
      fixtureImport: `./${basename(fixturePath)}`,
      source,
    });

    if (module !== expectedModule) {
      throw new Error(`Generated test module is invalid: ${relativeTestPath}`);
    }

    const groups = parseTestGroups(
      fixture,
      await readFile(fixturePath, "utf8"),
    );
    groupCount += groups.length;

    for (const [groupIndex, group] of groups.entries()) {
      for (const testIndex of group.tests.keys()) {
        testCaseIds.add(createTestCaseId(fixture, groupIndex, testIndex));
      }
    }
  }

  if (testPaths.length !== fixturePaths.length) {
    throw new Error(
      `Generated fixture/test count differs: ${fixturePaths.length} fixtures, ${testPaths.length} tests`,
    );
  }

  if (
    fixturePaths.length !== baseline.fixtureCount ||
    groupCount !== baseline.groupCount ||
    testCaseIds.size !== baseline.testCaseCount
  ) {
    throw new Error(
      `Generated suite size differs from baseline: ${fixturePaths.length} files, ${groupCount} groups, ${testCaseIds.size} test cases`,
    );
  }

  const unknownFailures = baseline.failures.filter(
    (failure) => !testCaseIds.has(failure),
  );

  if (unknownFailures.length > 0) {
    throw new Error(
      `Failure baseline contains unknown test cases:\n${unknownFailures.join("\n")}`,
    );
  }

  return {
    failureCount: baseline.failures.length,
    fixtureCount: fixturePaths.length,
    groupCount,
    testCaseCount: testCaseIds.size,
  };
}
