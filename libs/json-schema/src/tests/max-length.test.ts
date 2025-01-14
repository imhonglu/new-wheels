/* This file is automatically generated. Do not edit this file. */
import { describe, expect, test } from "vitest";
import { Schema } from "../schema.js";
describe("maxLength validation", () => {
	const schema = {
		$schema: "https://json-schema.org/draft/2020-12/schema",
		maxLength: 2,
	};
	test("shorter is valid", () => {
		const instance = new Schema(schema);
		expect(instance.validate("f")).toBeTruthy();
	});
	test("exact length is valid", () => {
		const instance = new Schema(schema);
		expect(instance.validate("fo")).toBeTruthy();
	});
	test("too long is invalid", () => {
		const instance = new Schema(schema);
		expect(instance.validate("foo")).toBeFalsy();
	});
	test("ignores non-strings", () => {
		const instance = new Schema(schema);
		expect(instance.validate(100)).toBeTruthy();
	});
	test("two graphemes is long enough", () => {
		const instance = new Schema(schema);
		expect(instance.validate("\uD83D\uDCA9\uD83D\uDCA9")).toBeTruthy();
	});
});
describe("maxLength validation with a decimal", () => {
	const schema = {
		$schema: "https://json-schema.org/draft/2020-12/schema",
		maxLength: 2,
	};
	test("shorter is valid", () => {
		const instance = new Schema(schema);
		expect(instance.validate("f")).toBeTruthy();
	});
	test("too long is invalid", () => {
		const instance = new Schema(schema);
		expect(instance.validate("foo")).toBeFalsy();
	});
});
