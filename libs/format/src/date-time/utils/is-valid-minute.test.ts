import { expect, test } from "vitest";
import { isValidMinute } from "./is-valid-minute.js";

test("should return true for valid minutes", () => {
  expect(isValidMinute(0)).toBe(true);
  expect(isValidMinute(30)).toBe(true);
  expect(isValidMinute(59)).toBe(true);
});

test("should return false for invalid minutes", () => {
  expect(isValidMinute(-1)).toBe(false);
  expect(isValidMinute(60)).toBe(false);
});
