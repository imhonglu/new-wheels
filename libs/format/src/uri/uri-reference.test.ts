import { expect, test } from "vitest";
import { IdnHostname } from "../hostname/idn-hostname.js";
import { IPv6Address } from "../ip-address/ipv6-address.js";
import { Authority } from "./authority.js";
import { Fragment } from "./fragment.js";
import { Path } from "./path.js";
import { Query } from "./query.js";
import { Scheme } from "./scheme.js";
import { URIReference } from "./uri-reference.js";

test("should parse a valid URIReference string", () => {
  expect(
    URIReference.parse("https://example.com/path?query#fragment"),
  ).toMatchObject({
    scheme: expect.any(Scheme),
    authority: expect.any(Authority),
    path: expect.any(Path),
    query: expect.any(Query),
    fragment: expect.any(Fragment),
  });

  expect(
    URIReference.parse("https://example.com/path?query#fragment").toString(),
  ).toBe("https://example.com/path?query#fragment");
  expect(
    JSON.stringify(
      URIReference.parse("https://example.com/path?query#fragment"),
    ),
  ).toBe(`"https://example.com/path?query#fragment"`);
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
    fragment: expect.objectContaining({
      text: "fragment",
    }),
  });
});

test("should handle file URIs", () => {
  expect(URIReference.parse("file:///path/to/file.txt")).toMatchObject({
    scheme: expect.objectContaining({
      text: "file",
    }),
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
    fragment: expect.objectContaining({
      text: "cite-1",
    }),
  });
});

test("should parse a valid mailto URI", () => {
  expect(URIReference.parse("mailto:John.Doe@example.com")).toMatchObject({
    scheme: expect.objectContaining({
      text: "mailto",
    }),
    path: expect.objectContaining({
      segments: ["John.Doe@example.com"],
    }),
  });
});

test("should parse a valid ldap URI", () => {
  expect(
    URIReference.parse("ldap://[2001:db8::7]/c=GB?objectClass?one"),
  ).toMatchObject({
    scheme: expect.objectContaining({
      text: "ldap",
    }),
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

test("should parse a valid IRI", () => {
  expect(
    URIReference.parse("http://유저@한글.com:8080/경로?쿼리#프래그먼트", {
      isIri: true,
    }),
  ).toMatchObject({
    scheme: expect.any(Scheme),
    authority: expect.any(Authority),
    path: expect.any(Path),
    query: expect.any(Query),
    fragment: expect.any(Fragment),
  });

  expect(
    URIReference.parse("http://유저@한글.com:8080/경로?쿼리#프래그먼트", {
      isIri: true,
    }).toString(),
  ).toBe("http://유저@한글.com:8080/경로?쿼리#프래그먼트");
});

test("should parse a valid URI with IDN host", () => {
  expect(
    URIReference.parse("http://한국.com/path?query#fragment"),
  ).toMatchObject({
    scheme: expect.any(Scheme),
  });

  expect(
    URIReference.parse("http://한국.com/path?query#fragment").toString(),
  ).toBe("http://xn--3e0b707e.com/path?query#fragment");
});

test("should throw error for invalid URI references", () => {
  expect(() => URIReference.parse("123://example.com")).toThrow();
  expect(() => URIReference.parse("bar,baz:foo")).toThrow();
  expect(() =>
    URIReference.parse("http://유저@한글.com:8080/경로?쿼리#프래그먼트"),
  ).toThrow();
});
