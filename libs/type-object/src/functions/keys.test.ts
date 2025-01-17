import { describe, expect, expectTypeOf, test } from "vitest";
import { type ObjectKey, keys } from "./keys.js";

describe("primitive types", () => {
  test("boolean should return empty array", () => {
    expect(keys(true)).toEqual([]);
    expect(keys(true)).toEqual(Object.keys(true));
    expectTypeOf<ObjectKey<boolean>>().toEqualTypeOf<never>();
  });

  test("symbol should return empty array", () => {
    expect(keys(Symbol())).toEqual([]);
    expect(keys(Symbol())).toEqual(Object.keys(Symbol()));
    expectTypeOf<ObjectKey<symbol>>().toEqualTypeOf<never>();
  });

  test("number should return empty array", () => {
    expect(keys(1)).toEqual([]);
    expect(keys(1)).toEqual(Object.keys(1));
    expectTypeOf<ObjectKey<number>>().toEqualTypeOf<never>();
  });

  test("string should return numeric keys", () => {
    expect(keys("123")).toEqual([0, 1, 2]);
    expect(keys("123")).not.toEqual(Object.keys("123"));
    expect(Object.keys("123")).toEqual(["0", "1", "2"]);
    expectTypeOf<ObjectKey<string>>().toEqualTypeOf<number & keyof string>();
  });
});

describe("collection types", () => {
  test("array should return numeric keys", () => {
    expect(keys([1, "2", true])).toEqual([0, 1, 2]);
    expect(keys([1, "2", true])).not.toEqual(Object.keys([1, "2", true]));
    expect(Object.keys([1, "2", true])).toEqual(["0", "1", "2"]);
    expectTypeOf<ObjectKey<Array<unknown>>>().toEqualTypeOf<
      number & keyof Array<unknown>
    >();
  });

  test("object should return string keys", () => {
    const object = { a: 1, b: "2", c: true };
    expect(keys(object)).toEqual(["a", "b", "c"]);
    expect(keys(object)).toEqual(Object.keys(object));
    expectTypeOf<ObjectKey<typeof object>>().toEqualTypeOf<
      keyof typeof object
    >();
  });

  test("Set should return empty array", () => {
    const set = new Set([1, "2", true]);
    expect(keys(set)).toEqual([]);
    expect(keys(set)).toEqual(Object.keys(set));
    expectTypeOf<ObjectKey<typeof set>>().toEqualTypeOf<never>();
  });

  test("Map should return empty array", () => {
    const map = new Map(Object.entries({ a: 1, b: "2", c: true }));
    expect(keys(map)).toEqual([]);
    expect(keys(map)).toEqual(Object.keys(map));
    expectTypeOf<ObjectKey<typeof map>>().toEqualTypeOf<never>();
  });
});

describe("class instances", () => {
  test("should return instance property keys", () => {
    class TestClass {
      a = 1;
      b = "2";
      c = true;
    }
    expect(keys(new TestClass())).toEqual(["a", "b", "c"]);
    expect(keys(new TestClass())).toEqual(Object.keys(new TestClass()));
    expectTypeOf<ObjectKey<typeof TestClass>>().toEqualTypeOf<
      keyof typeof TestClass
    >();
  });
});
