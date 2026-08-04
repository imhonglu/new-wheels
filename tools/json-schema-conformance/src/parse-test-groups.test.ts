import { expect, test } from "vitest";
import { parseTestGroups } from "./parse-test-groups.js";

test("preserves JSON keys with JavaScript object-literal semantics", () => {
  const groups = parseTestGroups(
    "properties.json",
    '[{"description":"prototype","schema":{"__proto__":"value"},"tests":[]}]',
  );

  expect(Object.hasOwn(groups[0]?.schema as object, "__proto__")).toBe(true);
});

test("rejects malformed suite files with their source path", () => {
  expect(() => parseTestGroups("invalid.json", "{}")).toThrowError(
    "invalid.json must contain an array of test groups",
  );
});

test("reports the source path for invalid JSON", () => {
  expect(() => parseTestGroups("invalid.json", "not json")).toThrowError(
    "invalid.json contains invalid JSON",
  );
});

test("rejects an invalid test group", () => {
  expect(() => parseTestGroups("invalid.json", "[{}]")).toThrowError(
    "invalid.json contains an invalid test group",
  );
});

test("rejects an invalid test case", () => {
  expect(() =>
    parseTestGroups(
      "invalid.json",
      '[{"description":"group","schema":true,"tests":[{}]}]',
    ),
  ).toThrowError("invalid.json contains an invalid test case");
});
