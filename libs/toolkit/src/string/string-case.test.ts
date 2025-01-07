import { describe, expect, test } from "vitest";
import { stringCase } from "./string-case.js";

describe("kebabCase", () => {
	test.each([
		["fooBar", "foo-bar"],
		["foo_bar", "foo-bar"],
		["foo bar", "foo-bar"],
		["foo-bar", "foo-bar"],
		["FooBar", "foo-bar"],
	])("converts %s to %s", (input, expected) => {
		expect(stringCase.toKebab(input)).toBe(expected);
	});
});

describe("snakeCase", () => {
	test.each([
		["fooBar", "foo_bar"],
		["foo_bar", "foo_bar"],
		["foo bar", "foo_bar"],
		["foo-bar", "foo_bar"],
		["FooBar", "foo_bar"],
	])("converts %s to %s", (input, expected) => {
		expect(stringCase.toSnake(input)).toBe(expected);
	});
});

describe("camelCase", () => {
	test.each([
		["foo-bar", "fooBar"],
		["foo_bar", "fooBar"],
		["foo bar", "fooBar"],
		["fooBar", "fooBar"],
		["FooBar", "fooBar"],
	])("converts %s to %s", (input, expected) => {
		expect(stringCase.toCamel(input)).toBe(expected);
	});
});

describe("pascalCase", () => {
	test.each([
		["fooBar", "FooBar"],
		["foo_bar", "FooBar"],
		["foo bar", "FooBar"],
		["foo-bar", "FooBar"],
		["FooBar", "FooBar"],
	])("converts %s to %s", (input, expected) => {
		expect(stringCase.toPascal(input)).toBe(expected);
	});
});
