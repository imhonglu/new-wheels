import { expect, expectTypeOf, test } from "vitest";
import { Schema, type SchemaDefinition } from "../schema.js";

test("should correctly infer string literal type", () => {
  const StringSchema = new Schema({
    const: "hello" as const,
  });
  type StringSchemaType = SchemaDefinition.Instance<typeof StringSchema>;

  expect(StringSchema.validate("hello")).toBe(true);
  expect(StringSchema.validate("world")).toBe(false);

  expectTypeOf(StringSchema.parse("hello")).toEqualTypeOf<"hello">();
  expectTypeOf<StringSchemaType>().toEqualTypeOf<"hello">();
});

test("should correctly infer number literal type", () => {
  const NumberSchema = new Schema({
    const: 42 as const,
  });
  type NumberSchemaType = SchemaDefinition.Instance<typeof NumberSchema>;

  expect(NumberSchema.validate(42)).toBe(true);
  expect(NumberSchema.validate(43)).toBe(false);

  expectTypeOf(NumberSchema.parse(42)).toEqualTypeOf<42>();
  expectTypeOf<NumberSchemaType>().toEqualTypeOf<42>();
});

test("should correctly infer object literal type", () => {
  const ObjectSchema = new Schema({
    const: { name: "John", age: 30 } as const,
  });
  type ObjectSchemaType = SchemaDefinition.Instance<typeof ObjectSchema>;

  expect(ObjectSchema.validate({ name: "John", age: 30 })).toBe(true);
  expect(ObjectSchema.validate({ name: "Jane", age: 25 })).toBe(false);

  expectTypeOf(ObjectSchema.parse({ name: "John", age: 30 })).toEqualTypeOf<{
    readonly name: "John";
    readonly age: 30;
  }>();
  expectTypeOf<ObjectSchemaType>().toEqualTypeOf<{
    readonly name: "John";
    readonly age: 30;
  }>();
});
