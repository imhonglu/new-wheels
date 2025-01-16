import { expect, test } from "vitest";
import { parseURIComponents } from "./parse-uri-components.js";

test("should parse valid URI components", () => {
  const result = parseURIComponents(
    "https://user:pass@example.com:8080/path?query=value#fragment",
  );

  expect(result).toEqual({
    scheme: "https",
    authority: "user:pass@example.com:8080",
    path: "/path",
    query: "query=value",
    fragment: "fragment",
  });
});

test("should parse URI with minimal components", () => {
  const result = parseURIComponents("https://example.com");

  expect(result).toEqual({
    scheme: "https",
    authority: "example.com",
    path: "",
    query: undefined,
    fragment: undefined,
  });
});

test("should parse URI with path only", () => {
  const result = parseURIComponents("/path/to/resource");

  expect(result).toEqual({
    scheme: undefined,
    authority: undefined,
    path: "/path/to/resource",
    query: undefined,
    fragment: undefined,
  });
});

test("should parse URI with all components empty", () => {
  const result = parseURIComponents("");

  expect(result).toEqual({
    scheme: undefined,
    authority: undefined,
    path: "",
    query: undefined,
    fragment: undefined,
  });
});
