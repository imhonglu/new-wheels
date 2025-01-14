import { expect, test } from "vitest";
import { alpha, digit } from "./character-set.js";
import { concat } from "./concat.js";

test("concat with strings", () => {
	const pattern = concat("a", "b", "c");

	expect(pattern.toString()).toBe("abc");
});

test("concat with character set", () => {
	const pattern = concat(alpha, digit, /c/);

	expect(pattern.toString()).toBe("[a-zA-Z][0-9]c");
});
