import { expect, expectTypeOf, test } from "vitest";
import {
  OriginalValueSymbol,
  createSchemaClass,
} from "../create-schema-class.js";

test("should successfully parse valid null input", () => {
  class NullSchema extends createSchemaClass({
    type: "null",
  }) {}

  expect(new NullSchema(null)[OriginalValueSymbol]).toBeNull();
  expect(NullSchema.parse(null)[OriginalValueSymbol]).toBeNull();
  expect(JSON.stringify(NullSchema.parse(null))).toBe("null");

  expectTypeOf(new NullSchema(null)).toEqualTypeOf<{
    [OriginalValueSymbol]: null;
  }>();
  expectTypeOf(new NullSchema(null)).toEqualTypeOf<NullSchema>();
  expectTypeOf<NullSchema>().toEqualTypeOf<{
    [OriginalValueSymbol]: null;
  }>();

  expect(() => NullSchema.parse(undefined)).toThrow();
});
