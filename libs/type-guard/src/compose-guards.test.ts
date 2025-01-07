import { expect, expectTypeOf, test } from "vitest";
import { composeGuards } from "./compose-guards.js";

const guards = {
	number: (value: unknown): value is number => typeof value === "number",
	array: (value: unknown): value is unknown[] => Array.isArray(value),
};

test("should create correct object structure", () => {
	const is = composeGuards(guards);

	expect(Object.keys(guards)).toEqual(expect.arrayContaining(Object.keys(is)));
	expect(is.not.number).toBeDefined();
	expect(is.not.array).toBeDefined();

	let value: string | number | undefined;

	if (is.number(value)) {
		expectTypeOf(value).toBeNumber();
	}

	if (is.not.number(value)) {
		expectTypeOf(value).toEqualTypeOf<string | undefined>();
	}
});

test("should handle non-existent properties", () => {
	const is = composeGuards(guards);

	// @ts-expect-error - non-existent property
	expectTypeOf(is.nonexistent).toBeUndefined();
	// @ts-expect-error - non-existent property
	expect(is.nonexistent).toBeUndefined();
	// @ts-expect-error - non-existent property
	expectTypeOf(is.not.nonexistent).toBeUndefined();
	// @ts-expect-error - non-existent property
	expect(is.not.nonexistent).toBeUndefined();
});
