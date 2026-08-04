import { readFile } from "node:fs/promises";
import { isAbsolute, relative, sep } from "node:path";
import { fileURLToPath } from "node:url";
import { Schema, type SchemaVariant } from "@imhonglu/json-schema";
import { describe, expect, test } from "vitest";
import { generatedDirectory } from "./config.js";
import { createTestCaseId, loadFailureBaseline } from "./failure-baseline.js";
import { parseTestGroups } from "./parse-test-groups.js";
import type { TestGroup } from "./types.js";

const failureBaseline = await loadFailureBaseline();
const knownFailures = new Set(failureBaseline.failures);

function fixturePath(fixture: URL): string {
  const path = relative(generatedDirectory, fileURLToPath(fixture));

  if (path === ".." || path.startsWith(`..${sep}`) || isAbsolute(path)) {
    throw new Error(`Fixture is outside the generated directory: ${fixture}`);
  }

  return path.split(sep).join("/");
}

/**
 * Registers every case from one generated fixture with Vitest.
 *
 * Generated modules may only reference fixtures inside the committed generated
 * directory; known failures are classified by their persisted case IDs.
 *
 * @throws If the fixture is outside the generated directory or malformed.
 */
export async function runTestFile(source: string, fixture: URL): Promise<void> {
  const relativeFixturePath = fixturePath(fixture);
  const groups = parseTestGroups(source, await readFile(fixture, "utf8"));
  runTestGroups(source, relativeFixturePath, groups);
}

function runTestGroups(
  source: string,
  fixture: string,
  groups: TestGroup[],
): void {
  describe(source, () => {
    for (const [groupIndex, group] of groups.entries()) {
      describe(group.description, () => {
        for (const [testIndex, testCase] of group.tests.entries()) {
          const run = () => {
            const schema = new Schema(
              group.schema as Exclude<SchemaVariant, Schema>,
            );
            expect(schema.validate(testCase.data)).toBe(testCase.valid);
          };
          const id = createTestCaseId(fixture, groupIndex, testIndex);

          if (knownFailures.has(id)) {
            test.fails(testCase.description, run);
          } else {
            test(testCase.description, run);
          }
        }
      });
    }
  });
}
