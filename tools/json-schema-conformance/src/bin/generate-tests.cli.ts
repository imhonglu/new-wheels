#!/usr/bin/env node
import { join, resolve } from "node:path";
import { parseArgs } from "node:util";
import { loadSuiteLock, packageRoot, suiteCacheDirectory } from "../config.js";
import { generateTestFiles } from "../generate-test-files.js";

const { values } = parseArgs({
  options: {
    "suite-dir": { type: "string" },
  },
  strict: true,
});

const lock = await loadSuiteLock();
const suiteDirectory = resolve(
  values["suite-dir"] ?? join(suiteCacheDirectory, "tests", lock.draft),
);
const outputDirectory = join(packageRoot, "generated");

const generated = await generateTestFiles({
  suiteDirectory,
  outputDirectory,
  exclude: lock.exclude,
});

console.info(`Generated ${generated.length} conformance test files`);
