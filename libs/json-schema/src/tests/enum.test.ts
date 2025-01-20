import { expect, expectTypeOf, test } from "vitest";
import { Schema, type SchemaDefinition } from "../schema.js";

test("should correctly infer literal union types from const array", () => {
  const BloodType = new Schema({
    enum: ["a", "b", "o", "ab"] as const,
  });

  type BloodType = SchemaDefinition.Instance<typeof BloodType>;

  const result = BloodType.parse("a");

  expect(result).toEqual("a");
  expect(BloodType.parse("b")).toEqual("b");
  expect(BloodType.parse("o")).toEqual("o");
  expect(BloodType.parse("ab")).toEqual("ab");

  expectTypeOf(result).toEqualTypeOf<"a" | "b" | "o" | "ab">();
  expectTypeOf<BloodType>().toEqualTypeOf<"a" | "b" | "o" | "ab">();

  expect(() => BloodType.parse("c")).toThrow();
});
