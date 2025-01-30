import { expect, expectTypeOf, test } from "vitest";
import { createSchemaClass } from "../create-schema-class.js";

test("should correctly infer literal union types from const array", () => {
  class BloodType extends createSchemaClass({
    enum: ["a", "b", "o", "ab"],
  }) {}

  expect(new BloodType("a").data).toEqual("a");
  expect(new BloodType("b").data).toEqual("b");
  expect(new BloodType("o").data).toEqual("o");
  expect(new BloodType("ab").data).toEqual("ab");
  expect(JSON.stringify(new BloodType("a"))).toBe('"a"');
  expect(JSON.stringify(new BloodType("b"))).toBe('"b"');
  expect(JSON.stringify(new BloodType("o"))).toBe('"o"');
  expect(JSON.stringify(new BloodType("ab"))).toBe('"ab"');

  expectTypeOf(new BloodType("a")).toEqualTypeOf<{
    data: "a" | "b" | "o" | "ab";
  }>();
  expectTypeOf(new BloodType("a")).toEqualTypeOf<BloodType>();
  expectTypeOf<BloodType>().toEqualTypeOf<{
    data: "a" | "b" | "o" | "ab";
  }>();

  expect(() => BloodType.parse("c")).toThrow();
});
