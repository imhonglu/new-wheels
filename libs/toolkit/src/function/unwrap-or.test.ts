import { expect, expectTypeOf, test } from "vitest";
import { unwrapOr } from "./unwrap-or.js";

test("should return default value when input is nullable", () => {
  expect(unwrapOr(null, "default")).toBe("default");
  expect(unwrapOr(undefined, "default")).toBe("default");
});

test("should return actual value when input exists", () => {
  expect(unwrapOr("actual", "default")).toBe("actual");
  expect(unwrapOr(0, 1)).toBe(0);
  expect(unwrapOr(false, true)).toBe(false);
});

test("should handle object inputs", () => {
  const defaultObj = { foo: "bar" };
  const actualObj = { baz: "qux" };

  expect(unwrapOr(actualObj, defaultObj)).toBe(actualObj);
});

test("should handle array inputs", () => {
  const defaultArr = [1, 2, 3];
  const actualArr = [4, 5, 6];

  expect(unwrapOr(actualArr, defaultArr)).toBe(actualArr);
});

test("should properly infer types", () => {
  const result1 = unwrapOr(null as string | null, "default");
  expectTypeOf(result1).toEqualTypeOf<string>();

  const result2 = unwrapOr(undefined as number | undefined, 42);
  expectTypeOf(result2).toEqualTypeOf<number>();

  const result3 = unwrapOr({ foo: "bar" } as { foo: string } | null, {
    baz: "qux",
  });
  expectTypeOf(result3).toEqualTypeOf<{ foo: string } | { baz: string }>();
});
