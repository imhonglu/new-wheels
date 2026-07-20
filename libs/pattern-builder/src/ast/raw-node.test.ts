import { expect, test } from "vitest";
import { RawNode } from "./raw-node.js";

test.each([
  ["a.b", "a.b"],
  [/a\.b/g, "a\\.b"],
])("RawNode preserves source", (value, expected) => {
  expect(new RawNode(value).toString()).toBe(expected);
});
