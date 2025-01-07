import { expect, expectTypeOf, test } from "vitest";
import { negateGuard } from "./negate-guard.js";

const isNumber = (value: unknown): value is number => typeof value === "number";
const isNotNumber = negateGuard(isNumber);

test("should correctly negate type guard results", () => {
	let value: number | undefined;

	expect(isNotNumber(value)).toBe(true);
	expect(isNotNumber(123)).toBe(false);
	expect(isNotNumber("string")).toBe(true);
	expect(isNotNumber(null)).toBe(true);
});

test("should properly narrow types", () => {
	let value: number | undefined;

	if (isNotNumber(value)) {
		expectTypeOf(value).toEqualTypeOf<undefined>();
	} else {
		expectTypeOf(value).toEqualTypeOf<number>();
	}
});
