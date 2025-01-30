import { expect, expectTypeOf, test } from "vitest";
import { createSchemaClass } from "../create-schema-class.js";

test("should successfully parse valid null input", () => {
  class NullSchema extends createSchemaClass({
    type: "null",
  }) {}

  expect(new NullSchema(null).data).toBeNull();
  expect(NullSchema.parse(null).data).toBeNull();

  expectTypeOf(new NullSchema(null)).toEqualTypeOf<{
    data: null;
  }>();
  expectTypeOf(new NullSchema(null)).toEqualTypeOf<NullSchema>();
  expectTypeOf<NullSchema>().toEqualTypeOf<{
    data: null;
  }>();

  expect(() => NullSchema.parse(undefined)).toThrow();
});
