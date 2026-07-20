import { expect, test } from "vitest";
import { GroupNode } from "./group-node.js";
import { TextNode } from "./text-node.js";

test.each([
  ["capturing", "(foo)"],
  ["non-capturing", "(?:foo)"],
  ["lookahead", "(?=foo)"],
  ["negative-lookahead", "(?!foo)"],
  ["lookbehind", "(?<=foo)"],
  ["negative-lookbehind", "(?<!foo)"],
] as const)("GroupNode renders %s groups", (type, expected) => {
  expect(new GroupNode(new TextNode("foo"), type).toString()).toBe(expected);
});
