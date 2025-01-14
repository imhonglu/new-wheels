import { expect, test } from "vitest";
import { padZero } from "./pad-zero.js";

test("should pad a single digit string with a leading zero", () => {
	expect(padZero("1")).toBe("01");
});

test("should pad a single digit number with a leading zero", () => {
	expect(padZero(2)).toBe("02");
});

test("should not pad a two digit number", () => {
	expect(padZero(11)).toBe("11");
});

test("should not pad a two digit string", () => {
	expect(padZero("11")).toBe("11");
});
