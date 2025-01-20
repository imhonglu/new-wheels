import { expect, expectTypeOf, test } from "vitest";
import { Schema, type SchemaDefinition } from "../schema.js";

test("should successfully parse valid number input", () => {
  const NumberSchema = new Schema({
    type: "number",
  });
  type NumberType = SchemaDefinition.Instance<typeof NumberSchema>;
  const result = NumberSchema.parse(123);

  expect(result).toEqual(123);
  expect(NumberSchema.parse(0)).toEqual(0);
  expect(NumberSchema.parse(-123)).toEqual(-123);

  expectTypeOf(result).toBeNumber();
  expectTypeOf<NumberType>().toEqualTypeOf<number>();

  expect(() => NumberSchema.parse("string")).toThrow();
});
