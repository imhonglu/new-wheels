import { expect, expectTypeOf, test } from "vitest";
import { type ObjectEntry, entries } from "./entries.js";

test("should convert object to array of key-value pairs", () => {
  const A = entries({
    a: 1,
    b: "2",
    c: true,
  });

  expect(A).toEqual([
    ["a", 1],
    ["b", "2"],
    ["c", true],
  ]);

  expectTypeOf<typeof A>().toEqualTypeOf<
    (["a", 1] | ["b", "2"] | ["c", true])[]
  >();
});

test("should handle empty objects", () => {
  const emptyResult = entries({});
  expect(emptyResult).toEqual([]);
  expectTypeOf<typeof emptyResult>().toEqualTypeOf<never[]>();
});

test("should handle objects with null and undefined values", () => {
  const result = entries({
    a: null,
    b: undefined,
  });

  expect(result).toEqual([
    ["a", null],
    ["b", undefined],
  ]);

  expectTypeOf<typeof result>().toEqualTypeOf<
    (["a", null] | ["b", undefined])[]
  >();
});

test("should infer the correct type from an object", () => {
  expectTypeOf<
    ObjectEntry<{
      a: 1;
      b: "2";
      c: true;
    }>[]
  >().toEqualTypeOf<(["a", 1] | ["b", "2"] | ["c", true])[]>();
});
