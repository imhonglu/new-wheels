/* This file is automatically generated. Do not edit this file. */
import { describe, expect, test } from "vitest";
import { Schema } from "../schema.js";
describe("validation of IRIs", () => {
	const schema = {
		$schema: "https://json-schema.org/draft/2020-12/schema",
		format: "iri",
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
	test("a valid IRI with anchor tag", () => {
		const instance = new Schema(schema);
		expect(
			instance.validate(
				"http://\u0192\u00F8\u00F8.\u00DF\u00E5r/?\u2202\u00E9\u0153=\u03C0\u00EEx#\u03C0\u00EE\u00FCx",
			),
		).toBeTruthy();
	});
	test("a valid IRI with anchor tag and parentheses", () => {
		const instance = new Schema(schema);
		expect(
			instance.validate(
				"http://\u0192\u00F8\u00F8.com/blah_(w\u00EEk\u00EFp\u00E9di\u00E5)_blah#\u00DFit\u00E9-1",
			),
		).toBeTruthy();
	});
	test("a valid IRI with URL-encoded stuff", () => {
		const instance = new Schema(schema);
		expect(
			instance.validate(
				"http://\u0192\u00F8\u00F8.\u00DF\u00E5r/?q=Test%20URL-encoded%20stuff",
			),
		).toBeTruthy();
	});
	test("a valid IRI with many special characters", () => {
		const instance = new Schema(schema);
		expect(
			instance.validate("http://-.~_!$&'()*+,;=:%40:80%2f::::::@example.com"),
		).toBeTruthy();
	});
	test("a valid IRI based on IPv6", () => {
		const instance = new Schema(schema);
		expect(
			instance.validate("http://[2001:0db8:85a3:0000:0000:8a2e:0370:7334]"),
		).toBeTruthy();
	});
	test("an invalid IRI based on IPv6", () => {
		const instance = new Schema(schema);
		expect(
			instance.validate("http://2001:0db8:85a3:0000:0000:8a2e:0370:7334"),
		).toBeFalsy();
	});
	test("an invalid relative IRI Reference", () => {
		const instance = new Schema(schema);
		expect(instance.validate("/abc")).toBeFalsy();
	});
	test("an invalid IRI", () => {
		const instance = new Schema(schema);
		expect(
			instance.validate("\\\\WINDOWS\\fil\u00EB\u00DF\u00E5r\u00E9"),
		).toBeFalsy();
	});
	test("an invalid IRI though valid IRI reference", () => {
		const instance = new Schema(schema);
		expect(instance.validate("\u00E2\u03C0\u03C0")).toBeFalsy();
	});
});
