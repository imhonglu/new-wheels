import { expect, test } from "vitest";
import { isValidMonth } from "./is-valid-month.js";

test("should return true for valid months", () => {
	expect(isValidMonth(1)).toBe(true);
	expect(isValidMonth(12)).toBe(true);
});

test("should return false for invalid months", () => {
	expect(isValidMonth(0)).toBe(false);
	expect(isValidMonth(13)).toBe(false);
});
