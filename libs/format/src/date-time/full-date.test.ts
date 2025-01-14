import { expect, test } from "vitest";
import { InvalidFullDateError } from "./errors/invalid-full-date-error.js";
import { FullDate } from "./full-date.js";

test("should parse a valid FullDate string", () => {
	expect(FullDate.parse("2021-01-01")).toMatchObject({
		year: 2021,
		month: 1,
		day: 1,
	});
	expect(FullDate.parse("2021-01-01").toString()).toEqual("2021-01-01");
	expect(JSON.stringify(FullDate.parse("2021-01-01"))).toEqual('"2021-01-01"');
});

test("should throw an error when parsing an invalid FullDate string", () => {
	expect(() => FullDate.parse("2021-01-32")).toThrow(InvalidFullDateError);
	expect(() => FullDate.parse("2021-13-01")).toThrow(InvalidFullDateError);
});
