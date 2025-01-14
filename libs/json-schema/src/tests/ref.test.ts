/* This file is automatically generated. Do not edit this file. */
import { describe, expect, test } from "vitest";
import { Schema } from "../schema.js";
describe("root pointer ref", () => {
	const schema = {
		$schema: "https://json-schema.org/draft/2020-12/schema",
		properties: { foo: { $ref: "#" } },
		additionalProperties: false,
	};
	test("match", () => {
		const instance = new Schema(schema);
		expect(instance.validate({ foo: false })).toBeTruthy();
	});
	test("recursive match", () => {
		const instance = new Schema(schema);
		expect(instance.validate({ foo: { foo: false } })).toBeTruthy();
	});
	test("mismatch", () => {
		const instance = new Schema(schema);
		expect(instance.validate({ bar: false })).toBeFalsy();
	});
	test("recursive mismatch", () => {
		const instance = new Schema(schema);
		expect(instance.validate({ foo: { bar: false } })).toBeFalsy();
	});
});
describe("relative pointer ref to object", () => {
	const schema = {
		$schema: "https://json-schema.org/draft/2020-12/schema",
		properties: { foo: { type: "integer" }, bar: { $ref: "#/properties/foo" } },
	};
	test("match", () => {
		const instance = new Schema(schema);
		expect(instance.validate({ bar: 3 })).toBeTruthy();
	});
	test("mismatch", () => {
		const instance = new Schema(schema);
		expect(instance.validate({ bar: true })).toBeFalsy();
	});
});
describe("relative pointer ref to array", () => {
	const schema = {
		$schema: "https://json-schema.org/draft/2020-12/schema",
		prefixItems: [{ type: "integer" }, { $ref: "#/prefixItems/0" }],
	};
	test("match array", () => {
		const instance = new Schema(schema);
		expect(instance.validate([1, 2])).toBeTruthy();
	});
	test("mismatch array", () => {
		const instance = new Schema(schema);
		expect(instance.validate([1, "foo"])).toBeFalsy();
	});
});
describe("escaped pointer ref", () => {
	const schema = {
		$schema: "https://json-schema.org/draft/2020-12/schema",
		$defs: {
			"tilde~field": { type: "integer" },
			"slash/field": { type: "integer" },
			"percent%field": { type: "integer" },
		},
		properties: {
			tilde: { $ref: "#/$defs/tilde~0field" },
			slash: { $ref: "#/$defs/slash~1field" },
			percent: { $ref: "#/$defs/percent%25field" },
		},
	};
	test("slash invalid", () => {
		const instance = new Schema(schema);
		expect(instance.validate({ slash: "aoeu" })).toBeFalsy();
	});
	test("tilde invalid", () => {
		const instance = new Schema(schema);
		expect(instance.validate({ tilde: "aoeu" })).toBeFalsy();
	});
	test("percent invalid", () => {
		const instance = new Schema(schema);
		expect(instance.validate({ percent: "aoeu" })).toBeFalsy();
	});
	test("slash valid", () => {
		const instance = new Schema(schema);
		expect(instance.validate({ slash: 123 })).toBeTruthy();
	});
	test("tilde valid", () => {
		const instance = new Schema(schema);
		expect(instance.validate({ tilde: 123 })).toBeTruthy();
	});
	test("percent valid", () => {
		const instance = new Schema(schema);
		expect(instance.validate({ percent: 123 })).toBeTruthy();
	});
});
describe("nested refs", () => {
	const schema = {
		$schema: "https://json-schema.org/draft/2020-12/schema",
		$defs: {
			a: { type: "integer" },
			b: { $ref: "#/$defs/a" },
			c: { $ref: "#/$defs/b" },
		},
		$ref: "#/$defs/c",
	};
	test("nested ref valid", () => {
		const instance = new Schema(schema);
		expect(instance.validate(5)).toBeTruthy();
	});
	test("nested ref invalid", () => {
		const instance = new Schema(schema);
		expect(instance.validate("a")).toBeFalsy();
	});
});
describe("ref applies alongside sibling keywords", () => {
	const schema = {
		$schema: "https://json-schema.org/draft/2020-12/schema",
		$defs: { reffed: { type: "array" } },
		properties: { foo: { $ref: "#/$defs/reffed", maxItems: 2 } },
	};
	test("ref valid, maxItems valid", () => {
		const instance = new Schema(schema);
		expect(instance.validate({ foo: [] })).toBeTruthy();
	});
	test("ref valid, maxItems invalid", () => {
		const instance = new Schema(schema);
		expect(instance.validate({ foo: [1, 2, 3] })).toBeFalsy();
	});
	test("ref invalid", () => {
		const instance = new Schema(schema);
		expect(instance.validate({ foo: "string" })).toBeFalsy();
	});
});
describe("remote ref, containing refs itself", () => {
	const schema = {
		$schema: "https://json-schema.org/draft/2020-12/schema",
		$ref: "https://json-schema.org/draft/2020-12/schema",
	};
	test("remote ref valid", () => {
		const instance = new Schema(schema);
		expect(instance.validate({ minLength: 1 })).toBeTruthy();
	});
	test("remote ref invalid", () => {
		const instance = new Schema(schema);
		expect(instance.validate({ minLength: -1 })).toBeFalsy();
	});
});
describe("property named $ref that is not a reference", () => {
	const schema = {
		$schema: "https://json-schema.org/draft/2020-12/schema",
		properties: { $ref: { type: "string" } },
	};
	test("property named $ref valid", () => {
		const instance = new Schema(schema);
		expect(instance.validate({ $ref: "a" })).toBeTruthy();
	});
	test("property named $ref invalid", () => {
		const instance = new Schema(schema);
		expect(instance.validate({ $ref: 2 })).toBeFalsy();
	});
});
describe("property named $ref, containing an actual $ref", () => {
	const schema = {
		$schema: "https://json-schema.org/draft/2020-12/schema",
		properties: { $ref: { $ref: "#/$defs/is-string" } },
		$defs: { "is-string": { type: "string" } },
	};
	test("property named $ref valid", () => {
		const instance = new Schema(schema);
		expect(instance.validate({ $ref: "a" })).toBeTruthy();
	});
	test("property named $ref invalid", () => {
		const instance = new Schema(schema);
		expect(instance.validate({ $ref: 2 })).toBeFalsy();
	});
});
describe("$ref to boolean schema true", () => {
	const schema = {
		$schema: "https://json-schema.org/draft/2020-12/schema",
		$ref: "#/$defs/bool",
		$defs: { bool: true },
	};
	test("any value is valid", () => {
		const instance = new Schema(schema);
		expect(instance.validate("foo")).toBeTruthy();
	});
});
describe("$ref to boolean schema false", () => {
	const schema = {
		$schema: "https://json-schema.org/draft/2020-12/schema",
		$ref: "#/$defs/bool",
		$defs: { bool: false },
	};
	test("any value is invalid", () => {
		const instance = new Schema(schema);
		expect(instance.validate("foo")).toBeFalsy();
	});
});
describe("Recursive references between schemas", () => {
	const schema = {
		$schema: "https://json-schema.org/draft/2020-12/schema",
		$id: "http://localhost:1234/draft2020-12/tree",
		description: "tree of nodes",
		type: "object",
		properties: {
			meta: { type: "string" },
			nodes: { type: "array", items: { $ref: "node" } },
		},
		required: ["meta", "nodes"],
		$defs: {
			node: {
				$id: "http://localhost:1234/draft2020-12/node",
				description: "node",
				type: "object",
				properties: { value: { type: "number" }, subtree: { $ref: "tree" } },
				required: ["value"],
			},
		},
	};
	test("valid tree", () => {
		const instance = new Schema(schema);
		expect(
			instance.validate({
				meta: "root",
				nodes: [
					{
						value: 1,
						subtree: { meta: "child", nodes: [{ value: 1.1 }, { value: 1.2 }] },
					},
					{
						value: 2,
						subtree: { meta: "child", nodes: [{ value: 2.1 }, { value: 2.2 }] },
					},
				],
			}),
		).toBeTruthy();
	});
	test("invalid tree", () => {
		const instance = new Schema(schema);
		expect(
			instance.validate({
				meta: "root",
				nodes: [
					{
						value: 1,
						subtree: {
							meta: "child",
							nodes: [{ value: "string is invalid" }, { value: 1.2 }],
						},
					},
					{
						value: 2,
						subtree: { meta: "child", nodes: [{ value: 2.1 }, { value: 2.2 }] },
					},
				],
			}),
		).toBeFalsy();
	});
});
describe("refs with quote", () => {
	const schema = {
		$schema: "https://json-schema.org/draft/2020-12/schema",
		properties: { 'foo"bar': { $ref: "#/$defs/foo%22bar" } },
		$defs: { 'foo"bar': { type: "number" } },
	};
	test("object with numbers is valid", () => {
		const instance = new Schema(schema);
		expect(instance.validate({ 'foo"bar': 1 })).toBeTruthy();
	});
	test("object with strings is invalid", () => {
		const instance = new Schema(schema);
		expect(instance.validate({ 'foo"bar': "1" })).toBeFalsy();
	});
});
describe("ref creates new scope when adjacent to keywords", () => {
	const schema = {
		$schema: "https://json-schema.org/draft/2020-12/schema",
		$defs: { A: { unevaluatedProperties: false } },
		properties: { prop1: { type: "string" } },
		$ref: "#/$defs/A",
	};
	test("referenced subschema doesn't see annotations from properties", () => {
		const instance = new Schema(schema);
		expect(instance.validate({ prop1: "match" })).toBeFalsy();
	});
});
describe("naive replacement of $ref with its destination is not correct", () => {
	const schema = {
		$schema: "https://json-schema.org/draft/2020-12/schema",
		$defs: { a_string: { type: "string" } },
		enum: [{ $ref: "#/$defs/a_string" }],
	};
	test("do not evaluate the $ref inside the enum, matching any string", () => {
		const instance = new Schema(schema);
		expect(instance.validate("this is a string")).toBeFalsy();
	});
	test("do not evaluate the $ref inside the enum, definition exact match", () => {
		const instance = new Schema(schema);
		expect(instance.validate({ type: "string" })).toBeFalsy();
	});
	test("match the enum exactly", () => {
		const instance = new Schema(schema);
		expect(instance.validate({ $ref: "#/$defs/a_string" })).toBeTruthy();
	});
});
describe("refs with relative uris and defs", () => {
	const schema = {
		$schema: "https://json-schema.org/draft/2020-12/schema",
		$id: "http://example.com/schema-relative-uri-defs1.json",
		properties: {
			foo: {
				$id: "schema-relative-uri-defs2.json",
				$defs: { inner: { properties: { bar: { type: "string" } } } },
				$ref: "#/$defs/inner",
			},
		},
		$ref: "schema-relative-uri-defs2.json",
	};
	test("invalid on inner field", () => {
		const instance = new Schema(schema);
		expect(instance.validate({ foo: { bar: 1 }, bar: "a" })).toBeFalsy();
	});
	test("invalid on outer field", () => {
		const instance = new Schema(schema);
		expect(instance.validate({ foo: { bar: "a" }, bar: 1 })).toBeFalsy();
	});
	test("valid on both fields", () => {
		const instance = new Schema(schema);
		expect(instance.validate({ foo: { bar: "a" }, bar: "a" })).toBeTruthy();
	});
});
describe("relative refs with absolute uris and defs", () => {
	const schema = {
		$schema: "https://json-schema.org/draft/2020-12/schema",
		$id: "http://example.com/schema-refs-absolute-uris-defs1.json",
		properties: {
			foo: {
				$id: "http://example.com/schema-refs-absolute-uris-defs2.json",
				$defs: { inner: { properties: { bar: { type: "string" } } } },
				$ref: "#/$defs/inner",
			},
		},
		$ref: "schema-refs-absolute-uris-defs2.json",
	};
	test("invalid on inner field", () => {
		const instance = new Schema(schema);
		expect(instance.validate({ foo: { bar: 1 }, bar: "a" })).toBeFalsy();
	});
	test("invalid on outer field", () => {
		const instance = new Schema(schema);
		expect(instance.validate({ foo: { bar: "a" }, bar: 1 })).toBeFalsy();
	});
	test("valid on both fields", () => {
		const instance = new Schema(schema);
		expect(instance.validate({ foo: { bar: "a" }, bar: "a" })).toBeTruthy();
	});
});
describe("$id must be resolved against nearest parent, not just immediate parent", () => {
	const schema = {
		$schema: "https://json-schema.org/draft/2020-12/schema",
		$id: "http://example.com/a.json",
		$defs: {
			x: {
				$id: "http://example.com/b/c.json",
				not: { $defs: { y: { $id: "d.json", type: "number" } } },
			},
		},
		allOf: [{ $ref: "http://example.com/b/d.json" }],
	};
	test("number is valid", () => {
		const instance = new Schema(schema);
		expect(instance.validate(1)).toBeTruthy();
	});
	test("non-number is invalid", () => {
		const instance = new Schema(schema);
		expect(instance.validate("a")).toBeFalsy();
	});
});
describe("order of evaluation: $id and $ref", () => {
	const schema = {
		$comment:
			"$id must be evaluated before $ref to get the proper $ref destination",
		$schema: "https://json-schema.org/draft/2020-12/schema",
		$id: "https://example.com/draft2020-12/ref-and-id1/base.json",
		$ref: "int.json",
		$defs: {
			bigint: {
				$comment: "canonical uri: https://example.com/ref-and-id1/int.json",
				$id: "int.json",
				maximum: 10,
			},
			smallint: {
				$comment: "canonical uri: https://example.com/ref-and-id1-int.json",
				$id: "/draft2020-12/ref-and-id1-int.json",
				maximum: 2,
			},
		},
	};
	test("data is valid against first definition", () => {
		const instance = new Schema(schema);
		expect(instance.validate(5)).toBeTruthy();
	});
	test("data is invalid against first definition", () => {
		const instance = new Schema(schema);
		expect(instance.validate(50)).toBeFalsy();
	});
});
describe("order of evaluation: $id and $anchor and $ref", () => {
	const schema = {
		$comment:
			"$id must be evaluated before $ref to get the proper $ref destination",
		$schema: "https://json-schema.org/draft/2020-12/schema",
		$id: "https://example.com/draft2020-12/ref-and-id2/base.json",
		$ref: "#bigint",
		$defs: {
			bigint: {
				$comment:
					"canonical uri: /ref-and-id2/base.json#/$defs/bigint; another valid uri for this location: /ref-and-id2/base.json#bigint",
				$anchor: "bigint",
				maximum: 10,
			},
			smallint: {
				$comment:
					"canonical uri: https://example.com/ref-and-id2#/$defs/smallint; another valid uri for this location: https://example.com/ref-and-id2/#bigint",
				$id: "https://example.com/draft2020-12/ref-and-id2/",
				$anchor: "bigint",
				maximum: 2,
			},
		},
	};
	test("data is valid against first definition", () => {
		const instance = new Schema(schema);
		expect(instance.validate(5)).toBeTruthy();
	});
	test("data is invalid against first definition", () => {
		const instance = new Schema(schema);
		expect(instance.validate(50)).toBeFalsy();
	});
});
describe("simple URN base URI with $ref via the URN", () => {
	const schema = {
		$comment: "URIs do not have to have HTTP(s) schemes",
		$schema: "https://json-schema.org/draft/2020-12/schema",
		$id: "urn:uuid:deadbeef-1234-ffff-ffff-4321feebdaed",
		minimum: 30,
		properties: {
			foo: { $ref: "urn:uuid:deadbeef-1234-ffff-ffff-4321feebdaed" },
		},
	};
	test("valid under the URN IDed schema", () => {
		const instance = new Schema(schema);
		expect(instance.validate({ foo: 37 })).toBeTruthy();
	});
	test("invalid under the URN IDed schema", () => {
		const instance = new Schema(schema);
		expect(instance.validate({ foo: 12 })).toBeFalsy();
	});
});
describe("simple URN base URI with JSON pointer", () => {
	const schema = {
		$comment: "URIs do not have to have HTTP(s) schemes",
		$schema: "https://json-schema.org/draft/2020-12/schema",
		$id: "urn:uuid:deadbeef-1234-00ff-ff00-4321feebdaed",
		properties: { foo: { $ref: "#/$defs/bar" } },
		$defs: { bar: { type: "string" } },
	};
	test("a string is valid", () => {
		const instance = new Schema(schema);
		expect(instance.validate({ foo: "bar" })).toBeTruthy();
	});
	test("a non-string is invalid", () => {
		const instance = new Schema(schema);
		expect(instance.validate({ foo: 12 })).toBeFalsy();
	});
});
describe("URN base URI with NSS", () => {
	const schema = {
		$comment: "RFC 8141 \u00A72.2",
		$schema: "https://json-schema.org/draft/2020-12/schema",
		$id: "urn:example:1/406/47452/2",
		properties: { foo: { $ref: "#/$defs/bar" } },
		$defs: { bar: { type: "string" } },
	};
	test("a string is valid", () => {
		const instance = new Schema(schema);
		expect(instance.validate({ foo: "bar" })).toBeTruthy();
	});
	test("a non-string is invalid", () => {
		const instance = new Schema(schema);
		expect(instance.validate({ foo: 12 })).toBeFalsy();
	});
});
describe("URN base URI with r-component", () => {
	const schema = {
		$comment: "RFC 8141 \u00A72.3.1",
		$schema: "https://json-schema.org/draft/2020-12/schema",
		$id: "urn:example:foo-bar-baz-qux?+CCResolve:cc=uk",
		properties: { foo: { $ref: "#/$defs/bar" } },
		$defs: { bar: { type: "string" } },
	};
	test("a string is valid", () => {
		const instance = new Schema(schema);
		expect(instance.validate({ foo: "bar" })).toBeTruthy();
	});
	test("a non-string is invalid", () => {
		const instance = new Schema(schema);
		expect(instance.validate({ foo: 12 })).toBeFalsy();
	});
});
describe("URN base URI with q-component", () => {
	const schema = {
		$comment: "RFC 8141 \u00A72.3.2",
		$schema: "https://json-schema.org/draft/2020-12/schema",
		$id: "urn:example:weather?=op=map&lat=39.56&lon=-104.85&datetime=1969-07-21T02:56:15Z",
		properties: { foo: { $ref: "#/$defs/bar" } },
		$defs: { bar: { type: "string" } },
	};
	test("a string is valid", () => {
		const instance = new Schema(schema);
		expect(instance.validate({ foo: "bar" })).toBeTruthy();
	});
	test("a non-string is invalid", () => {
		const instance = new Schema(schema);
		expect(instance.validate({ foo: 12 })).toBeFalsy();
	});
});
describe("URN base URI with URN and JSON pointer ref", () => {
	const schema = {
		$schema: "https://json-schema.org/draft/2020-12/schema",
		$id: "urn:uuid:deadbeef-1234-0000-0000-4321feebdaed",
		properties: {
			foo: { $ref: "urn:uuid:deadbeef-1234-0000-0000-4321feebdaed#/$defs/bar" },
		},
		$defs: { bar: { type: "string" } },
	};
	test("a string is valid", () => {
		const instance = new Schema(schema);
		expect(instance.validate({ foo: "bar" })).toBeTruthy();
	});
	test("a non-string is invalid", () => {
		const instance = new Schema(schema);
		expect(instance.validate({ foo: 12 })).toBeFalsy();
	});
});
describe("URN base URI with URN and anchor ref", () => {
	const schema = {
		$schema: "https://json-schema.org/draft/2020-12/schema",
		$id: "urn:uuid:deadbeef-1234-ff00-00ff-4321feebdaed",
		properties: {
			foo: { $ref: "urn:uuid:deadbeef-1234-ff00-00ff-4321feebdaed#something" },
		},
		$defs: { bar: { $anchor: "something", type: "string" } },
	};
	test("a string is valid", () => {
		const instance = new Schema(schema);
		expect(instance.validate({ foo: "bar" })).toBeTruthy();
	});
	test("a non-string is invalid", () => {
		const instance = new Schema(schema);
		expect(instance.validate({ foo: 12 })).toBeFalsy();
	});
});
describe("URN ref with nested pointer ref", () => {
	const schema = {
		$schema: "https://json-schema.org/draft/2020-12/schema",
		$ref: "urn:uuid:deadbeef-4321-ffff-ffff-1234feebdaed",
		$defs: {
			foo: {
				$id: "urn:uuid:deadbeef-4321-ffff-ffff-1234feebdaed",
				$defs: { bar: { type: "string" } },
				$ref: "#/$defs/bar",
			},
		},
	};
	test("a string is valid", () => {
		const instance = new Schema(schema);
		expect(instance.validate("bar")).toBeTruthy();
	});
	test("a non-string is invalid", () => {
		const instance = new Schema(schema);
		expect(instance.validate(12)).toBeFalsy();
	});
});
describe("ref to if", () => {
	const schema = {
		$schema: "https://json-schema.org/draft/2020-12/schema",
		$ref: "http://example.com/ref/if",
		if: { $id: "http://example.com/ref/if", type: "integer" },
	};
	test("a non-integer is invalid due to the $ref", () => {
		const instance = new Schema(schema);
		expect(instance.validate("foo")).toBeFalsy();
	});
	test("an integer is valid", () => {
		const instance = new Schema(schema);
		expect(instance.validate(12)).toBeTruthy();
	});
});
describe("ref to then", () => {
	const schema = {
		$schema: "https://json-schema.org/draft/2020-12/schema",
		$ref: "http://example.com/ref/then",
		then: { $id: "http://example.com/ref/then", type: "integer" },
	};
	test("a non-integer is invalid due to the $ref", () => {
		const instance = new Schema(schema);
		expect(instance.validate("foo")).toBeFalsy();
	});
	test("an integer is valid", () => {
		const instance = new Schema(schema);
		expect(instance.validate(12)).toBeTruthy();
	});
});
describe("ref to else", () => {
	const schema = {
		$schema: "https://json-schema.org/draft/2020-12/schema",
		$ref: "http://example.com/ref/else",
		else: { $id: "http://example.com/ref/else", type: "integer" },
	};
	test("a non-integer is invalid due to the $ref", () => {
		const instance = new Schema(schema);
		expect(instance.validate("foo")).toBeFalsy();
	});
	test("an integer is valid", () => {
		const instance = new Schema(schema);
		expect(instance.validate(12)).toBeTruthy();
	});
});
describe("ref with absolute-path-reference", () => {
	const schema = {
		$schema: "https://json-schema.org/draft/2020-12/schema",
		$id: "http://example.com/ref/absref.json",
		$defs: {
			a: { $id: "http://example.com/ref/absref/foobar.json", type: "number" },
			b: { $id: "http://example.com/absref/foobar.json", type: "string" },
		},
		$ref: "/absref/foobar.json",
	};
	test("a string is valid", () => {
		const instance = new Schema(schema);
		expect(instance.validate("foo")).toBeTruthy();
	});
	test("an integer is invalid", () => {
		const instance = new Schema(schema);
		expect(instance.validate(12)).toBeFalsy();
	});
});
describe("$id with file URI still resolves pointers - *nix", () => {
	const schema = {
		$schema: "https://json-schema.org/draft/2020-12/schema",
		$id: "file:///folder/file.json",
		$defs: { foo: { type: "number" } },
		$ref: "#/$defs/foo",
	};
	test("number is valid", () => {
		const instance = new Schema(schema);
		expect(instance.validate(1)).toBeTruthy();
	});
	test("non-number is invalid", () => {
		const instance = new Schema(schema);
		expect(instance.validate("a")).toBeFalsy();
	});
});
describe("$id with file URI still resolves pointers - windows", () => {
	const schema = {
		$schema: "https://json-schema.org/draft/2020-12/schema",
		$id: "file:///c:/folder/file.json",
		$defs: { foo: { type: "number" } },
		$ref: "#/$defs/foo",
	};
	test("number is valid", () => {
		const instance = new Schema(schema);
		expect(instance.validate(1)).toBeTruthy();
	});
	test("non-number is invalid", () => {
		const instance = new Schema(schema);
		expect(instance.validate("a")).toBeFalsy();
	});
});
describe("empty tokens in $ref json-pointer", () => {
	const schema = {
		$schema: "https://json-schema.org/draft/2020-12/schema",
		$defs: { "": { $defs: { "": { type: "number" } } } },
		allOf: [{ $ref: "#/$defs//$defs/" }],
	};
	test("number is valid", () => {
		const instance = new Schema(schema);
		expect(instance.validate(1)).toBeTruthy();
	});
	test("non-number is invalid", () => {
		const instance = new Schema(schema);
		expect(instance.validate("a")).toBeFalsy();
	});
});
