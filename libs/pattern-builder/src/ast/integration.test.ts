import { expect, test } from "vitest";
import { AlternationNode } from "./alternation-node.js";
import { AnchorNode } from "./anchor-node.js";
import { QuantifierNode } from "./quantifier-node.js";
import { TextNode } from "./text-node.js";

test("complex AST executes through native RegExp", () => {
  const ast = new AnchorNode(
    new QuantifierNode(
      new AlternationNode([new TextNode("a"), new TextNode("b")]),
      { min: 1 },
    ),
    "both",
  );

  const regexp = ast.toRegExp();

  expect(regexp.test("abba")).toBe(true);
  expect(regexp.test("abc")).toBe(false);
});
