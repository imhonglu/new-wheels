import { expect, test } from "vitest";
import { DateTime } from "./date-time.js";

test("should parse a valid DateTime string", () => {
	expect(DateTime.parse("2021-01-01T00:00:00.000Z")).toMatchObject({
		date: {
			year: 2021,
			month: 1,
			day: 1,
		},
		time: {
			hour: 0,
			minute: 0,
			second: 0,
			secfrac: ".000",
			offset: undefined,
		},
	});
	expect(DateTime.parse("2021-01-01T00:00:00.000Z").toString()).toBe(
		"2021-01-01T00:00:00.000Z",
	);
	expect(JSON.stringify(DateTime.parse("2021-01-01T00:00:00.000Z"))).toBe(
		'"2021-01-01T00:00:00.000Z"',
	);
});
