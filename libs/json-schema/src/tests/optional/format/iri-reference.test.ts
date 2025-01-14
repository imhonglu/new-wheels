/* This file is automatically generated. Do not edit this file. */
import { describe, expect, test } from "vitest";
import { Schema } from "../schema.js";
describe("validation of IRI References", () => {
	const schema = {
		$schema: "https://json-schema.org/draft/2020-12/schema",
		format: "iri-reference",
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
	test("a valid IRI", () => {
		const instance = new Schema(schema);
		expect(
			instance.validate(
				"http://\u0192\u00F8\u00F8.\u00DF\u00E5r/?\u2202\u00E9\u0153=\u03C0\u00EEx#\u03C0\u00EE\u00FCx",
			),
		).toBeTruthy();
	});
	test("a valid protocol-relative IRI Reference", () => {
		const instance = new Schema(schema);
		expect(
			instance.validate(
				"//\u0192\u00F8\u00F8.\u00DF\u00E5r/?\u2202\u00E9\u0153=\u03C0\u00EEx#\u03C0\u00EE\u00FCx",
			),
		).toBeTruthy();
	});
	test("a valid relative IRI Reference", () => {
		const instance = new Schema(schema);
		expect(instance.validate("/\u00E2\u03C0\u03C0")).toBeTruthy();
	});
	test("an invalid IRI Reference", () => {
		const instance = new Schema(schema);
		expect(
			instance.validate("\\\\WINDOWS\\fil\u00EB\u00DF\u00E5r\u00E9"),
		).toBeFalsy();
	});
	test("a valid IRI Reference", () => {
		const instance = new Schema(schema);
		expect(instance.validate("\u00E2\u03C0\u03C0")).toBeTruthy();
	});
	test("a valid IRI fragment", () => {
		const instance = new Schema(schema);
		expect(instance.validate("#\u0192r\u00E4gm\u00EAnt")).toBeTruthy();
	});
	test("an invalid IRI fragment", () => {
		const instance = new Schema(schema);
		expect(instance.validate("#\u0192r\u00E4g\\m\u00EAnt")).toBeFalsy();
	});
});