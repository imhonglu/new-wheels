import { expect, test } from "vitest";
import { pick } from "./pick.js";

test("pick", () => {
  const source = {
    a: 1,
    b: 2,
    c: 3,
    d: 4,
  };

  expect(pick(source, "a")).toEqual({ a: 1 });
  expect(pick(source, "a", "b")).toEqual({ a: 1, b: 2 });
  expect(pick(source, "a", "b", "c")).toEqual({ a: 1, b: 2, c: 3 });
  expect(pick(source, "a", "b", "c", "d")).toEqual({
    a: 1,
    b: 2,
    c: 3,
    d: 4,
  });
  expect(pick(source)).toEqual({});
});
