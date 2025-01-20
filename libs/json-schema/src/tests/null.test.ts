import { expect, expectTypeOf, test } from "vitest";
import { Schema, type SchemaDefinition } from "../schema.js";

test("should successfully parse valid null input", () => {
  const NullSchema = new Schema({
    type: "null",
  });
  type NullType = SchemaDefinition.Instance<typeof NullSchema>;
  const result = NullSchema.parse(null);

  expect(result).toBeNull();
  expectTypeOf(result).toBeNull();

  expectTypeOf<NullType>().toEqualTypeOf<null>();

  expect(() => NullSchema.parse(undefined)).toThrow();
});
