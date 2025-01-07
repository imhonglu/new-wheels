import { describe, expect, test } from "vitest";
import { isValidDay } from "./is-valid-day.js";

describe("isValidDay", () => {
	test("should validate 31-day months", () => {
		expect(isValidDay(31, { year: 2021, month: 1 })).toBe(true);
		expect(isValidDay(31, { year: 2021, month: 3 })).toBe(true);
		expect(isValidDay(32, { year: 2021, month: 1 })).toBe(false);
	});

	test("should validate February in leap years", () => {
		expect(isValidDay(29, { year: 2020, month: 2 })).toBe(true);
		expect(isValidDay(30, { year: 2020, month: 2 })).toBe(false);
	});

	test("should validate February in non-leap years", () => {
		expect(isValidDay(28, { year: 2021, month: 2 })).toBe(true);
		expect(isValidDay(29, { year: 2021, month: 2 })).toBe(false);
	});
});
