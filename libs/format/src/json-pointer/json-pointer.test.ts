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

const testObject = {
  foo: 123,
  bar: {
    baz: "hello",
    qux: {
      quux: true,
    },
  },
  arr: [
    { id: 1, value: "first" },
    { id: 2, value: "second" },
  ],
  "special~key": "tilde",
  "special/key": "slash",
  empty: null,
  zero: 0,
  false: false,
};

test("should escape JSON Pointer tokens", () => {
  expect(JsonPointer.escape("hello")).toBe("hello");
  expect(JsonPointer.escape("hello/world")).toBe("hello~1world");
  expect(JsonPointer.escape("hello~world")).toBe("hello~0world");
  expect(JsonPointer.escape("~/test")).toBe("~0~1test");
  expect(JsonPointer.escape("/~test")).toBe("~1~0test");
  expect(JsonPointer.escape("")).toBe("");
});

test("should unescape JSON Pointer tokens", () => {
  expect(JsonPointer.unescape("hello")).toBe("hello");
  expect(JsonPointer.unescape("hello~1world")).toBe("hello/world");
  expect(JsonPointer.unescape("hello~0world")).toBe("hello~world");
  expect(JsonPointer.unescape("~0~1test")).toBe("~/test");
  expect(JsonPointer.unescape("~1~0test")).toBe("/~test");
  expect(JsonPointer.unescape("")).toBe("");
});

test("should get values using JSON Pointer", () => {
  expect(JsonPointer.get(testObject)).toBe(testObject);
  expect(JsonPointer.get(testObject, "")).toBe(testObject);

  expect(JsonPointer.get(testObject, "/foo")).toBe(123);
  expect(JsonPointer.get(testObject, "/false")).toBe(false);
  expect(JsonPointer.get(testObject, "/zero")).toBe(0);
  expect(JsonPointer.get(testObject, "/empty")).toBe(null);

  expect(JsonPointer.get(testObject, "/bar/baz")).toBe("hello");
  expect(JsonPointer.get(testObject, "/bar/qux/quux")).toBe(true);

  expect(JsonPointer.get(testObject, "/arr/0/id")).toBe(1);
  expect(JsonPointer.get(testObject, "/arr/1/value")).toBe("second");
  expect(JsonPointer.get(testObject, "/arr")).toEqual([
    { id: 1, value: "first" },
    { id: 2, value: "second" },
  ]);

  expect(JsonPointer.get(testObject, "/special~0key")).toBe("tilde");
  expect(JsonPointer.get(testObject, "/special~1key")).toBe("slash");

  // @ts-expect-error
  expect(JsonPointer.get(testObject, "/nonexistent")).toBeUndefined();
  // @ts-expect-error
  expect(JsonPointer.get(testObject, "/bar/nonexistent")).toBeUndefined();
  expect(JsonPointer.get(testObject, "/arr/999")).toBeUndefined();
});

test("should handle edge cases in get operation", () => {
  expect(JsonPointer.get({ a: null }, "/a")).toBe(null);
  expect(JsonPointer.get({ a: undefined }, "/a")).toBeUndefined();

  // @ts-expect-error
  expect(JsonPointer.get({}, "/any")).toBeUndefined();
  expect(JsonPointer.get([], "/0")).toBeUndefined();

  expect(JsonPointer.get({ zero: 0 }, "/zero")).toBe(0);

  expect(JsonPointer.get({ "": "empty" }, "/")).toBe("empty");
});
