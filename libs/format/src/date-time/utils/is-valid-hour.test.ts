import { expect, test } from "vitest";
import { isValidHour } from "./is-valid-hour.js";

test("should return true for valid hours", () => {
  expect(isValidHour(0)).toBe(true);
  expect(isValidHour(12)).toBe(true);
  expect(isValidHour(23)).toBe(true);
});

test("should return false for invalid hours", () => {
  expect(isValidHour(-1)).toBe(false);
  expect(isValidHour(24)).toBe(false);
});
