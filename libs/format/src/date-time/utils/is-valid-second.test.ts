import { describe, expect, test } from "vitest";
import { isValidSecond } from "./is-valid-second.js";

describe("isValidSecond", () => {
	test("should return true for valid seconds", () => {
		expect(isValidSecond(0)).toBe(true);
		expect(isValidSecond(30)).toBe(true);
		expect(isValidSecond(59)).toBe(true);
	});

	test("should return false for invalid seconds", () => {
		expect(isValidSecond(-1)).toBe(false);
		expect(isValidSecond(60)).toBe(false);
	});
});
