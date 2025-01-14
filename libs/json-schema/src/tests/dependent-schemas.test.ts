/* This file is automatically generated. Do not edit this file. */
import { describe, expect, test } from "vitest";
import { Schema } from "../schema.js";
describe("single dependency", () => {
	const schema = {
		$schema: "https://json-schema.org/draft/2020-12/schema",
		dependentSchemas: {
			bar: {
				properties: { foo: { type: "integer" }, bar: { type: "integer" } },
			},
		},
	};
	test("valid", () => {
		const instance = new Schema(schema);
		expect(instance.validate({ foo: 1, bar: 2 })).toBeTruthy();
	});
	test("no dependency", () => {
		const instance = new Schema(schema);
		expect(instance.validate({ foo: "quux" })).toBeTruthy();
	});
	test("wrong type", () => {
		const instance = new Schema(schema);
		expect(instance.validate({ foo: "quux", bar: 2 })).toBeFalsy();
	});
	test("wrong type other", () => {
		const instance = new Schema(schema);
		expect(instance.validate({ foo: 2, bar: "quux" })).toBeFalsy();
	});
	test("wrong type both", () => {
		const instance = new Schema(schema);
		expect(instance.validate({ foo: "quux", bar: "quux" })).toBeFalsy();
	});
	test("ignores arrays", () => {
		const instance = new Schema(schema);
		expect(instance.validate(["bar"])).toBeTruthy();
	});
	test("ignores strings", () => {
		const instance = new Schema(schema);
		expect(instance.validate("foobar")).toBeTruthy();
	});
	test("ignores other non-objects", () => {
		const instance = new Schema(schema);
		expect(instance.validate(12)).toBeTruthy();
	});
});
describe("boolean subschemas", () => {
	const schema = {
		$schema: "https://json-schema.org/draft/2020-12/schema",
		dependentSchemas: { foo: true, bar: false },
	};
	test("object with property having schema true is valid", () => {
		const instance = new Schema(schema);
		expect(instance.validate({ foo: 1 })).toBeTruthy();
	});
	test("object with property having schema false is invalid", () => {
		const instance = new Schema(schema);
		expect(instance.validate({ bar: 2 })).toBeFalsy();
	});
	test("object with both properties is invalid", () => {
		const instance = new Schema(schema);
		expect(instance.validate({ foo: 1, bar: 2 })).toBeFalsy();
	});
	test("empty object is valid", () => {
		const instance = new Schema(schema);
		expect(instance.validate({})).toBeTruthy();
	});
});
describe("dependencies with escaped characters", () => {
	const schema = {
		$schema: "https://json-schema.org/draft/2020-12/schema",
		dependentSchemas: {
			"foo\tbar": { minProperties: 4 },
			"foo'bar": { required: ['foo"bar'] },
		},
	};
	test("quoted tab", () => {
		const instance = new Schema(schema);
		expect(instance.validate({ "foo\tbar": 1, a: 2, b: 3, c: 4 })).toBeTruthy();
	});
	test("quoted quote", () => {
		const instance = new Schema(schema);
		expect(instance.validate({ "foo'bar": { 'foo"bar': 1 } })).toBeFalsy();
	});
	test("quoted tab invalid under dependent schema", () => {
		const instance = new Schema(schema);
		expect(instance.validate({ "foo\tbar": 1, a: 2 })).toBeFalsy();
	});
	test("quoted quote invalid under dependent schema", () => {
		const instance = new Schema(schema);
		expect(instance.validate({ "foo'bar": 1 })).toBeFalsy();
	});
});
describe("dependent subschema incompatible with root", () => {
	const schema = {
		$schema: "https://json-schema.org/draft/2020-12/schema",
		properties: { foo: {} },
		dependentSchemas: {
			foo: { properties: { bar: {} }, additionalProperties: false },
		},
	};
	test("matches root", () => {
		const instance = new Schema(schema);
		expect(instance.validate({ foo: 1 })).toBeFalsy();
	});
	test("matches dependency", () => {
		const instance = new Schema(schema);
		expect(instance.validate({ bar: 1 })).toBeTruthy();
	});
	test("matches both", () => {
		const instance = new Schema(schema);
		expect(instance.validate({ foo: 1, bar: 2 })).toBeFalsy();
	});
	test("no dependency", () => {
		const instance = new Schema(schema);
		expect(instance.validate({ baz: 1 })).toBeTruthy();
	});
});
