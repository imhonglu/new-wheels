import { expect, test } from "vitest";
import { RawNode } from "./raw-node.js";
import { SequenceNode } from "./sequence-node.js";
import { TextNode } from "./text-node.js";

test("SequenceNode renders children in order", () => {
  expect(
    new SequenceNode([new TextNode("a"), new RawNode("[0-9]")]).toString(),
  ).toBe("a[0-9]");
});

test("SequenceNode copies children on construction", () => {
  const children = [new TextNode("a")];
  const sequence = new SequenceNode(children);

  children.push(new TextNode("b"));

  expect(sequence.toString()).toBe("a");
});
