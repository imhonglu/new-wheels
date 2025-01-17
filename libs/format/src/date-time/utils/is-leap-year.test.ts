import { expect, test } from "vitest";
import { isLeapYear } from "./is-leap-year.js";

test("should return true for leap years", () => {
  expect(isLeapYear(2020)).toBe(true);
  expect(isLeapYear(2000)).toBe(true);
});

test("should return false for non-leap years", () => {
  expect(isLeapYear(2021)).toBe(false);
  expect(isLeapYear(2100)).toBe(false);
});
