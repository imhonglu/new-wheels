import { expect, test } from "vitest";
import { InvalidURITemplateError } from "./errors/invalid-uri-template-error.js";
import { URITemplate } from "./uri-template.js";

test("should parse a valid URITemplate string", () => {
	expect(URITemplate.parse("www{.dom*}")).toMatchObject({
		text: "www{.dom*}",
		expressions: new Set([
			{
				operator: ".",
				index: [3, 10],
				variables: new Map([
					[
						"dom",
						{
							name: "dom",
							modifier: {
								type: "explode",
							},
						},
					],
				]),
			},
		]),
	});

	expect(URITemplate.parse("www{.dom*}").toString()).toBe("www{.dom*}");
	expect(JSON.stringify(URITemplate.parse("www{.dom*}"))).toBe('"www{.dom*}"');
});

test("should parse template without any expressions", () => {
	expect(URITemplate.parse("www")).toMatchObject({
		text: "www",
		expressions: new Set(),
	});
});

test("should parse template with query operator and multiple variables", () => {
	expect(URITemplate.parse("/search{?q,page}")).toMatchObject({
		text: "/search{?q,page}",
		expressions: new Set([
			{
				operator: "?",
				index: [7, 16],
				variables: new Map([
					["q", { name: "q", modifier: undefined }],
					["page", { name: "page", modifier: undefined }],
				]),
			},
		]),
	});
});

test("should expand template with dot operator and string value", () => {
	expect(URITemplate.expand("www{.dom*}", { dom: "example.com" })).toBe(
		"www.example.com",
	);

	expect(URITemplate.expand("www{.dom*}", { dom: ["example", "com"] })).toBe(
		"www.example.com",
	);

	expect(URITemplate.expand("find{?year*}", { year: [1965, 2000, 2012] })).toBe(
		"find?year=1965&year=2000&year=2012",
	);
});

test("should expand template with dot operator and array value", () => {
	expect(URITemplate.expand("www{.dom*}", { dom: ["example", "com"] })).toBe(
		"www.example.com",
	);
});

test("should expand template with query operator and array values", () => {
	expect(URITemplate.expand("find{?year*}", { year: [1965, 2000, 2012] })).toBe(
		"find?year=1965&year=2000&year=2012",
	);
});

test("should expand simple templates", () => {
	const template = URITemplate.parse("/users/{id}");
	expect(URITemplate.expand(template, { id: "123" })).toBe("/users/123");
});

test("should expand query templates", () => {
	const template = URITemplate.parse("/search{?q,page}");
	expect(URITemplate.expand(template, { q: "test", page: "1" })).toBe(
		"/search?q=test&page=1",
	);
});

test("should handle missing values", () => {
	const template = URITemplate.parse("/users/{id}/posts/{postId}");
	expect(URITemplate.expand(template, { id: "123" })).toBe("/users/123/posts/");
});

test("should throw error for invalid templates", () => {
	expect(() =>
		URITemplate.parse("http://example.com/dictionary/{term:1}/{term"),
	).toThrow(InvalidURITemplateError);
});
