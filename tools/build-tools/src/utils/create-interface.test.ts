import { expect, test } from "vitest";
import { createInterface } from "./create-interface.js";
import { printNode } from "./print-node.js";

test("createInterface", () => {
	expect(
		printNode(
			createInterface("ObjectType", {
				foo: String,
				bar: Number,
			}),
		),
	).toBe('export interface ObjectType { "foo": string; "bar": number; }');
});
