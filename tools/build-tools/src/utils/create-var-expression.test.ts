import { expect, test } from "vitest";
import { createVarExpression } from "./create-var-expression.js";
import { printNode } from "./print-node.js";

test("should create a var expression", async () => {
  expect(printNode(createVarExpression("foo"))).toBe('"foo"');
  expect(printNode(createVarExpression(1))).toBe("1");
  expect(printNode(createVarExpression(1.1))).toBe("1.1");
  expect(printNode(createVarExpression(-1))).toBe("-1");
  expect(printNode(createVarExpression(-1.1))).toBe("-1.1");
  expect(printNode(createVarExpression(true))).toBe("true");
  expect(printNode(createVarExpression(false))).toBe("false");
  expect(printNode(createVarExpression(null))).toBe("null");
  expect(printNode(createVarExpression(undefined))).toBe("undefined");
  expect(printNode(createVarExpression([1, 2, 3]))).toBe("[1, 2, 3]");
  expect(printNode(createVarExpression({ foo: "bar" }))).toBe(
    '{ "foo": "bar" }',
  );
  expect(printNode(createVarExpression({ ["__proto__"]: "foo" }))).toBe(
    '{ ["__proto__"]: "foo" }',
  );
});
