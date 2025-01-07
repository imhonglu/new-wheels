import { expect, test } from "vitest";
import { createExpression } from "./create-expression.js";
import { printNode } from "./print-node.js";

test("createExpression", async () => {
	expect(printNode(createExpression("foo"))).toBe('"foo"');
	expect(printNode(createExpression(1))).toBe("1");
	expect(printNode(createExpression(true))).toBe("true");
	expect(printNode(createExpression(false))).toBe("false");
	expect(printNode(createExpression(null))).toBe("null");
	expect(printNode(createExpression(undefined))).toBe("undefined");
	expect(printNode(createExpression([1, 2, 3]))).toBe("[1, 2, 3]");
	expect(printNode(createExpression({ foo: "bar" }))).toBe('{ "foo": "bar" }');
});
