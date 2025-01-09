import { expectTypeOf, test } from "vitest";
import type { ArrayElement } from "./array-element.js";

test("should be able to infer the element type of an array", () => {
	expectTypeOf<ArrayElement<number[]>>().toBeNumber();
	expectTypeOf<ArrayElement<string[]>>().toBeString();

	expectTypeOf<ArrayElement<[string, number, boolean]>>().toEqualTypeOf<
		string | number | boolean
	>();

	expectTypeOf<ArrayElement<[]>>().toBeNever();

	expectTypeOf<ArrayElement<(string | number)[]>>().toEqualTypeOf<
		string | number
	>();

	type User = { name: string; age: number };
	expectTypeOf<ArrayElement<User[]>>().toEqualTypeOf<{
		name: string;
		age: number;
	}>();
});
