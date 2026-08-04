import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { packageRoot } from "./config.js";
import type { FailureBaseline } from "./types.js";

const testCaseIdPattern = /^[^#]+\.json#\d+:\d+$/;

/**
 * Creates the persisted case identifier used by `known-failures.json`.
 * Changing this format requires migrating the committed manifest.
 */
export function createTestCaseId(
  fixture: string,
  groupIndex: number,
  testIndex: number,
): string {
  return `${fixture}#${groupIndex}:${testIndex}`;
}

export function parseFailureBaseline(source: string): FailureBaseline {
  const baseline = JSON.parse(source) as Partial<FailureBaseline>;

  if (
    !/^[a-f\d]{40}$/.test(baseline.revision ?? "") ||
    typeof baseline.fixtureCount !== "number" ||
    !Number.isSafeInteger(baseline.fixtureCount) ||
    typeof baseline.groupCount !== "number" ||
    !Number.isSafeInteger(baseline.groupCount) ||
    typeof baseline.testCaseCount !== "number" ||
    !Number.isSafeInteger(baseline.testCaseCount) ||
    (baseline.fixtureCount ?? 0) < 1 ||
    (baseline.groupCount ?? 0) < 1 ||
    (baseline.testCaseCount ?? 0) < 1 ||
    !Array.isArray(baseline.failures) ||
    baseline.failures.some(
      (failure) =>
        typeof failure !== "string" || !testCaseIdPattern.test(failure),
    ) ||
    new Set(baseline.failures).size !== baseline.failures.length
  ) {
    throw new Error("Invalid known-failures.json");
  }

  return baseline as FailureBaseline;
}

export async function loadFailureBaseline(): Promise<FailureBaseline> {
  return parseFailureBaseline(
    await readFile(join(packageRoot, "known-failures.json"), "utf8"),
  );
}
