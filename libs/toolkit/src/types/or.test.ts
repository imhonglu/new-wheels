import { expectTypeOf, test } from "vitest";
import type { Or } from "./or.js";

test("should return the type of the first argument if it is not undefined", () => {
	type A = {
		a?: string;
	};

	expectTypeOf<
		A["a"] extends undefined ? string : never
	>().toEqualTypeOf<never>();

	expectTypeOf<Or<A["a"], string>>().toEqualTypeOf<string>();
});
