import {
  access,
  mkdir,
  mkdtemp,
  readFile,
  rm,
  writeFile,
} from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { afterEach, expect, test } from "vitest";
import { generateTestFiles } from "./generate-test-files.js";

const temporaryDirectories: string[] = [];

async function temporaryDirectory(): Promise<string> {
  const directory = await mkdtemp(join(tmpdir(), "json-schema-conformance-"));
  temporaryDirectories.push(directory);
  return directory;
}

async function writeTestSuiteFile(path: string, description: string) {
  const schema = JSON.parse(
    '{"type":"string","__proto__":"literal"}',
  ) as Record<string, unknown>;

  await writeFile(
    path,
    JSON.stringify([
      {
        description,
        schema,
        tests: [{ description: "valid", data: "value", valid: true }],
      },
    ]),
  );
}

afterEach(async () => {
  await Promise.all(
    temporaryDirectories
      .splice(0)
      .map((directory) => rm(directory, { recursive: true, force: true })),
  );
});

test("generates deterministic fixture-backed modules with nested paths", async () => {
  const root = await temporaryDirectory();
  const suiteDirectory = join(root, "suite");
  const outputDirectory = join(root, "generated");
  const runnerModulePath = join(root, "src", "run-test-groups.js");

  await mkdir(join(suiteDirectory, "optional"), { recursive: true });
  await writeTestSuiteFile(join(suiteDirectory, "camelCase.json"), "root");
  await writeTestSuiteFile(
    join(suiteDirectory, "optional", "nested_case.json"),
    "nested",
  );
  await writeTestSuiteFile(
    join(suiteDirectory, "optional", "excluded.json"),
    "excluded",
  );

  const firstRun = await generateTestFiles({
    suiteDirectory,
    outputDirectory,
    runnerModulePath,
    exclude: ["optional/excluded.json"],
  });
  const firstSources = await Promise.all(
    firstRun.map((path) => readFile(path, "utf8")),
  );
  const firstFixtures = await Promise.all(
    firstRun.map((path) =>
      readFile(path.replace(/\.test\.ts$/, ".json"), "utf8"),
    ),
  );
  const secondRun = await generateTestFiles({
    suiteDirectory,
    outputDirectory,
    runnerModulePath,
    exclude: ["optional/excluded.json"],
  });
  const secondSources = await Promise.all(
    secondRun.map((path) => readFile(path, "utf8")),
  );

  expect(
    firstRun.map((path) => path.slice(outputDirectory.length + 1)),
  ).toEqual(["camel-case.test.ts", join("optional", "nested-case.test.ts")]);
  expect(firstSources).toEqual(secondSources);
  expect(firstFixtures[0]).toBe(
    await readFile(join(suiteDirectory, "camelCase.json"), "utf8"),
  );
  expect(
    (JSON.parse(firstFixtures[0]) as Array<{ description: string }>)[0]
      .description,
  ).toBe("root");
  expect(
    Object.hasOwn(
      (JSON.parse(firstFixtures[0]) as Array<{ schema: object }>)[0].schema,
      "__proto__",
    ),
  ).toBe(true);
  expect(firstSources[0]).toContain('from "../src/run-test-groups.js"');
  expect(firstSources[1]).toContain('from "../../src/run-test-groups.js"');
  expect(secondRun).toHaveLength(2);
});

test("removes stale files when installing a new generated output", async () => {
  const root = await temporaryDirectory();
  const suiteDirectory = join(root, "suite");
  const outputDirectory = join(root, "generated");
  const stalePath = join(outputDirectory, "stale.test.ts");

  await mkdir(suiteDirectory);
  await writeTestSuiteFile(join(suiteDirectory, "test.json"), "input");
  await generateTestFiles({ suiteDirectory, outputDirectory });
  await writeFile(stalePath, "stale");

  await generateTestFiles({ suiteDirectory, outputDirectory });

  await expect(access(stalePath)).rejects.toThrow();
});

test("keeps the previous output when generation fails", async () => {
  const root = await temporaryDirectory();
  const suiteDirectory = join(root, "suite");
  const outputDirectory = join(root, "generated");
  const marker = join(outputDirectory, "previous.test.ts");

  await mkdir(dirname(marker), { recursive: true });
  await writeFile(marker, "previous output");
  await mkdir(suiteDirectory, { recursive: true });
  await writeFile(join(suiteDirectory, "invalid.json"), "not json");

  await expect(
    generateTestFiles({ suiteDirectory, outputDirectory }),
  ).rejects.toThrow();
  await expect(readFile(marker, "utf8")).resolves.toBe("previous output");
});

test("refuses to replace an input suite", async () => {
  const suiteDirectory = await temporaryDirectory();
  await writeTestSuiteFile(join(suiteDirectory, "test.json"), "input");

  await expect(
    generateTestFiles({
      suiteDirectory,
      outputDirectory: suiteDirectory,
    }),
  ).rejects.toThrow("outside the input suite");
  await expect(
    readFile(join(suiteDirectory, "test.json"), "utf8"),
  ).resolves.toContain('"description":"input"');
});

test("rejects nested input and output directories in either direction", async () => {
  const root = await temporaryDirectory();
  const suiteDirectory = join(root, "suite");
  await mkdir(suiteDirectory);
  await writeTestSuiteFile(join(suiteDirectory, "test.json"), "input");

  await expect(
    generateTestFiles({
      suiteDirectory,
      outputDirectory: join(suiteDirectory, "generated"),
    }),
  ).rejects.toThrow("outside the input suite");
  await expect(
    generateTestFiles({
      suiteDirectory,
      outputDirectory: root,
    }),
  ).rejects.toThrow("outside the input suite");
});

test("rejects source names that collide after normalization", async () => {
  const root = await temporaryDirectory();
  const suiteDirectory = join(root, "suite");

  await mkdir(suiteDirectory);
  await writeTestSuiteFile(join(suiteDirectory, "camelCase.json"), "first");
  await writeTestSuiteFile(join(suiteDirectory, "camel-case.json"), "second");

  await expect(
    generateTestFiles({
      suiteDirectory,
      outputDirectory: join(root, "generated"),
    }),
  ).rejects.toThrow("collides with another generated output");
});

test("rejects stale exclusion entries", async () => {
  const root = await temporaryDirectory();
  const suiteDirectory = join(root, "suite");
  const outputDirectory = join(root, "generated");

  await mkdir(suiteDirectory);
  await writeTestSuiteFile(join(suiteDirectory, "test.json"), "input");

  await expect(
    generateTestFiles({
      suiteDirectory,
      outputDirectory,
      exclude: ["missing.json"],
    }),
  ).rejects.toThrow("Excluded suite file does not exist: missing.json");
});
