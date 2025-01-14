/* This file is automatically generated. Do not edit this file. */
import { describe, expect, test } from "vitest";
import { Schema } from "../schema.js";
describe("invalid type for default", () => {
	const schema = {
		$schema: "https://json-schema.org/draft/2020-12/schema",
		properties: { foo: { type: "integer", default: [] } },
	};
	test("valid when property is specified", () => {
		const instance = new Schema(schema);
		expect(instance.validate({ foo: 13 })).toBeTruthy();
	});
	test("still valid when the invalid default is used", () => {
		const instance = new Schema(schema);
		expect(instance.validate({})).toBeTruthy();
	});
});
describe("invalid string value for default", () => {
	const schema = {
		$schema: "https://json-schema.org/draft/2020-12/schema",
		properties: { bar: { type: "string", minLength: 4, default: "bad" } },
	};
	test("valid when property is specified", () => {
		const instance = new Schema(schema);
		expect(instance.validate({ bar: "good" })).toBeTruthy();
	});
	test("still valid when the invalid default is used", () => {
		const instance = new Schema(schema);
		expect(instance.validate({})).toBeTruthy();
	});
});
describe("the default keyword does not do anything if the property is missing", () => {
	const schema = {
		$schema: "https://json-schema.org/draft/2020-12/schema",
		type: "object",
		properties: { alpha: { type: "number", maximum: 3, default: 5 } },
	};
	test("an explicit property value is checked against maximum (passing)", () => {
		const instance = new Schema(schema);
		expect(instance.validate({ alpha: 1 })).toBeTruthy();
	});
	test("an explicit property value is checked against maximum (failing)", () => {
		const instance = new Schema(schema);
		expect(instance.validate({ alpha: 5 })).toBeFalsy();
	});
	test("missing properties are not filled in with the default", () => {
		const instance = new Schema(schema);
		expect(instance.validate({})).toBeTruthy();
	});
});
