/* This file is automatically generated. Do not edit this file. */
import { describe, expect, test } from "vitest";
import { Schema } from "../../../schema.js";
describe("uuid format", () => {
	const schema = {
		$schema: "https://json-schema.org/draft/2020-12/schema",
		format: "uuid",
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
	test("all upper-case", () => {
		const instance = new Schema(schema);
		expect(
			instance.validate("2EB8AA08-AA98-11EA-B4AA-73B441D16380"),
		).toBeTruthy();
	});
	test("all lower-case", () => {
		const instance = new Schema(schema);
		expect(
			instance.validate("2eb8aa08-aa98-11ea-b4aa-73b441d16380"),
		).toBeTruthy();
	});
	test("mixed case", () => {
		const instance = new Schema(schema);
		expect(
			instance.validate("2eb8aa08-AA98-11ea-B4Aa-73B441D16380"),
		).toBeTruthy();
	});
	test("all zeroes is valid", () => {
		const instance = new Schema(schema);
		expect(
			instance.validate("00000000-0000-0000-0000-000000000000"),
		).toBeTruthy();
	});
	test("wrong length", () => {
		const instance = new Schema(schema);
		expect(
			instance.validate("2eb8aa08-aa98-11ea-b4aa-73b441d1638"),
		).toBeFalsy();
	});
	test("missing section", () => {
		const instance = new Schema(schema);
		expect(instance.validate("2eb8aa08-aa98-11ea-73b441d16380")).toBeFalsy();
	});
	test("bad characters (not hex)", () => {
		const instance = new Schema(schema);
		expect(
			instance.validate("2eb8aa08-aa98-11ea-b4ga-73b441d16380"),
		).toBeFalsy();
	});
	test("no dashes", () => {
		const instance = new Schema(schema);
		expect(instance.validate("2eb8aa08aa9811eab4aa73b441d16380")).toBeFalsy();
	});
	test("too few dashes", () => {
		const instance = new Schema(schema);
		expect(instance.validate("2eb8aa08aa98-11ea-b4aa73b441d16380")).toBeFalsy();
	});
	test("too many dashes", () => {
		const instance = new Schema(schema);
		expect(
			instance.validate("2eb8-aa08-aa98-11ea-b4aa73b44-1d16380"),
		).toBeFalsy();
	});
	test("dashes in the wrong spot", () => {
		const instance = new Schema(schema);
		expect(
			instance.validate("2eb8aa08aa9811eab4aa73b441d16380----"),
		).toBeFalsy();
	});
	test("valid version 4", () => {
		const instance = new Schema(schema);
		expect(
			instance.validate("98d80576-482e-427f-8434-7f86890ab222"),
		).toBeTruthy();
	});
	test("valid version 5", () => {
		const instance = new Schema(schema);
		expect(
			instance.validate("99c17cbb-656f-564a-940f-1a4568f03487"),
		).toBeTruthy();
	});
	test("hypothetical version 6", () => {
		const instance = new Schema(schema);
		expect(
			instance.validate("99c17cbb-656f-664a-940f-1a4568f03487"),
		).toBeTruthy();
	});
	test("hypothetical version 15", () => {
		const instance = new Schema(schema);
		expect(
			instance.validate("99c17cbb-656f-f64a-940f-1a4568f03487"),
		).toBeTruthy();
	});
});
