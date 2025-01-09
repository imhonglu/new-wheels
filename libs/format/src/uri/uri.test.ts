import { expect, test } from "vitest";
import { Authority } from "./authority.js";
import { Fragment } from "./fragment.js";
import { Path } from "./path.js";
import { Query } from "./query.js";
import { Scheme } from "./scheme.js";
import { URI } from "./uri.js";

test("should parse a valid URI string", () => {
	expect(URI.parse("https://example.com/path?query#fragment")).toMatchObject({
		scheme: expect.any(Scheme),
		authority: expect.any(Authority),
		path: expect.any(Path),
		query: expect.any(Query),
		fragment: expect.any(Fragment),
	});

	expect(URI.parse("https://example.com/path?query#fragment").toString()).toBe(
		"https://example.com/path?query#fragment",
	);

	expect(
		JSON.stringify(URI.parse("https://example.com/path?query#fragment")),
	).toBe('"https://example.com/path?query#fragment"');
});

test("should parse a valid IRI", () => {
	expect(
		URI.parse("http://한국.com/경로?쿼리#프래그먼트", { isIri: true }),
	).toMatchObject({
		scheme: expect.any(Scheme),
	});

	expect(
		URI.parse("http://한국.com/경로?쿼리#프래그먼트", {
			isIri: true,
		}).toString(),
	).toBe("http://한국.com/경로?쿼리#프래그먼트");
});

test("should throw error without a scheme", () => {
	expect(() => URI.parse("://example.com/path?query#fragment")).toThrow();
});
