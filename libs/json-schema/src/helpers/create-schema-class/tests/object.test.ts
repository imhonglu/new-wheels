import { expect, expectTypeOf, test } from "vitest";
import { createSchemaClass } from "../create-schema-class.js";

test("should successfully parse valid object input", () => {
  class ObjectSchema extends createSchemaClass({
    type: "object",
    properties: {
      name: { type: "string" },
      age: { type: "number" },
      active: { type: "boolean" },
      createdAt: {
        type: ["string", "null"],
        default: () => new Date().toISOString(),
      },
    },
    required: ["name", "age"],
  }) {}

  expect(
    new ObjectSchema({
      name: "John",
      age: 30,
      active: true,
    }),
  ).toEqual({
    data: {
      name: "John",
      age: 30,
      active: true,
      createdAt: expect.toBeString(),
    },
  });

  expect(
    ObjectSchema.parse({
      name: "John",
      age: 30,
    }),
  ).toEqual({
    data: {
      name: "John",
      age: 30,
      createdAt: expect.toBeString(),
    },
  });

  expectTypeOf(new ObjectSchema({ name: "John", age: 30 })).toEqualTypeOf<{
    name: string;
    age: number;
    active?: boolean;
    createdAt?: string | null;
  }>();
  expectTypeOf(
    new ObjectSchema({ name: "John", age: 30 }),
  ).toEqualTypeOf<ObjectSchema>();
  expectTypeOf<ObjectSchema>().toEqualTypeOf<{
    name: string;
    age: number;
    active?: boolean;
    createdAt?: string | null;
  }>();

  expect(() => ObjectSchema.parse(123)).toThrow();
});

test("should successfully parse valid empty object input", () => {
  class ObjectSchema extends createSchemaClass({
    type: "object",
  }) {}

  expect(new ObjectSchema({})).toEqual({
    data: {},
  });
  expect(ObjectSchema.parse({})).toEqual({
    data: {},
  });

  expectTypeOf(new ObjectSchema({})).toEqualTypeOf<{
    [key: string]: unknown;
  }>();
  expectTypeOf(new ObjectSchema({})).toEqualTypeOf<ObjectSchema>();
  expectTypeOf<ObjectSchema>().toEqualTypeOf<{ [key: string]: unknown }>();
});

test("should handle nested objects", () => {
  class ObjectSchema extends createSchemaClass({
    type: "object",
    properties: {
      user: {
        type: "object",
        properties: {
          name: { type: "string" },
          age: { type: "number" },
          createdAt: {
            type: "string",
            default: () => new Date().toISOString(),
          },
        },
      },
    },
  }) {}

  expect(
    new ObjectSchema({
      user: {
        name: "John",
      },
    }),
  ).toEqual({
    data: {
      user: {
        name: "John",
        createdAt: expect.any(String),
      },
    },
  });

  expect(
    ObjectSchema.parse({
      user: {
        name: "John",
      },
    }),
  ).toEqual({
    data: {
      user: {
        name: "John",
        createdAt: expect.any(String),
      },
    },
  });
  expect(ObjectSchema.parse({})).toEqual({
    data: {},
  });

  expectTypeOf(
    new ObjectSchema({
      user: {
        name: "John",
      },
    }),
  ).toEqualTypeOf<{
    user?: {
      name?: string;
      age?: number;
      createdAt?: string;
    };
  }>();
  expectTypeOf(
    new ObjectSchema({
      user: {
        name: "John",
      },
    }),
  ).toEqualTypeOf<ObjectSchema>();
  expectTypeOf<ObjectSchema>().toEqualTypeOf<{
    user?: { name?: string; age?: number; createdAt?: string };
  }>();

  expect(() => ObjectSchema.parse(123)).toThrow();
});
