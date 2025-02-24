import { expect, expectTypeOf, test } from "vitest";
import {
  OriginalValueSymbol,
  createSchemaClass,
} from "../create-schema-class.js";

test("should successfully parse valid boolean input", () => {
  class BooleanSchema extends createSchemaClass({
    type: "boolean",
  }) {}

  expect(BooleanSchema.parse(true)[OriginalValueSymbol]).toEqual(true);
  expect(BooleanSchema.parse(false)[OriginalValueSymbol]).toEqual(false);
  expect(JSON.stringify(BooleanSchema.parse(true))).toBe("true");
  expect(JSON.stringify(BooleanSchema.parse(false))).toBe("false");

  expectTypeOf(new BooleanSchema(true)).toEqualTypeOf<{
    [OriginalValueSymbol]: boolean;
  }>();
  expectTypeOf(new BooleanSchema(true)).toEqualTypeOf<BooleanSchema>();
  expectTypeOf<BooleanSchema>().toEqualTypeOf<{
    [OriginalValueSymbol]: boolean;
  }>();

  expect(() => BooleanSchema.parse(1)).toThrow();
});
