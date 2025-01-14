import { expect, test } from "vitest";
import { characterSet, digit } from "./character-set.js";

test("characterSet with strings", () => {
	const pattern = characterSet("a", "b", "c");

	expect(pattern.toString()).toBe("[abc]");
});

test("characterSet with character set", () => {
	expect(characterSet(digit, /abc/).toString()).toBe("[0-9abc]");
	expect(characterSet(/abc/, digit).toString()).toBe("[abc0-9]");
	expect(characterSet(/abc/, /def/).toString()).toBe("[abcdef]");
});
