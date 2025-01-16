import { expect, test } from "vitest";
import { getDaysInMonth } from "./get-days-in-month.js";

test("should return 31 days for January 2021", () => {
  expect(
    getDaysInMonth({
      year: 2021,
      month: 1,
    }),
  ).toBe(31);
});

test("should return 28 days for February 2021 (non-leap year)", () => {
  expect(
    getDaysInMonth({
      year: 2021,
      month: 2,
    }),
  ).toBe(28);
});

test("should return 29 days for February 2020 (leap year)", () => {
  expect(
    getDaysInMonth({
      year: 2020,
      month: 2,
    }),
  ).toBe(29);
});

test("should return 0 days for an invalid month (month 13)", () => {
  expect(
    getDaysInMonth({
      year: 2021,
      month: 13,
    }),
  ).toBe(0);
});
