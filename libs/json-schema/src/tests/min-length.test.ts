/* This file is automatically generated. Do not edit this file. */
import { describe, expect, test } from "vitest";
import { Schema } from "../schema.js";
describe("minLength validation", () => {
	const schema = {
		$schema: "https://json-schema.org/draft/2020-12/schema",
		minLength: 2,
	};
	test("longer is valid", () => {
		const instance = new Schema(schema);
		expect(instance.validate("foo")).toBeTruthy();
	});
	test("exact length is valid", () => {
		const instance = new Schema(schema);
		expect(instance.validate("fo")).toBeTruthy();
	});
	test("too short is invalid", () => {
		const instance = new Schema(schema);
		expect(instance.validate("f")).toBeFalsy();
	});
	test("ignores non-strings", () => {
		const instance = new Schema(schema);
		expect(instance.validate(1)).toBeTruthy();
	});
	test("one grapheme is not long enough", () => {
		const instance = new Schema(schema);
		expect(instance.validate("\uD83D\uDCA9")).toBeFalsy();
	});
});
describe("minLength validation with a decimal", () => {
	const schema = {
		$schema: "https://json-schema.org/draft/2020-12/schema",
		minLength: 2,
	};
	test("longer is valid", () => {
		const instance = new Schema(schema);
		expect(instance.validate("foo")).toBeTruthy();
	});
	test("too short is invalid", () => {
		const instance = new Schema(schema);
		expect(instance.validate("f")).toBeFalsy();
	});
});
