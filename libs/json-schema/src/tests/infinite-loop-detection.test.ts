/* This file is automatically generated. Do not edit this file. */
import { describe, expect, test } from "vitest";
import { Schema } from "../schema.js";
describe("evaluating the same schema location against the same data location twice is not a sign of an infinite loop", () => {
	const schema = {
		$schema: "https://json-schema.org/draft/2020-12/schema",
		$defs: { int: { type: "integer" } },
		allOf: [
			{ properties: { foo: { $ref: "#/$defs/int" } } },
			{ additionalProperties: { $ref: "#/$defs/int" } },
		],
	};
	test("passing case", () => {
		const instance = new Schema(schema);
		expect(instance.validate({ foo: 1 })).toBeTruthy();
	});
	test("failing case", () => {
		const instance = new Schema(schema);
		expect(instance.validate({ foo: "a string" })).toBeFalsy();
	});
});
