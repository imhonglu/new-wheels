import { expect, expectTypeOf, test } from "vitest";
import {
  OriginalValueSymbol,
  createSchemaClass,
} from "../create-schema-class.js";

test("should successfully parse valid string input", () => {
  class StringSchema extends createSchemaClass({
    type: ["string"],
  }) {}

  expect(new StringSchema("hello")[OriginalValueSymbol]).toEqual("hello");
  expect(StringSchema.parse("hello")[OriginalValueSymbol]).toEqual("hello");
  expect(JSON.stringify(StringSchema.parse("hello"))).toBe('"hello"');

  expectTypeOf(new StringSchema("hello")).toEqualTypeOf<{
    [OriginalValueSymbol]: string;
  }>();
  expectTypeOf(new StringSchema("hello")).toEqualTypeOf<StringSchema>();
  expectTypeOf<StringSchema>().toEqualTypeOf<{
    [OriginalValueSymbol]: string;
  }>();

  expect(() => StringSchema.parse(123)).toThrow();
});

test("should handle empty string", () => {
  class StringSchema extends createSchemaClass({
    type: "string",
  }) {}

  expect(new StringSchema("")[OriginalValueSymbol]).toEqual("");
  expect(StringSchema.parse("")[OriginalValueSymbol]).toEqual("");

  expect(new StringSchema("")[OriginalValueSymbol]).toEqual("");
  expectTypeOf(new StringSchema("")).toEqualTypeOf<StringSchema>();
  expectTypeOf<StringSchema>().toEqualTypeOf<{
    [OriginalValueSymbol]: string;
  }>();

  expect(() => StringSchema.parse(123)).toThrow();
});
