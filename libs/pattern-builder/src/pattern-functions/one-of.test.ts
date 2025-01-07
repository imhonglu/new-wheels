import { expect, test } from "vitest";
import { alpha, digit } from "./character-set.js";
import { oneOf } from "./one-of.js";

test("oneOf with strings", () => {
	const pattern = oneOf("a", "b", "c");

	expect(pattern.toString()).toBe("a|b|c");
});

test("oneOf with character set", () => {
	const pattern = oneOf(alpha, digit, /c/);

	expect(pattern.toString()).toBe("[a-zA-Z]|[\\d]|c");
});
