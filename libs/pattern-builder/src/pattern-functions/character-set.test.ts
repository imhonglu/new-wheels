import { expect, test } from "vitest";
import { alpha, characterSet, digit } from "./character-set.js";

test("characterSet with strings", () => {
	const pattern = characterSet("a", "b", "c");

	expect(pattern.toString()).toBe("[abc]");
});

test("characterSet with character set", () => {
	expect(characterSet(digit, /abc/).toString()).toBe("[\\dabc]");
	expect(characterSet(/abc/, digit).toString()).toBe("[abc\\d]");
	expect(characterSet(/abc/, /def/).toString()).toBe("[abcdef]");
});
