import { describe, expect, test } from "vitest";
import { Authority } from "./authority.js";
import { URI } from "./uri.js";

describe("URI", () => {
	test("should parse a valid URI string", () => {
		expect(URI.parse("https://example.com/path?query#fragment")).toMatchObject({
			scheme: "https",
			authority: expect.any(Authority),
			path: expect.objectContaining({
				segments: ["path"],
			}),
			query: expect.objectContaining({
				pairs: new Map([["query", ""]]),
			}),
			fragment: "fragment",
		});

		expect(
			URI.parse("https://example.com/path?query#fragment").toString(),
		).toBe("https://example.com/path?query=#fragment");

		expect(
			JSON.stringify(URI.parse("https://example.com/path?query#fragment")),
		).toBe('"https://example.com/path?query=#fragment"');
	});

	test("should throw error without a scheme", () => {
		expect(() => URI.parse("://example.com/path?query#fragment")).toThrow();
	});
});
