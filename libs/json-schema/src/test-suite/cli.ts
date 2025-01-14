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
const GENERATED_TESTS_DIR = join(SRC_DIR, "tests");

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

for (const testFilePath of await getTestSuiteFilePaths(testsDir)) {
	// create parent directory
	const parentDir = join(
		GENERATED_TESTS_DIR,
		relative(testsDir, dirname(testFilePath)),
	);
	await mkdir(parentDir, { recursive: true });

	// create test source file
	const source = await createTestSourceFile(testFilePath);
	const filePath = join(parentDir, source.fileName);
	await writeFile(filePath, printNode(source));

	console.info(`Generated ${filePath}`);
}
