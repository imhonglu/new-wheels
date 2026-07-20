import { expect, test } from "vitest";
import { GroupNode } from "./group-node.js";
import { QuantifierNode } from "./quantifier-node.js";
import { RawNode } from "./raw-node.js";
import { TextNode } from "./text-node.js";

test.each([
  [{ min: 0 }, "*"],
  [{ min: 1 }, "+"],
  [{ min: 2 }, "{2,}"],
  [{ min: 0, max: 1 }, "?"],
  [{ min: 3, max: 3 }, "{3}"],
  [{ min: 2, max: 4 }, "{2,4}"],
  [{ min: 1, lazy: true }, "+?"],
])("QuantifierNode renders %j", (options, suffix) => {
  expect(new QuantifierNode(new RawNode("a"), options).toString()).toBe(
    `a${suffix}`,
  );
});

test("QuantifierNode groups multi-character text", () => {
  expect(new QuantifierNode(new TextNode("ab"), { min: 1 }).toString()).toBe(
    "(?:ab)+",
  );
});

test("QuantifierNode preserves an existing group", () => {
  expect(
    new QuantifierNode(new GroupNode(new TextNode("ab"), "non-capturing"), {
      min: 1,
    }).toString(),
  ).toBe("(?:ab)+");
});
