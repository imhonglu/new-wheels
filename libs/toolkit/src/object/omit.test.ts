import { expect, expectTypeOf, test } from "vitest";
import { omit } from "./omit.js";

const source = {
	str: "hello",
	num: 123,
	bool: true,
	obj: { key: "value" },
};

test("should omit single property", () => {
	const result = omit(source, "str");

	expect(result).toEqual({ num: 123, bool: true, obj: { key: "value" } });

	expectTypeOf<typeof result>().toEqualTypeOf<{
		num: number;
		bool: boolean;
		obj: { key: string };
	}>();
});

test("should omit multiple properties", () => {
	const result = omit(source, "str", "bool");

	expect(result).toEqual({ num: 123, obj: { key: "value" } });

	expectTypeOf<typeof result>().toEqualTypeOf<{
		num: number;
		obj: { key: string };
	}>();
});

test("should return empty object when all properties are omitted", () => {
	const result = omit(source, "str", "num", "bool", "obj");

	expect(result).toEqual({});

	expectTypeOf<typeof result>().toEqualTypeOf<{}>();
});
