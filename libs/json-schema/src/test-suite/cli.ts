#!/usr/bin/env node --experimental-transform-types
import { mkdir, rm, writeFile } from "node:fs/promises";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import { gitFetch, printNode } from "@imhonglu/build-tools";

// @ts-expect-error - executed with `node --experimental-transform-types` flag for ESM imports
import { createTestSourceFile } from "./utils/create-test-source-file.ts";
// @ts-expect-error - executed with `node --experimental-transform-types` flag for ESM imports
import { getTestSuiteFilePaths } from "./utils/get-test-suite-file-paths.ts";

const VERSION = "draft2020-12";
const SRC_DIR = join(
  dirname(fileURLToPath(import.meta.url)),
  "..",
  "..",
  "src",
);
const WORKING_DIR = join(SRC_DIR, "test-suite");
const GENERATED_TESTS_DIR = join(SRC_DIR, "generated-tests");
const EXCLUDE_TESTS = [
  // `format.json` is for not implementing optional features
  "format.json",
  // `defs.json` is not validation tests
  "defs.json",
];

// clean up generated tests directory
await rm(GENERATED_TESTS_DIR, { recursive: true, force: true });
await mkdir(GENERATED_TESTS_DIR, { recursive: true });

const testsDir = join(
  await gitFetch({
    org: "json-schema-org",
    repo: "JSON-Schema-Test-Suite",
    cwd: WORKING_DIR,
  }),
  "tests",
  VERSION,
);

for (const testFilePath of await getTestSuiteFilePaths(
  testsDir,
  EXCLUDE_TESTS,
)) {
  const relativeParentDir = relative(testsDir, dirname(testFilePath));
  const absoluteParentDir = join(GENERATED_TESTS_DIR, relativeParentDir);

  await mkdir(absoluteParentDir, { recursive: true });

  // create test source file
  const source = await createTestSourceFile(
    testFilePath,
    relative(relativeParentDir, "../schema.js"),
  );
  const filePath = join(absoluteParentDir, source.fileName);
  await writeFile(filePath, printNode(source));

  console.info(`Generated ${filePath}`);
}
