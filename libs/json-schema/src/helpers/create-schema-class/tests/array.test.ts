import { expect, expectTypeOf, test } from "vitest";
import {
  OriginalValueSymbol,
  createSchemaClass,
} from "../create-schema-class.js";

test("should successfully parse string array", () => {
  class StringArray extends createSchemaClass({
    type: ["array"],
    items: {
      type: "string",
    },
  }) {}

  const items = new StringArray(["string", "string", "string"]);

  expect([...items]).toEqual(["string", "string", "string"]);
  expect(items.length).toBe(3);
  items[0] = "new string";
  expect([...items]).toEqual(["string", "string", "string"]);
  expect([...StringArray.parse('["string", "string", "string"]')]).toEqual([
    "string",
    "string",
    "string",
  ]);
  expect(
    JSON.stringify(StringArray.parse('["string", "string", "string"]')),
  ).toBe('["string","string","string"]');

  expectTypeOf(new StringArray([])).branded.toEqualTypeOf<
    string[] & {
      [OriginalValueSymbol]: string[];
    }
  >();
  expectTypeOf(new StringArray([])).toEqualTypeOf<StringArray>();
  expectTypeOf<StringArray>().branded.toEqualTypeOf<
    string[] & {
      [OriginalValueSymbol]: string[];
    }
  >();

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

  expectTypeOf(new NumberArraySchema([])).branded.toEqualTypeOf<
    number[] & {
      [OriginalValueSymbol]: number[];
    }
  >();
  expectTypeOf(new NumberArraySchema([])).toEqualTypeOf<NumberArraySchema>();
  expectTypeOf<NumberArraySchema>().branded.toEqualTypeOf<
    number[] & {
      [OriginalValueSymbol]: number[];
    }
  >();
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

  expectTypeOf(new BooleanArraySchema([])).branded.toEqualTypeOf<
    boolean[] & {
      [OriginalValueSymbol]: boolean[];
    }
  >();
  expectTypeOf(new BooleanArraySchema([])).toEqualTypeOf<BooleanArraySchema>();
  expectTypeOf<BooleanArraySchema>().branded.toEqualTypeOf<
    boolean[] & {
      [OriginalValueSymbol]: boolean[];
    }
  >();
  expect(() => BooleanArraySchema.parse([1, "string", true])).toThrow();
});

test("should successfully parse array of objects", () => {
  class ObjectSchema extends createSchemaClass({
    type: "object",
    properties: {
      name: { type: "string" },
      age: { type: "number" },
    },
    required: ["name"],
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

  expectTypeOf(new ObjectArraySchema([])).branded.toEqualTypeOf<
    {
      name: string;
      age: number | undefined;
    }[] & {
      [OriginalValueSymbol]: {
        name: string;
        age: number | undefined;
      }[];
    }
  >();
  expectTypeOf(new ObjectArraySchema([])).toEqualTypeOf<ObjectArraySchema>();
  expectTypeOf<ObjectArraySchema>().branded.toEqualTypeOf<
    {
      name: string;
      age: number | undefined;
    }[] & {
      [OriginalValueSymbol]: {
        name: string;
        age: number | undefined;
      }[];
    }
  >();
  expect(() => ObjectArraySchema.parse([1, "string", true])).toThrow();
});
