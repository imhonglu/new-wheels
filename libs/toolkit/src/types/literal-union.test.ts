import { assertType, test } from "vitest";
import type { LiteralUnion } from "./literal-union.js";

test("should be able to use literal union", () => {
  type A = LiteralUnion<"a" | "b">;

  const fn = (a: A) => a;

  assertType(fn("a"));
  assertType(fn("b"));
  assertType(fn("c"));
});
