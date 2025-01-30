import { expect, expectTypeOf, test } from "vitest";
import { createSchemaClass } from "../create-schema-class.js";

test("should successfully parse string array", () => {
  class StringArray extends createSchemaClass({
    type: ["array"],
    items: {
      type: "string",
    },
  }) {}

  expect([...new StringArray(["string", "string", "string"])]).toEqual([
    "string",
    "string",
    "string",
  ]);
  expect([...StringArray.parse('["string", "string", "string"]')]).toEqual([
    "string",
    "string",
    "string",
  ]);

  expectTypeOf(new StringArray([])).toEqualTypeOf<string[]>();
  expectTypeOf(new StringArray([])).toEqualTypeOf<StringArray>();
  expectTypeOf<StringArray>().toEqualTypeOf<string[]>();

  expect(() => StringArray.parse([1, "string", true])).toThrow();
});

test("should successfully parse number array", () => {
  class NumberArraySchema extends createSchemaClass({
    type: "array",
    items: {
      type: "number",
    },
  }) {}

  expect([...new NumberArraySchema([1, 2, 3])]).toEqual([1, 2, 3]);
  expect([...NumberArraySchema.parse([1, 2, 3])]).toEqual([1, 2, 3]);

  expectTypeOf(new NumberArraySchema([])).toEqualTypeOf<number[]>();
  expectTypeOf(new NumberArraySchema([])).toEqualTypeOf<NumberArraySchema>();
  expectTypeOf<NumberArraySchema>().toEqualTypeOf<number[]>();

  expect(() => NumberArraySchema.parse([1, "string", true])).toThrow();
});

test("should successfully parse boolean array", () => {
  class BooleanArraySchema extends createSchemaClass({
    type: "array",
    items: {
      type: "boolean",
    },
  }) {}

  expect([...new BooleanArraySchema([true, false, true])]).toEqual([
    true,
    false,
    true,
  ]);
  expect([...BooleanArraySchema.parse([true, false, true])]).toEqual([
    true,
    false,
    true,
  ]);

  expectTypeOf(new BooleanArraySchema([])).toEqualTypeOf<boolean[]>();
  expectTypeOf(new BooleanArraySchema([])).toEqualTypeOf<BooleanArraySchema>();
  expectTypeOf<BooleanArraySchema>().toEqualTypeOf<boolean[]>();

  expect(() => BooleanArraySchema.parse([1, "string", true])).toThrow();
});

test("should successfully parse array of objects", () => {
  class ObjectSchema extends createSchemaClass({
    type: "object",
    properties: {
      name: { type: "string" },
      age: { type: "number" },
    },
    required: ["name"] as const,
  }) {}

  class ObjectArraySchema extends createSchemaClass({
    type: "array",
    items: ObjectSchema,
  }) {}

  expect([...new ObjectArraySchema([{ name: "John", age: 30 }])]).toEqual([
    { name: "John", age: 30 },
  ]);
  expect([...ObjectArraySchema.parse([{ name: "John", age: 30 }])]).toEqual([
    { name: "John", age: 30 },
  ]);

  expectTypeOf(new ObjectArraySchema([])).toEqualTypeOf<ObjectSchema[]>();
  expectTypeOf(new ObjectArraySchema([])).toEqualTypeOf<ObjectArraySchema>();
  expectTypeOf<ObjectArraySchema>().toEqualTypeOf<ObjectSchema[]>();

  expect(() => ObjectArraySchema.parse([1, "string", true])).toThrow();
});
