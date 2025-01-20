import { expect, expectTypeOf, test } from "vitest";
import { Schema, type SchemaDefinition } from "../schema.js";

test("should successfully parse valid object input", () => {
  const ObjectSchema = new Schema({
    type: "object",
  });
  type ObjectType = SchemaDefinition.Instance<typeof ObjectSchema>;
  const result = ObjectSchema.parse({ name: "John", age: 30, active: true });

  expect(result).toEqual({ name: "John", age: 30, active: true });
  expect(ObjectSchema.parse({})).toEqual({});

  expectTypeOf(result).toEqualTypeOf<{}>();
  expectTypeOf<ObjectType>().toEqualTypeOf<{}>();

  expect(() => ObjectSchema.parse(123)).toThrow();
});

test("should handle nested objects", () => {
  const ObjectSchema = new Schema({
    type: "object",
    properties: {
      user: {
        type: "object",
        properties: {
          name: { type: "string" },
        },
      },
    },
  });
  type ObjectType = SchemaDefinition.Instance<typeof ObjectSchema>;
  const result = ObjectSchema.parse({
    user: {
      name: "John",
    },
  });

  expect(result).toEqual({
    user: {
      name: "John",
    },
  });
  expect(ObjectSchema.parse({})).toEqual({});

  expectTypeOf(result).toEqualTypeOf<ObjectType>();
  expectTypeOf<ObjectType>().toEqualTypeOf<{ user?: { name?: string } }>();

  expect(() => ObjectSchema.parse(123)).toThrow();
});
