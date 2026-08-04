import { mkdir, mkdtemp, rm, unlink, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, expect, test } from "vitest";
import { generateTestFiles } from "./generate-test-files.js";
import type { FailureBaseline, SuiteLock } from "./types.js";
import { verifyFailureBaseline } from "./verify-failure-baseline.js";

const revision = "a".repeat(40);
const temporaryDirectories: string[] = [];

interface Fixture {
  baseline: FailureBaseline;
  generatedDirectory: string;
  lock: SuiteLock;
  runnerModulePath: string;
}

async function createFixture(): Promise<Fixture> {
  const root = await mkdtemp(join(tmpdir(), "json-schema-baseline-"));
  temporaryDirectories.push(root);
  const suiteDirectory = join(root, "suite");
  const generatedDirectory = join(root, "generated");
  const runnerModulePath = join(root, "src", "run-test-groups.js");

  await mkdir(suiteDirectory);
  await writeFile(
    join(suiteDirectory, "sample.json"),
    JSON.stringify([
      {
        description: "group",
        schema: true,
        tests: [{ data: null, description: "case", valid: true }],
      },
    ]),
  );

  await generateTestFiles({
    suiteDirectory,
    outputDirectory: generatedDirectory,
    runnerModulePath,
  });

  return {
    baseline: {
      revision,
      fixtureCount: 1,
      groupCount: 1,
      testCaseCount: 1,
      failures: ["sample.json#0:0"],
    },
    generatedDirectory,
    lock: {
      repository: "https://example.com/suite.git",
      revision,
      draft: "draft2020-12",
      exclude: [],
    },
    runnerModulePath,
  };
}

afterEach(async () => {
  await Promise.all(
    temporaryDirectories
      .splice(0)
      .map((directory) => rm(directory, { recursive: true, force: true })),
  );
});

test("verifies an exact generated baseline", async () => {
  const fixture = await createFixture();

  await expect(verifyFailureBaseline(fixture)).resolves.toEqual({
    failureCount: 1,
    fixtureCount: 1,
    groupCount: 1,
    testCaseCount: 1,
  });
});

test("rejects a baseline for another revision", async () => {
  const fixture = await createFixture();
  fixture.baseline.revision = "b".repeat(40);

  await expect(verifyFailureBaseline(fixture)).rejects.toThrow(
    "does not match suite revision",
  );
});

test("rejects a fixture without its generated test module", async () => {
  const fixture = await createFixture();
  await unlink(join(fixture.generatedDirectory, "sample.test.ts"));

  await expect(verifyFailureBaseline(fixture)).rejects.toThrow(
    "Generated fixture has no test module: sample.json",
  );
});

test("rejects an extra generated test module", async () => {
  const fixture = await createFixture();
  await writeFile(join(fixture.generatedDirectory, "orphan.test.ts"), "");

  await expect(verifyFailureBaseline(fixture)).rejects.toThrow(
    "Generated fixture/test count differs",
  );
});

test("rejects a modified generated test module", async () => {
  const fixture = await createFixture();
  await writeFile(
    join(fixture.generatedDirectory, "sample.test.ts"),
    "modified\n",
  );

  await expect(verifyFailureBaseline(fixture)).rejects.toThrow(
    "Cannot read source path from sample.test.ts",
  );
});

test("rejects a generated suite with different counts", async () => {
  const fixture = await createFixture();
  fixture.baseline.testCaseCount = 2;

  await expect(verifyFailureBaseline(fixture)).rejects.toThrow(
    "Generated suite size differs from baseline",
  );
});

test("rejects an unknown expected-failure ID", async () => {
  const fixture = await createFixture();
  fixture.baseline.failures = ["sample.json#0:1"];

  await expect(verifyFailureBaseline(fixture)).rejects.toThrow(
    "Failure baseline contains unknown test cases",
  );
});
