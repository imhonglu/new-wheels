import { expect, expectTypeOf, test } from "vitest";
import { invert } from "./invert.js";

test("should invert object", () => {
	const A = invert({
		a: 1,
		b: 2,
		c: 3,
		d: "four",
	});

	expect(A).toEqual({
		1: "a",
		2: "b",
		3: "c",
		four: "d",
	});

	expectTypeOf<typeof A>().toEqualTypeOf<{
		1: "a";
		2: "b";
		3: "c";
		four: "d";
	}>();
});

test("should invert empty object", () => {
	const empty = invert({});
	expect(empty).toEqual({});
	expectTypeOf<typeof empty>().toEqualTypeOf<Record<never, never>>();
});

test("should invert object with duplicate values", () => {
	const duplicates = invert({
		a: 1,
		b: 1,
		c: 2,
	});

	expect(duplicates).toEqual({
		1: "b",
		2: "c",
	});

	expectTypeOf<typeof duplicates>().toEqualTypeOf<{
		1: "a" | "b";
		2: "c";
	}>();
});
