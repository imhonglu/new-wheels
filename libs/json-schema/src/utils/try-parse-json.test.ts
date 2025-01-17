import { expect, test } from "vitest";
import { tryParseJson } from "./try-parse-json.js";

test("should return number as-is", () => {
  expect(tryParseJson(123)).toBe(123);
});

test("should return boolean as-is", () => {
  expect(tryParseJson(true)).toBe(true);
  expect(tryParseJson(false)).toBe(false);
});

test("should return null as-is", () => {
  expect(tryParseJson(null)).toBe(null);
});

test("should return undefined as-is", () => {
  expect(tryParseJson(undefined)).toBe(undefined);
});

test("should return object as-is", () => {
  const obj = { foo: "bar" };
  expect(tryParseJson(obj)).toBe(obj);
});

test("should return array as-is", () => {
  const arr = [1, 2, 3];
  expect(tryParseJson(arr)).toBe(arr);
});

test("should parse JSON object string", () => {
  expect(tryParseJson('{"foo":"bar"}')).toEqual({ foo: "bar" });
});

test("should parse JSON array string", () => {
  expect(tryParseJson("[1,2,3]")).toEqual([1, 2, 3]);
});
