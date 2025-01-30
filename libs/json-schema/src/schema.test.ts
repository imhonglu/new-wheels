import type { SafeExecutorResult } from "@imhonglu/toolkit";
import { expect, expectTypeOf, test } from "vitest";
import { ValidationFailedError } from "./errors/validation-failed-error.js";
import { Schema } from "./schema.js";
import type { InferSchemaType } from "./types/infer-schema-type.js";

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
  type AddressType = InferSchemaType<typeof Address>;

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
    '{"street": "123 Main St", "city": "Toronto", "zip": "M5H 2N2"}',
  );

  expect(address).toEqual({
    street: "123 Main St",
    city: "Toronto",
    zip: "M5H 2N2",
  });

  expectTypeOf(address).toEqualTypeOf<AddressType>();

  expect(Address.parse('{"street": "123 Main St"}')).toEqual({
    street: "123 Main St",
  });

  expect(() => Address.parse('{"city": "Toronto"}')).toThrow();
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

  type PersonType = InferSchemaType<typeof Person>;

  expectTypeOf<PersonType>().toEqualTypeOf<
    {
      lastName: string;
      firstName: string;
    } & {
      address?: InferSchemaType<typeof Address>;
      age?: number;
    }
  >();

  const person = Person.parse(
    '{"lastName": "Doe", "firstName": "John", "age": 30, "address": {"street": "123 Main St", "city": "Toronto", "zip": "M5H 2N2"}}',
  );

  expect(person).toEqual({
    lastName: "Doe",
    firstName: "John",
    age: 30,
    address: {
      street: "123 Main St",
      city: "Toronto",
      zip: "M5H 2N2",
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
