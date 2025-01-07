import { expect, expectTypeOf, test } from "vitest";
import { type ObjectHasOwn, hasOwn } from "./has-own.js";

test("should correctly type guard and check object properties", () => {
	const source = { a: 1 } as unknown;

	expectTypeOf(hasOwn).guards.toBeObject();
	expectTypeOf<ObjectHasOwn<typeof source, "a">>().toEqualTypeOf<{
		a: unknown;
	}>();

	if (hasOwn(source, "a")) {
		expect(source.a).toBe(1);
		expectTypeOf<typeof source>().toEqualTypeOf<{
			a: unknown;
		}>();
	} else {
		// @ts-expect-error - non-existent property
		expect(source.a).toBe(undefined);
		expectTypeOf<typeof source>().toEqualTypeOf<unknown>();
	}

	// Additional test case for non-existent property
	expect(hasOwn(source, "b")).toBe(false);
});
