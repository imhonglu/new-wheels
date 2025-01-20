import { expect, expectTypeOf, test } from "vitest";
import { Schema, type SchemaDefinition } from "../schema.js";

test("should successfully parse string array", () => {
  const StringArraySchema = new Schema({
    type: "array",
    items: {
      type: "string",
    },
  });
  type StringArrayType = SchemaDefinition.Instance<typeof StringArraySchema>;
  const result = StringArraySchema.parse(["string", "string", "string"]);

  expect(result).toEqual(["string", "string", "string"]);
  expect(StringArraySchema.parse([])).toEqual([]);

  expectTypeOf(result).toEqualTypeOf<string[]>();
  expectTypeOf<StringArrayType>().toEqualTypeOf<string[]>();

  expect(() => StringArraySchema.parse([1, "string", true])).toThrow();
});

test("should successfully parse number array", () => {
  const NumberArraySchema = new Schema({
    type: "array",
    items: {
      type: "number",
    },
  });
  type NumberArrayType = SchemaDefinition.Instance<typeof NumberArraySchema>;
  const result = NumberArraySchema.parse([1, 2, 3]);

  expect(result).toEqual([1, 2, 3]);
  expect(NumberArraySchema.parse([])).toEqual([]);

  expectTypeOf(result).toEqualTypeOf<number[]>();
  expectTypeOf<NumberArrayType>().toEqualTypeOf<number[]>();

  expect(() => NumberArraySchema.parse([1, "string", true])).toThrow();
});

test("should successfully parse boolean array", () => {
  const BooleanArraySchema = new Schema({
    type: "array",
    items: {
      type: "boolean",
    },
  });
  type BooleanArrayType = SchemaDefinition.Instance<typeof BooleanArraySchema>;
  const result = BooleanArraySchema.parse([true, false, true]);

  expect(result).toEqual([true, false, true]);
  expect(BooleanArraySchema.parse([])).toEqual([]);

  expectTypeOf(result).toEqualTypeOf<boolean[]>();
  expectTypeOf<BooleanArrayType>().toEqualTypeOf<boolean[]>();

  expect(() => BooleanArraySchema.parse([1, "string", true])).toThrow();
});

test("should successfully parse array of objects", () => {
  const ObjectArraySchema = new Schema({
    type: "array",
    items: {
      type: "object",
      properties: {
        name: { type: "string" },
        age: { type: "number" },
      },
      required: ["name"] as const,
    },
  });
  type ObjectArrayType = SchemaDefinition.Instance<typeof ObjectArraySchema>;
  const result = ObjectArraySchema.parse([{ name: "John", age: 30 }]);

  expect(result).toEqual([{ name: "John", age: 30 }]);
  expect(ObjectArraySchema.parse([])).toEqual([]);

  expectTypeOf(result).toEqualTypeOf<ObjectArrayType>();
  expectTypeOf<ObjectArrayType>().toEqualTypeOf<
    ({ name: string } & { age?: number })[]
  >();

  expect(() => ObjectArraySchema.parse([1, "string", true])).toThrow();
});
