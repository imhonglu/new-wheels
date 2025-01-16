/* This file is automatically generated. Do not edit this file. */
import { describe, expect, test } from "vitest";
import { Schema } from "../../../schema.js";
describe("validation of URI References", () => {
	const schema = {
		$schema: "https://json-schema.org/draft/2020-12/schema",
		format: "uri-reference",
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
	test("a valid URI", () => {
		const instance = new Schema(schema);
		expect(instance.validate("http://foo.bar/?baz=qux#quux")).toBeTruthy();
	});
	test("a valid protocol-relative URI Reference", () => {
		const instance = new Schema(schema);
		expect(instance.validate("//foo.bar/?baz=qux#quux")).toBeTruthy();
	});
	test("a valid relative URI Reference", () => {
		const instance = new Schema(schema);
		expect(instance.validate("/abc")).toBeTruthy();
	});
	test("an invalid URI Reference", () => {
		const instance = new Schema(schema);
		expect(instance.validate("\\\\WINDOWS\\fileshare")).toBeFalsy();
	});
	test("a valid URI Reference", () => {
		const instance = new Schema(schema);
		expect(instance.validate("abc")).toBeTruthy();
	});
	test("a valid URI fragment", () => {
		const instance = new Schema(schema);
		expect(instance.validate("#fragment")).toBeTruthy();
	});
	test("an invalid URI fragment", () => {
		const instance = new Schema(schema);
		expect(instance.validate("#frag\\ment")).toBeFalsy();
	});
});
