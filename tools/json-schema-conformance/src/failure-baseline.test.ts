import { expect, test } from "vitest";
import { createTestCaseId, parseFailureBaseline } from "./failure-baseline.js";

const validBaseline = {
  revision: "a".repeat(40),
  fixtureCount: 1,
  groupCount: 1,
  testCaseCount: 1,
  failures: ["sample.json#0:0"],
};

test("parses a unique case-level failure baseline", () => {
  expect(parseFailureBaseline(JSON.stringify(validBaseline))).toEqual(
    validBaseline,
  );
});

test.each([
  { ...validBaseline, fixtureCount: 0 },
  { ...validBaseline, groupCount: 1.5 },
  { ...validBaseline, failures: ["invalid"] },
  { ...validBaseline, failures: ["sample.json#0:0", "sample.json#0:0"] },
])("rejects an invalid failure baseline", (baseline) => {
  expect(() => parseFailureBaseline(JSON.stringify(baseline))).toThrow(
    "Invalid known-failures.json",
  );
});

test("keeps the persisted test-case ID format stable", () => {
  expect(createTestCaseId("optional/example.json", 2, 3)).toBe(
    "optional/example.json#2:3",
  );
});
