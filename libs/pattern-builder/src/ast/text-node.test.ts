import { expect, test } from "vitest";
import { TextNode } from "./text-node.js";

test.each([
  ["plain text", "plain text"],
  ["a.b+?()[]{}^$|/", "a\\.b\\+\\?\\(\\)\\[\\]\\{\\}\\^\\$\\|\\/"],
])("TextNode escapes %s", (value, expected) => {
  expect(new TextNode(value).toString()).toBe(expected);
});
