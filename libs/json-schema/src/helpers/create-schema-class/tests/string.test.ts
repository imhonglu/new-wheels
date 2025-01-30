import { expect, expectTypeOf, test } from "vitest";
import { createSchemaClass } from "../create-schema-class.js";

test("should successfully parse valid string input", () => {
  class StringSchema extends createSchemaClass({
    type: ["string"],
  }) {}

  expect(new StringSchema("hello").data).toEqual("hello");
  expect(StringSchema.parse("hello").data).toEqual("hello");

  expectTypeOf(new StringSchema("hello")).toEqualTypeOf<{
    data: string;
  }>();
  expectTypeOf(new StringSchema("hello")).toEqualTypeOf<StringSchema>();
  expectTypeOf<StringSchema>().toEqualTypeOf<{
    data: string;
  }>();

  expect(() => StringSchema.parse(123)).toThrow();
});

test("should handle empty string", () => {
  class StringSchema extends createSchemaClass({
    type: "string",
  }) {}

  expect(new StringSchema("").data).toEqual("");
  expect(StringSchema.parse("").data).toEqual("");

  expect(new StringSchema("").data).toEqual("");
  expectTypeOf(new StringSchema("")).toEqualTypeOf<StringSchema>();
  expectTypeOf<StringSchema>().toEqualTypeOf<{
    data: string;
  }>();

  expect(() => StringSchema.parse(123)).toThrow();
});
