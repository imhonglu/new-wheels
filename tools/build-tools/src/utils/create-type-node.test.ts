import { expect, test } from "vitest";
import { createTypeNode } from "./create-type-node.js";
import { printNode } from "./print-node.js";

test("createTypeNode", () => {
	expect(printNode(createTypeNode(String))).toBe("string");
	expect(printNode(createTypeNode(Boolean))).toBe("boolean");
	expect(printNode(createTypeNode(Number))).toBe("number");
	expect(printNode(createTypeNode(BigInt))).toBe("bigint");
	expect(printNode(createTypeNode(undefined))).toBe("undefined");
	expect(printNode(createTypeNode(null))).toBe("null");
	expect(printNode(createTypeNode(["foo", "bar"]))).toBe('"foo" | "bar"');
	expect(
		printNode(
			createTypeNode({
				foo: "string",
				bar: Number,
			}),
		),
	).toBe('{ "foo": "string"; "bar": number; }');
});
