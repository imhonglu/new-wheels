import { expect, test } from "vitest";
import { InvalidJsonPointerError } from "./errors/invalid-json-pointer-error.js";
import { JsonPointer } from "./json-pointer.js";

test("should parse a valid JSON Pointer string", () => {
  expect(JsonPointer.parse("/foo/bar")).toMatchObject({
    segments: ["foo", "bar"],
  });

  expect(JsonPointer.parse("/foo/bar").toString()).toBe("/foo/bar");
  expect(JSON.stringify(JsonPointer.parse("/foo/bar"))).toBe('"/foo/bar"');
});

test("should parse special characters correctly", () => {
  expect(JsonPointer.parse("/foo/~1bar")).toMatchObject({
    segments: ["foo", "/bar"],
  });
  expect(JsonPointer.parse("/foo/bar~1baz")).toMatchObject({
    segments: ["foo", "bar/baz"],
  });
});

test("should parse empty references", () => {
  expect(JsonPointer.parse("/")).toMatchObject({
    segments: [],
  });
  expect(JsonPointer.parse("/foo//bar")).toMatchObject({
    segments: ["foo", "", "bar"],
  });
});

test("should throw InvalidJsonPointerError for invalid input", () => {
  expect(() => JsonPointer.parse("foo/bar")).toThrow(InvalidJsonPointerError);
  expect(() => JsonPointer.parse("/foo/bar~")).toThrow(InvalidJsonPointerError);
  expect(() => JsonPointer.parse("/foo/bar~2")).toThrow(
    InvalidJsonPointerError,
  );
  expect(() => JsonPointer.parse("/~0/~")).toThrow(InvalidJsonPointerError);
  expect(() => JsonPointer.parse("#/foo/bar")).toThrow(InvalidJsonPointerError);
});
