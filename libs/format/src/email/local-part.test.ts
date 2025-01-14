import { expect, test } from "vitest";
import { InvalidLocalPartError } from "./errors/invalid-local-part-error.js";
import { LocalPart } from "./local-part.js";

test("should parse a valid LocalPart string (dotString)", () => {
	expect(LocalPart.parse("john.doe")).toMatchObject({
		text: "john.doe",
		type: "dotString",
	});
	expect(LocalPart.parse("john.doe").toString()).toBe("john.doe");
	expect(JSON.stringify(LocalPart.parse("john.doe"))).toBe('"john.doe"');
});

test("should parse a valid LocalPart string (quotedString)", () => {
	expect(LocalPart.parse('"john.doe"')).toMatchObject({
		text: '"john.doe"',
		type: "quotedString",
	});
	expect(LocalPart.parse('"john.doe"').toString()).toBe('"john.doe"');
	expect(JSON.stringify(LocalPart.parse('"john.doe"'))).toBe(
		`"\\"john.doe\\""`,
	);
});

test("should throw an error for a local part starting with a dot", () => {
	expect(() => LocalPart.parse(".john.doe")).toThrow(InvalidLocalPartError);
});

test("should throw an error for a local part ending with a dot", () => {
	expect(() => LocalPart.parse("john.doe.")).toThrow(InvalidLocalPartError);
});

test("should throw an error for a local part with two subsequent dots", () => {
	expect(() => LocalPart.parse("john..doe")).toThrow(InvalidLocalPartError);
});
