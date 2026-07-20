import { expect, test } from "vitest";
import { AnchorNode } from "./anchor-node.js";
import { TextNode } from "./text-node.js";

test.each([
  ["start", "^foo"],
  ["end", "foo$"],
  ["both", "^foo$"],
] as const)("AnchorNode renders %s anchors", (position, expected) => {
  expect(new AnchorNode(new TextNode("foo"), position).toString()).toBe(
    expected,
  );
});
