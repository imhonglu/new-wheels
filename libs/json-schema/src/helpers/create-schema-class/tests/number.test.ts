import { expect, expectTypeOf, test } from "vitest";
import { createSchemaClass } from "../create-schema-class.js";

test("should successfully parse valid number input", () => {
  class NumberSchema extends createSchemaClass({
    type: "number",
  }) {}

  expect(new NumberSchema(123).data).toEqual(123);
  expect(NumberSchema.parse(0).data).toEqual(0);
  expect(NumberSchema.parse(-123).data).toEqual(-123);

  expectTypeOf(new NumberSchema(123)).toEqualTypeOf<{
    data: number;
  }>();
  expectTypeOf(new NumberSchema(123)).toEqualTypeOf<NumberSchema>();
  expectTypeOf<NumberSchema>().toEqualTypeOf<{
    data: number;
  }>();

  expect(() => NumberSchema.parse("string")).toThrow();
});
