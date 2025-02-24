import { expect, expectTypeOf, test } from "vitest";
import {
  OriginalValueSymbol,
  createSchemaClass,
} from "../create-schema-class.js";

test("should correctly infer literal union types from const array", () => {
  class BloodType extends createSchemaClass({
    enum: ["a", "b", "o", "ab"],
  }) {}

  expect(new BloodType("a")[OriginalValueSymbol]).toEqual("a");
  expect(new BloodType("b")[OriginalValueSymbol]).toEqual("b");
  expect(new BloodType("o")[OriginalValueSymbol]).toEqual("o");
  expect(new BloodType("ab")[OriginalValueSymbol]).toEqual("ab");
  expect(JSON.stringify(new BloodType("a"))).toBe('"a"');
  expect(JSON.stringify(new BloodType("b"))).toBe('"b"');
  expect(JSON.stringify(new BloodType("o"))).toBe('"o"');
  expect(JSON.stringify(new BloodType("ab"))).toBe('"ab"');

  expectTypeOf(new BloodType("a")).toEqualTypeOf<{
    [OriginalValueSymbol]: "a" | "b" | "o" | "ab";
  }>();
  expectTypeOf(new BloodType("a")).toEqualTypeOf<BloodType>();
  expectTypeOf<BloodType>().toEqualTypeOf<{
    [OriginalValueSymbol]: "a" | "b" | "o" | "ab";
  }>();

  expect(() => BloodType.parse("c")).toThrow();
});
