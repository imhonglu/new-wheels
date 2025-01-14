/* This file is automatically generated. Do not edit this file. */
import { describe, expect, test } from "vitest";
import { Schema } from "../schema.js";
describe("integer type matches integers", () => {
	const schema = {
		$schema: "https://json-schema.org/draft/2020-12/schema",
		type: "integer",
	};
	test("an integer is an integer", () => {
		const instance = new Schema(schema);
		expect(instance.validate(1)).toBeTruthy();
	});
	test("a float with zero fractional part is an integer", () => {
		const instance = new Schema(schema);
		expect(instance.validate(1)).toBeTruthy();
	});
	test("a float is not an integer", () => {
		const instance = new Schema(schema);
		expect(instance.validate(1.1)).toBeFalsy();
	});
	test("a string is not an integer", () => {
		const instance = new Schema(schema);
		expect(instance.validate("foo")).toBeFalsy();
	});
	test("a string is still not an integer, even if it looks like one", () => {
		const instance = new Schema(schema);
		expect(instance.validate("1")).toBeFalsy();
	});
	test("an object is not an integer", () => {
		const instance = new Schema(schema);
		expect(instance.validate({})).toBeFalsy();
	});
	test("an array is not an integer", () => {
		const instance = new Schema(schema);
		expect(instance.validate([])).toBeFalsy();
	});
	test("a boolean is not an integer", () => {
		const instance = new Schema(schema);
		expect(instance.validate(true)).toBeFalsy();
	});
	test("null is not an integer", () => {
		const instance = new Schema(schema);
		expect(instance.validate(null)).toBeFalsy();
	});
});
describe("number type matches numbers", () => {
	const schema = {
		$schema: "https://json-schema.org/draft/2020-12/schema",
		type: "number",
	};
	test("an integer is a number", () => {
		const instance = new Schema(schema);
		expect(instance.validate(1)).toBeTruthy();
	});
	test("a float with zero fractional part is a number (and an integer)", () => {
		const instance = new Schema(schema);
		expect(instance.validate(1)).toBeTruthy();
	});
	test("a float is a number", () => {
		const instance = new Schema(schema);
		expect(instance.validate(1.1)).toBeTruthy();
	});
	test("a string is not a number", () => {
		const instance = new Schema(schema);
		expect(instance.validate("foo")).toBeFalsy();
	});
	test("a string is still not a number, even if it looks like one", () => {
		const instance = new Schema(schema);
		expect(instance.validate("1")).toBeFalsy();
	});
	test("an object is not a number", () => {
		const instance = new Schema(schema);
		expect(instance.validate({})).toBeFalsy();
	});
	test("an array is not a number", () => {
		const instance = new Schema(schema);
		expect(instance.validate([])).toBeFalsy();
	});
	test("a boolean is not a number", () => {
		const instance = new Schema(schema);
		expect(instance.validate(true)).toBeFalsy();
	});
	test("null is not a number", () => {
		const instance = new Schema(schema);
		expect(instance.validate(null)).toBeFalsy();
	});
});
describe("string type matches strings", () => {
	const schema = {
		$schema: "https://json-schema.org/draft/2020-12/schema",
		type: "string",
	};
	test("1 is not a string", () => {
		const instance = new Schema(schema);
		expect(instance.validate(1)).toBeFalsy();
	});
	test("a float is not a string", () => {
		const instance = new Schema(schema);
		expect(instance.validate(1.1)).toBeFalsy();
	});
	test("a string is a string", () => {
		const instance = new Schema(schema);
		expect(instance.validate("foo")).toBeTruthy();
	});
	test("a string is still a string, even if it looks like a number", () => {
		const instance = new Schema(schema);
		expect(instance.validate("1")).toBeTruthy();
	});
	test("an empty string is still a string", () => {
		const instance = new Schema(schema);
		expect(instance.validate("")).toBeTruthy();
	});
	test("an object is not a string", () => {
		const instance = new Schema(schema);
		expect(instance.validate({})).toBeFalsy();
	});
	test("an array is not a string", () => {
		const instance = new Schema(schema);
		expect(instance.validate([])).toBeFalsy();
	});
	test("a boolean is not a string", () => {
		const instance = new Schema(schema);
		expect(instance.validate(true)).toBeFalsy();
	});
	test("null is not a string", () => {
		const instance = new Schema(schema);
		expect(instance.validate(null)).toBeFalsy();
	});
});
describe("object type matches objects", () => {
	const schema = {
		$schema: "https://json-schema.org/draft/2020-12/schema",
		type: "object",
	};
	test("an integer is not an object", () => {
		const instance = new Schema(schema);
		expect(instance.validate(1)).toBeFalsy();
	});
	test("a float is not an object", () => {
		const instance = new Schema(schema);
		expect(instance.validate(1.1)).toBeFalsy();
	});
	test("a string is not an object", () => {
		const instance = new Schema(schema);
		expect(instance.validate("foo")).toBeFalsy();
	});
	test("an object is an object", () => {
		const instance = new Schema(schema);
		expect(instance.validate({})).toBeTruthy();
	});
	test("an array is not an object", () => {
		const instance = new Schema(schema);
		expect(instance.validate([])).toBeFalsy();
	});
	test("a boolean is not an object", () => {
		const instance = new Schema(schema);
		expect(instance.validate(true)).toBeFalsy();
	});
	test("null is not an object", () => {
		const instance = new Schema(schema);
		expect(instance.validate(null)).toBeFalsy();
	});
});
describe("array type matches arrays", () => {
	const schema = {
		$schema: "https://json-schema.org/draft/2020-12/schema",
		type: "array",
	};
	test("an integer is not an array", () => {
		const instance = new Schema(schema);
		expect(instance.validate(1)).toBeFalsy();
	});
	test("a float is not an array", () => {
		const instance = new Schema(schema);
		expect(instance.validate(1.1)).toBeFalsy();
	});
	test("a string is not an array", () => {
		const instance = new Schema(schema);
		expect(instance.validate("foo")).toBeFalsy();
	});
	test("an object is not an array", () => {
		const instance = new Schema(schema);
		expect(instance.validate({})).toBeFalsy();
	});
	test("an array is an array", () => {
		const instance = new Schema(schema);
		expect(instance.validate([])).toBeTruthy();
	});
	test("a boolean is not an array", () => {
		const instance = new Schema(schema);
		expect(instance.validate(true)).toBeFalsy();
	});
	test("null is not an array", () => {
		const instance = new Schema(schema);
		expect(instance.validate(null)).toBeFalsy();
	});
});
describe("boolean type matches booleans", () => {
	const schema = {
		$schema: "https://json-schema.org/draft/2020-12/schema",
		type: "boolean",
	};
	test("an integer is not a boolean", () => {
		const instance = new Schema(schema);
		expect(instance.validate(1)).toBeFalsy();
	});
	test("zero is not a boolean", () => {
		const instance = new Schema(schema);
		expect(instance.validate(0)).toBeFalsy();
	});
	test("a float is not a boolean", () => {
		const instance = new Schema(schema);
		expect(instance.validate(1.1)).toBeFalsy();
	});
	test("a string is not a boolean", () => {
		const instance = new Schema(schema);
		expect(instance.validate("foo")).toBeFalsy();
	});
	test("an empty string is not a boolean", () => {
		const instance = new Schema(schema);
		expect(instance.validate("")).toBeFalsy();
	});
	test("an object is not a boolean", () => {
		const instance = new Schema(schema);
		expect(instance.validate({})).toBeFalsy();
	});
	test("an array is not a boolean", () => {
		const instance = new Schema(schema);
		expect(instance.validate([])).toBeFalsy();
	});
	test("true is a boolean", () => {
		const instance = new Schema(schema);
		expect(instance.validate(true)).toBeTruthy();
	});
	test("false is a boolean", () => {
		const instance = new Schema(schema);
		expect(instance.validate(false)).toBeTruthy();
	});
	test("null is not a boolean", () => {
		const instance = new Schema(schema);
		expect(instance.validate(null)).toBeFalsy();
	});
});
describe("null type matches only the null object", () => {
	const schema = {
		$schema: "https://json-schema.org/draft/2020-12/schema",
		type: "null",
	};
	test("an integer is not null", () => {
		const instance = new Schema(schema);
		expect(instance.validate(1)).toBeFalsy();
	});
	test("a float is not null", () => {
		const instance = new Schema(schema);
		expect(instance.validate(1.1)).toBeFalsy();
	});
	test("zero is not null", () => {
		const instance = new Schema(schema);
		expect(instance.validate(0)).toBeFalsy();
	});
	test("a string is not null", () => {
		const instance = new Schema(schema);
		expect(instance.validate("foo")).toBeFalsy();
	});
	test("an empty string is not null", () => {
		const instance = new Schema(schema);
		expect(instance.validate("")).toBeFalsy();
	});
	test("an object is not null", () => {
		const instance = new Schema(schema);
		expect(instance.validate({})).toBeFalsy();
	});
	test("an array is not null", () => {
		const instance = new Schema(schema);
		expect(instance.validate([])).toBeFalsy();
	});
	test("true is not null", () => {
		const instance = new Schema(schema);
		expect(instance.validate(true)).toBeFalsy();
	});
	test("false is not null", () => {
		const instance = new Schema(schema);
		expect(instance.validate(false)).toBeFalsy();
	});
	test("null is null", () => {
		const instance = new Schema(schema);
		expect(instance.validate(null)).toBeTruthy();
	});
});
describe("multiple types can be specified in an array", () => {
	const schema = {
		$schema: "https://json-schema.org/draft/2020-12/schema",
		type: ["integer", "string"],
	};
	test("an integer is valid", () => {
		const instance = new Schema(schema);
		expect(instance.validate(1)).toBeTruthy();
	});
	test("a string is valid", () => {
		const instance = new Schema(schema);
		expect(instance.validate("foo")).toBeTruthy();
	});
	test("a float is invalid", () => {
		const instance = new Schema(schema);
		expect(instance.validate(1.1)).toBeFalsy();
	});
	test("an object is invalid", () => {
		const instance = new Schema(schema);
		expect(instance.validate({})).toBeFalsy();
	});
	test("an array is invalid", () => {
		const instance = new Schema(schema);
		expect(instance.validate([])).toBeFalsy();
	});
	test("a boolean is invalid", () => {
		const instance = new Schema(schema);
		expect(instance.validate(true)).toBeFalsy();
	});
	test("null is invalid", () => {
		const instance = new Schema(schema);
		expect(instance.validate(null)).toBeFalsy();
	});
});
describe("type as array with one item", () => {
	const schema = {
		$schema: "https://json-schema.org/draft/2020-12/schema",
		type: ["string"],
	};
	test("string is valid", () => {
		const instance = new Schema(schema);
		expect(instance.validate("foo")).toBeTruthy();
	});
	test("number is invalid", () => {
		const instance = new Schema(schema);
		expect(instance.validate(123)).toBeFalsy();
	});
});
describe("type: array or object", () => {
	const schema = {
		$schema: "https://json-schema.org/draft/2020-12/schema",
		type: ["array", "object"],
	};
	test("array is valid", () => {
		const instance = new Schema(schema);
		expect(instance.validate([1, 2, 3])).toBeTruthy();
	});
	test("object is valid", () => {
		const instance = new Schema(schema);
		expect(instance.validate({ foo: 123 })).toBeTruthy();
	});
	test("number is invalid", () => {
		const instance = new Schema(schema);
		expect(instance.validate(123)).toBeFalsy();
	});
	test("string is invalid", () => {
		const instance = new Schema(schema);
		expect(instance.validate("foo")).toBeFalsy();
	});
	test("null is invalid", () => {
		const instance = new Schema(schema);
		expect(instance.validate(null)).toBeFalsy();
	});
});
describe("type: array, object or null", () => {
	const schema = {
		$schema: "https://json-schema.org/draft/2020-12/schema",
		type: ["array", "object", "null"],
	};
	test("array is valid", () => {
		const instance = new Schema(schema);
		expect(instance.validate([1, 2, 3])).toBeTruthy();
	});
	test("object is valid", () => {
		const instance = new Schema(schema);
		expect(instance.validate({ foo: 123 })).toBeTruthy();
	});
	test("null is valid", () => {
		const instance = new Schema(schema);
		expect(instance.validate(null)).toBeTruthy();
	});
	test("number is invalid", () => {
		const instance = new Schema(schema);
		expect(instance.validate(123)).toBeFalsy();
	});
	test("string is invalid", () => {
		const instance = new Schema(schema);
		expect(instance.validate("foo")).toBeFalsy();
	});
});