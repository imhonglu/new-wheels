import type { SafeExecutorResult } from "@imhonglu/toolkit";
import { expect, expectTypeOf, test } from "vitest";
import { ValidationFailedError } from "./errors/validation-failed-error.js";
import { Schema, type SchemaDefinition } from "./schema.js";

test("should parse simple object schema and validate types", () => {
	const Address = new Schema({
		type: "object",
		properties: {
			street: { type: "string" },
			city: { type: "string" },
			zip: { type: "string" },
		},
		required: ["street"] as const,
	});
	type AddressType = SchemaDefinition.Instance<typeof Address>;

	expectTypeOf<AddressType>().toEqualTypeOf<
		{
			street: string;
		} & {
			city?: string;
			zip?: string;
		}
	>();

	expectTypeOf<AddressType["street"]>().toEqualTypeOf<string>();
	expectTypeOf<AddressType["city"]>().toEqualTypeOf<string | undefined>();
	expectTypeOf<AddressType["zip"]>().toEqualTypeOf<string | undefined>();

	const address = Address.parse(
		'{"street": "123 Main St", "city": "Anytown", "zip": "12345"}',
	);

	expect(address).toEqual({
		street: "123 Main St",
		city: "Anytown",
		zip: "12345",
	});

	expectTypeOf(address).toEqualTypeOf<AddressType>();

	expect(Address.parse('{"street": "123 Main St"}')).toEqual({
		street: "123 Main St",
	});

	expect(() => Address.parse('{"city": "Anytown"}')).toThrow();
});

test("should parse nested object schema with referenced schemas", () => {
	const LastName = new Schema({ type: "string" });
	const FirstName = new Schema({ type: "string" });
	const Address = new Schema({
		type: "object",
		properties: {
			street: { type: "string" },
			city: { type: "string" },
			zip: { type: "string" },
		},
		required: ["street"] as const,
	});
	const Person = new Schema({
		type: "object",
		properties: {
			lastName: LastName,
			firstName: FirstName,
			age: { type: "number" },
			address: Address,
		},
		required: ["lastName", "firstName"] as const,
	});

	type PersonType = SchemaDefinition.Instance<typeof Person>;

	expectTypeOf<PersonType>().toEqualTypeOf<
		{
			lastName: string;
			firstName: string;
		} & {
			address?: SchemaDefinition.Instance<typeof Address>;
			age?: number;
		}
	>();

	const person = Person.parse(
		'{"lastName": "Doe", "firstName": "John", "age": 30, "address": {"street": "123 Main St", "city": "Anytown", "zip": "12345"}}',
	);

	expect(person).toEqual({
		lastName: "Doe",
		firstName: "John",
		age: 30,
		address: {
			street: "123 Main St",
			city: "Anytown",
			zip: "12345",
		},
	});
	expectTypeOf(person).toEqualTypeOf<PersonType>();
});

test("should safe parse schema", () => {
	const schema = new Schema({ type: "string" });
	const result = schema.safeParse("example");

	// @ts-expect-error
	expect(result.data).toBe("example");
	// @ts-expect-error
	expect(result.error).toBeUndefined();
});

test("should safe parse schema with invalid input", () => {
	const schema = new Schema({ type: "string" });
	const result = schema.safeParse(123);

	expectTypeOf<typeof result>().toEqualTypeOf<SafeExecutorResult<string>>();
	// @ts-expect-error
	expect(result.data).toBeUndefined();
	// @ts-expect-error
	expect(result.error).toBeInstanceOf(ValidationFailedError);
});

test("should throw error when nested object schema validation fails", () => {
	const Address = new Schema({
		type: "object",
		properties: {
			street: { type: "string" },
			city: { type: "string" },
			zip: { type: "string" },
		},
		required: ["street"] as const,
	});

	const Person = new Schema({
		type: "object",
		properties: {
			lastName: { type: "string" },
			firstName: { type: "string" },
			address: Address,
		},
		required: ["lastName", "firstName"] as const,
	});

	expect(() =>
		Person.parse(
			'{"lastName": "Doe", "firstName": "John", "address": {"city": "Anytown", "zip": "12345"}}',
		),
	).toThrow(ValidationFailedError);
});

test("should correctly infer literal union types from const array", () => {
	const BloodType = new Schema({
		enum: ["a", "b", "o", "ab"] as const,
	});

	type BloodType = SchemaDefinition.Instance<typeof BloodType>;

	expectTypeOf<BloodType>().toEqualTypeOf<"a" | "b" | "o" | "ab">();
});
