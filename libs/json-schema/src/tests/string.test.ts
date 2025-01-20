import { expect, expectTypeOf, test } from "vitest";
import { Schema } from "../schema.js";

test("should successfully parse valid string input", () => {
  const StringSchema = new Schema({
    type: "string",
  });
  const result = StringSchema.parse("hello");

  expect(result).toEqual("hello");
  expectTypeOf(result).toBeString();
});

test("should handle empty string", () => {
  const StringSchema = new Schema({
    type: "string",
  });
  const result = StringSchema.parse("");

  expect(result).toEqual("");
  expectTypeOf(result).toBeString();
});

test("should throw error for non-string input", () => {
  const StringSchema = new Schema({
    type: "string",
  });
  expect(() => StringSchema.parse(123)).toThrow();
  expect(() => StringSchema.parse(null)).toThrow();
  expect(() => StringSchema.parse(undefined)).toThrow();
  expect(() => StringSchema.parse({})).toThrow();
  expect(() => StringSchema.parse([])).toThrow();
  expect(() => StringSchema.parse(true)).toThrow();
});
