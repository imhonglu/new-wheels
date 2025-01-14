/* This file is automatically generated. Do not edit this file. */
import { describe, expect, test } from "vitest";
import { Schema } from "../schema.js";
describe("validation of regular expressions", () => {
	const schema = {
		$schema: "https://json-schema.org/draft/2020-12/schema",
		format: "regex",
	};
	test("all string formats ignore integers", () => {
		const instance = new Schema(schema);
		expect(instance.validate(12)).toBeTruthy();
	});
	test("all string formats ignore floats", () => {
		const instance = new Schema(schema);
		expect(instance.validate(13.7)).toBeTruthy();
	});
	test("all string formats ignore objects", () => {
		const instance = new Schema(schema);
		expect(instance.validate({})).toBeTruthy();
	});
	test("all string formats ignore arrays", () => {
		const instance = new Schema(schema);
		expect(instance.validate([])).toBeTruthy();
	});
	test("all string formats ignore booleans", () => {
		const instance = new Schema(schema);
		expect(instance.validate(false)).toBeTruthy();
	});
	test("all string formats ignore nulls", () => {
		const instance = new Schema(schema);
		expect(instance.validate(null)).toBeTruthy();
	});
	test("a valid regular expression", () => {
		const instance = new Schema(schema);
		expect(instance.validate("([abc])+\\s+$")).toBeTruthy();
	});
	test("a regular expression with unclosed parens is invalid", () => {
		const instance = new Schema(schema);
		expect(instance.validate("^(abc]")).toBeFalsy();
	});
});
