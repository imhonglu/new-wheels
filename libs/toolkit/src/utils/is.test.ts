import { expectTypeOf, test } from "vitest";
import { is } from "./is.js";

test("is", () => {
	expectTypeOf(is.propertyKey).guards.toEqualTypeOf<PropertyKey>();
	expectTypeOf(is.nullishValue).guards.toEqualTypeOf<null | undefined>();
	expectTypeOf(is.nonNullableObject).guards.toEqualTypeOf<
		NonNullable<object>
	>();

	expectTypeOf(is.not.propertyKey<Symbol>).guards.toEqualTypeOf<Symbol>;
	expectTypeOf(
		is.not.propertyKey<Symbol>,
	).guards.not.toEqualTypeOf<PropertyKey>();
});
