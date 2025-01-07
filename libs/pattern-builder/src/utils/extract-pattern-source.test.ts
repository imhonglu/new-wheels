import { expect, test } from "vitest";
import { Characters } from "../pattern-builder/characters.js";
import { PatternBuilder } from "../pattern-builder/pattern-builder.js";
import { extractPatternSource } from "./extract-pattern-source.js";

test("extractPatternSource from string", () => {
	const pattern = "a";
	expect(extractPatternSource(pattern)).toBe("a");
});

test("extractPatternSource from PatternBuilder", () => {
	const pattern = new PatternBuilder("a");
	expect(extractPatternSource(pattern)).toBe("a");
});

test("extractPatternSource from CharacterSet", () => {
	const pattern = new Characters("a");
	expect(extractPatternSource(pattern)).toBe("a");
});

test("extractPatternSource from RegExp", () => {
	const pattern = /a/;
	expect(extractPatternSource(pattern)).toBe("a");
});
