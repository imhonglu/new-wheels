import { expect, expectTypeOf, test } from "vitest";
import { Schema, type SchemaDefinition } from "../schema.js";

test("should successfully parse valid boolean input", () => {
  const BooleanSchema = new Schema({
    type: "boolean",
  });
  type BooleanType = SchemaDefinition.Instance<typeof BooleanSchema>;
  const result = BooleanSchema.parse(true);

  expect(result).toEqual(true);
  expect(BooleanSchema.parse(false)).toEqual(false);

  expectTypeOf(result).toBeBoolean();
  expectTypeOf<BooleanType>().toEqualTypeOf<boolean>();

  expect(() => BooleanSchema.parse(1)).toThrow();
});
