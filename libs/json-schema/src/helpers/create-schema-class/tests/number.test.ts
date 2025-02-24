import { expect, expectTypeOf, test } from "vitest";
import {
  OriginalValueSymbol,
  createSchemaClass,
} from "../create-schema-class.js";

test("should successfully parse valid number input", () => {
  class NumberSchema extends createSchemaClass({
    type: "number",
  }) {}

  expect(new NumberSchema(123)[OriginalValueSymbol]).toEqual(123);
  expect(NumberSchema.parse(0)[OriginalValueSymbol]).toEqual(0);
  expect(NumberSchema.parse(-123)[OriginalValueSymbol]).toEqual(-123);
  expect(JSON.stringify(NumberSchema.parse(123))).toBe("123");
  expect(JSON.stringify(NumberSchema.parse(0))).toBe("0");
  expect(JSON.stringify(NumberSchema.parse(-123))).toBe("-123");

  expectTypeOf(new NumberSchema(123)).toEqualTypeOf<{
    [OriginalValueSymbol]: number;
  }>();
  expectTypeOf(new NumberSchema(123)).toEqualTypeOf<NumberSchema>();
  expectTypeOf<NumberSchema>().toEqualTypeOf<{
    [OriginalValueSymbol]: number;
  }>();

  expect(() => NumberSchema.parse("string")).toThrow();
});
