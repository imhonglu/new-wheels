import { expect, expectTypeOf, test } from "vitest";
import { type ObjectFromEntries, fromEntries } from "./from-entries.js";

test("should convert array of key-value pairs to object", () => {
	const A = fromEntries([
		["a", 1],
		["b", "2"],
		["c", true],
	]);

	expect(A).toEqual({
		a: 1,
		b: "2",
		c: true,
	});

	expectTypeOf(A).toEqualTypeOf<{
		a: 1;
		b: "2";
		c: true;
	}>();
});

test("should infer the correct type from an array of key-value pairs", () => {
	expectTypeOf<
		ObjectFromEntries<[["a", 1], ["b", "2"], ["c", true]]>
	>().toEqualTypeOf<{
		a: 1;
		b: "2";
		c: true;
	}>();
});

test("should handle empty array", () => {
	const empty = fromEntries([]);
	expect(empty).toEqual({});
	expectTypeOf(empty).toEqualTypeOf<{}>();
});

test("should handle array with single entry", () => {
	const single = fromEntries([["key", "value"]]);
	expect(single).toEqual({ key: "value" });
	expectTypeOf(single).toEqualTypeOf<{ key: "value" }>();
});

test("should handle array with mixed value types", () => {
	const mixed = fromEntries([
		["num", 42],
		["str", "hello"],
		["bool", false],
		["null", null],
		["undef", undefined],
	]);

	expect(mixed).toEqual({
		num: 42,
		str: "hello",
		bool: false,
		null: null,
		undef: undefined,
	});

	expectTypeOf(mixed).toEqualTypeOf<{
		num: 42;
		str: "hello";
		bool: false;
		null: null;
		undef: undefined;
	}>();
});
