import { describe, expect, test } from "vitest";
import { InvalidVarspecError } from "./errors/invalid-varspec-error.js";
import { Varspec } from "./varspec.js";

describe("Varspec", () => {
	test("should parse a valid Varspec string", () => {
		expect(Varspec.parse("name")).toMatchObject({
			name: "name",
			modifier: undefined,
		});

		expect(Varspec.parse("name").toString()).toBe("name");
		expect(JSON.stringify(Varspec.parse("name"))).toBe('"name"');
	});

	test("should parse explode modifier", () => {
		expect(Varspec.parse("list*")).toMatchObject({
			name: "list",
			modifier: {
				type: "explode",
			},
		});
	});

	test("should parse prefix modifier", () => {
		expect(Varspec.parse("path:4")).toMatchObject({
			name: "path",
			modifier: {
				type: "prefix",
				maxLength: 4,
			},
		});
	});

	test("should parse variable name with dots", () => {
		expect(Varspec.parse("user.name")).toMatchObject({
			name: "user.name",
			modifier: undefined,
		});
	});

	test("should parse percent-encoded characters", () => {
		expect(Varspec.parse("user%20name")).toMatchObject({
			name: "user%20name",
			modifier: undefined,
		});
	});

	test("should throw InvalidVarspecError for invalid input", () => {
		expect(() => Varspec.parse("")).toThrow(InvalidVarspecError);
		expect(() => Varspec.parse("@invalid")).toThrow(InvalidVarspecError);
		expect(() => Varspec.parse("name:")).toThrow(InvalidVarspecError);
		expect(() => Varspec.parse(".name")).toThrow(InvalidVarspecError);
		expect(() => Varspec.parse("name.")).toThrow(InvalidVarspecError);
	});
});
