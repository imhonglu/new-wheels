import { expect, test } from "vitest";
import { AlternationNode } from "./alternation-node.js";
import { TextNode } from "./text-node.js";

test("AlternationNode renders non-capturing alternatives", () => {
  expect(
    new AlternationNode([new TextNode("a"), new TextNode("b")]).toString(),
  ).toBe("(?:a|b)");
});
