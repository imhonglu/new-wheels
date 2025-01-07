import { expectTypeOf, test } from "vitest";
import type { Primitive } from "./primitive.js";

test("should resolve the type of the primitive", () => {
	// String tests
	expectTypeOf<Primitive.Resolve<string>>().toBeString();
	expectTypeOf<Primitive.Resolve<"string">>().toBeString();

	// Number tests
	expectTypeOf<Primitive.Resolve<number>>().toBeNumber();
	expectTypeOf<Primitive.Resolve<"number">>().toBeNumber();

	// Boolean tests
	expectTypeOf<Primitive.Resolve<boolean>>().toBeBoolean();
	expectTypeOf<Primitive.Resolve<"boolean">>().toBeBoolean();

	// Match tests
	expectTypeOf<Primitive.Match<string, "string", string>>().toBeString();
	expectTypeOf<
		Primitive.Match<string, string, "string">
	>().toEqualTypeOf<"string">();
	expectTypeOf<Primitive.Match<string, "number", number>>().toBeNever();
	expectTypeOf<Primitive.Match<number, "number", number>>().toBeNumber();
	expectTypeOf<Primitive.Match<boolean, "boolean", boolean>>().toBeBoolean();
});
