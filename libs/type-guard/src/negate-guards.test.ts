import { expect, it } from "vitest";
import { negateGuards } from "./negate-guards.js";

it("should create an object with negated guard functions", () => {
  const guards = {
    number: (value: unknown): value is number => typeof value === "number",
    string: (value: unknown): value is string => typeof value === "string",
  };

  const isNot = negateGuards(guards);

  expect(typeof isNot.number).toBe("function");
  expect(typeof isNot.string).toBe("function");
});
