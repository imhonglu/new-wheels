import { expect, expectTypeOf, test } from "vitest";
import { createSchemaClass } from "../create-schema-class.js";

test("should successfully parse valid boolean input", () => {
  class BooleanSchema extends createSchemaClass({
    type: "boolean",
  }) {}

  expect(BooleanSchema.parse(true).data).toEqual(true);
  expect(BooleanSchema.parse(false).data).toEqual(false);

  expectTypeOf(new BooleanSchema(true)).toEqualTypeOf<{
    data: boolean;
  }>();
  expectTypeOf(new BooleanSchema(true)).toEqualTypeOf<BooleanSchema>();
  expectTypeOf<BooleanSchema>().toEqualTypeOf<{
    data: boolean;
  }>();

  expect(() => BooleanSchema.parse(1)).toThrow();
});
