#!/usr/bin/env node
import { join } from "node:path";
import { generatedDirectory, loadSuiteLock, packageRoot } from "../config.js";
import { loadFailureBaseline } from "../failure-baseline.js";
import { verifyFailureBaseline } from "../verify-failure-baseline.js";

const summary = await verifyFailureBaseline({
  baseline: await loadFailureBaseline(),
  generatedDirectory,
  lock: await loadSuiteLock(),
  runnerModulePath: join(packageRoot, "src", "run-test-groups.js"),
});

console.info(
  `Verified ${summary.failureCount} known failures across ${summary.fixtureCount} files and ${summary.testCaseCount} test cases`,
);
