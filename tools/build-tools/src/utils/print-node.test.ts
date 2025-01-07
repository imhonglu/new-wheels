import ts from "typescript";
import { expect, test } from "vitest";
import { printNode } from "./print-node.js";

test("printNode", () => {
	expect(
		printNode(
			ts.factory.createTypeLiteralNode([
				ts.factory.createPropertySignature(
					undefined,
					ts.factory.createIdentifier("foo"),
					undefined,
					ts.factory.createLiteralTypeNode(
						ts.factory.createStringLiteral("bar"),
					),
				),
			]),
		).replace(/\s+/g, " "),
	).toBe('{ foo: "bar"; }');
});
