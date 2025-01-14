import { expect, test } from "vitest";
import { getSeconds } from "./get-seconds.js";

test("should return 59 seconds for a regular date-time", () => {
	expect(
		getSeconds({
			year: 2021,
			month: 1,
			day: 1,
			hour: 1,
			minute: 1,
		}),
	).toBe(59);
});

test("should return 60 seconds for a leap second date-time", () => {
	expect(
		getSeconds({
			year: 2016,
			month: 12,
			day: 31,
			hour: 23,
			minute: 59,
		}),
	).toBe(60);
});

test("should return 60 seconds for a leap second date-time with offset", () => {
	expect(
		getSeconds({
			year: 1998,
			month: 12,
			day: 31,
			hour: 15,
			minute: 59,
			offset: {
				sign: "-",
				hour: 8,
				minute: 0,
			},
		}),
	).toBe(60);
});
