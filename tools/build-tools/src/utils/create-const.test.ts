import { expect, test } from "vitest";
import { createConst } from "./create-const.js";
import { printNode } from "./print-node.js";

test("createConst", async () => {
	expect(printNode(createConst("foo", "bar"))).toBe(
		`export const foo = "bar";`,
	);
});
