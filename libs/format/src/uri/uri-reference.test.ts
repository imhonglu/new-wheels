import { describe, expect, test } from "vitest";
import { IdnHostname } from "../hostname/idn-hostname.js";
import { IPv6Address } from "../ip-address/ip-v6-address.js";
import { InvalidURIError } from "./errors/invalid-uri-error.js";
import { URIReference } from "./uri-reference.js";

describe("URIReference", () => {
	test("should parse a valid URIReference string", () => {
		expect(
			URIReference.parse("https://example.com/path?query#fragment"),
		).toMatchObject({
			scheme: "https",
			authority: expect.objectContaining({
				host: expect.any(IdnHostname),
			}),
			path: expect.objectContaining({
				segments: ["path"],
			}),
			query: expect.objectContaining({
				pairs: new Map([["query", ""]]),
			}),
			fragment: "fragment",
		});

		expect(
			URIReference.parse("https://example.com/path?query#fragment").toString(),
		).toBe("https://example.com/path?query=#fragment");
		expect(
			JSON.stringify(
				URIReference.parse("https://example.com/path?query#fragment"),
			),
		).toBe(`"https://example.com/path?query=#fragment"`);
	});

	test("should parse relative references", () => {
		expect(URIReference.parse("//example.com/path")).toMatchObject({
			scheme: undefined,
			authority: expect.objectContaining({
				host: expect.any(IdnHostname),
			}),
			path: expect.objectContaining({
				segments: ["path"],
			}),
		});

		expect(URIReference.parse("/path?query")).toMatchObject({
			scheme: undefined,
			authority: undefined,
			path: expect.objectContaining({
				segments: ["path"],
			}),
			query: expect.objectContaining({
				pairs: new Map([["query", ""]]),
			}),
		});
	});

	test("should parse fragment-only references", () => {
		expect(URIReference.parse("#fragment")).toMatchObject({
			scheme: undefined,
			authority: undefined,
			path: undefined,
			query: undefined,
			fragment: "fragment",
		});
	});

	test("should handle file URIs", () => {
		expect(URIReference.parse("file:///path/to/file.txt")).toMatchObject({
			scheme: "file",
			authority: undefined,
			path: expect.objectContaining({
				segments: ["path", "to", "file.txt"],
			}),
		});
	});

	test("should parse a valid URL with anchor tag and parentheses", () => {
		expect(
			URIReference.parse("http://foo.com/blah_(wikipedia)_blah#cite-1"),
		).toMatchObject({
			authority: expect.objectContaining({
				host: expect.any(IdnHostname),
			}),
			path: expect.objectContaining({
				segments: ["blah_(wikipedia)_blah"],
			}),
			fragment: "cite-1",
		});
	});

	test("should parse a valid mailto URI", () => {
		expect(URIReference.parse("mailto:John.Doe@example.com")).toMatchObject({
			scheme: "mailto",
			path: expect.objectContaining({
				segments: ["John.Doe@example.com"],
			}),
		});
	});

	test("should parse a valid ldap URI", () => {
		expect(
			URIReference.parse("ldap://[2001:db8::7]/c=GB?objectClass?one"),
		).toMatchObject({
			scheme: "ldap",
			authority: expect.objectContaining({
				host: expect.any(IPv6Address),
			}),
			path: expect.objectContaining({
				segments: ["c=GB"],
			}),
			query: expect.objectContaining({
				pairs: new Map([["objectClass", "one"]]),
			}),
		});
	});

	test("should throw error for invalid URI references", () => {
		expect(() => URIReference.parse("123://example.com")).toThrow(
			InvalidURIError,
		);
		expect(() => URIReference.parse("bar,baz:foo")).toThrow(InvalidURIError);
	});
});
