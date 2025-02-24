import { expect, expectTypeOf, test } from "vitest";
import {
  OriginalValueSymbol,
  createSchemaClass,
} from "../create-schema-class.js";

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
      updatedAt: {
        type: ["string", "null"],
        default: () => new Date().toISOString(),
      },
    },
    required: ["name", "age", "createdAt", "updatedAt"],
  }) {}

  expect(
    new ObjectSchema({
      name: "John",
      age: 30,
      active: true,
    }),
  ).toEqual({
    name: "John",
    age: 30,
    active: true,
    createdAt: expect.toBeString(),
    updatedAt: expect.toBeString(),
  });

  expect({
    ...new ObjectSchema({
      name: "John",
      age: 30,
      active: true,
    }),
  }).toEqual({
    name: "John",
    age: 30,
    active: true,
    createdAt: expect.toBeString(),
    updatedAt: expect.toBeString(),
  });

  expect(
    ObjectSchema.parse({
      name: "John",
      age: 30,
    }),
  ).toEqual({
    name: "John",
    age: 30,
    createdAt: expect.toBeString(),
    updatedAt: expect.toBeString(),
  });

  expectTypeOf(new ObjectSchema({ name: "John", age: 30 })).toEqualTypeOf<{
    name: string;
    age: number;
    active: boolean | undefined;
    createdAt: string | null;
    updatedAt: string | null;
    [OriginalValueSymbol]: {
      name: string;
      age: number;
      active: boolean | undefined;
      createdAt: string | null;
      updatedAt: string | null;
    };
  }>();
  expectTypeOf(
    new ObjectSchema({ name: "John", age: 30 }),
  ).toEqualTypeOf<ObjectSchema>();
  expectTypeOf<ObjectSchema>().toEqualTypeOf<{
    name: string;
    age: number;
    active: boolean | undefined;
    createdAt: string | null;
    updatedAt: string | null;
    [OriginalValueSymbol]: {
      name: string;
      age: number;
      active: boolean | undefined;
      createdAt: string | null;
      updatedAt: string | null;
    };
  }>();

  expect(() => ObjectSchema.parse(123)).toThrow();
});

test("should successfully parse valid empty object input", () => {
  class ObjectSchema extends createSchemaClass({
    type: "object",
  }) {}

  expect(new ObjectSchema({})).toEqual({});
  expect(ObjectSchema.parse({})).toEqual({});

  expectTypeOf(new ObjectSchema({})).toHaveProperty("data");
  expectTypeOf(new ObjectSchema({})).toHaveProperty("toJSON");
  expectTypeOf(new ObjectSchema({})).toEqualTypeOf<ObjectSchema>();
  expectTypeOf(ObjectSchema).toHaveProperty("parse");
  expectTypeOf(ObjectSchema).toHaveProperty("stringify");
  expectTypeOf(ObjectSchema).toHaveProperty("safeParse");
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
        required: ["createdAt"],
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
    user: {
      name: "John",
      createdAt: expect.any(String),
    },
  });

  expect(
    ObjectSchema.parse({
      user: {
        name: "John",
      },
    }),
  ).toEqual({
    user: {
      name: "John",
      createdAt: expect.any(String),
    },
  });
  expect(ObjectSchema.parse({})).toEqual({
    user: {
      createdAt: expect.any(String),
    },
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
    [OriginalValueSymbol]: {
      user?: {
        name?: string;
        age?: number;
        createdAt?: string;
      };
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
    user?: {
      name?: string;
      age?: number;
      createdAt?: string;
    };
    [OriginalValueSymbol]: {
      user?: { name?: string; age?: number; createdAt?: string };
    };
  }>();

  expect(() => ObjectSchema.parse(123)).toThrow();
});

test("should handle nested objects", () => {
  class Address extends createSchemaClass({
    type: "object",
    properties: {
      street: { type: "string" },
      city: { type: "string" },
      zip: { type: "string" },
    },
    required: ["street"],
  }) {}

  class Person extends createSchemaClass({
    type: "object",
    properties: {
      name: { type: "string" },
      address: Address,
      deletedAt: {
        type: ["string", "null"],
        default: null,
      },
    },
    required: ["name", "deletedAt"],
  }) {}

  const johnDoe = new Person({
    name: "John Doe",
    address: {
      street: "123 Main St",
      city: "Toronto",
      zip: "M5H 2N2",
    },
  });

  expect(johnDoe.name).toBe("John Doe");
  expect(johnDoe.address?.city).toBe("Toronto");
  expect(johnDoe.address?.street).toBe("123 Main St");
  expect(johnDoe.address?.zip).toBe("M5H 2N2");
  expect(johnDoe.deletedAt).toBeNull();
  expect(JSON.stringify(johnDoe)).toBe(
    JSON.stringify({
      name: "John Doe",
      address: {
        street: "123 Main St",
        city: "Toronto",
        zip: "M5H 2N2",
      },
      deletedAt: null,
    }),
  );

  const maryDoe = new Person({
    name: "Mary Doe",
    address: new Address({
      street: "456 Main St",
      city: "Toronto",
      zip: "M5H 2N2",
    }),
  });

  expect(JSON.stringify(maryDoe)).toBe(
    JSON.stringify({
      name: "Mary Doe",
      address: {
        street: "456 Main St",
        city: "Toronto",
        zip: "M5H 2N2",
      },
      deletedAt: null,
    }),
  );
});

test("should handle all properties are optional", () => {
  class Person extends createSchemaClass({
    type: "object",
    properties: {
      name: { type: "string", default: "John Doe" },
      age: { type: "number", default: 20 },
      isActive: { type: "boolean", default: true },
    },
    required: ["name"],
  }) {}

  const johnDoe = new Person();

  expect(johnDoe.name).toBe("John Doe");
  expect(johnDoe.age).toBe(20);
  expect(johnDoe.isActive).toBe(true);

  expect(JSON.stringify(johnDoe)).toBe(
    JSON.stringify({
      name: "John Doe",
      age: 20,
      isActive: true,
    }),
  );

  johnDoe.age = 23;

  expect(johnDoe.age).toBe(20);

  const janeDoe = {
    ...johnDoe,
    name: "Jane Doe",
  };

  expect(janeDoe.name).toBe("Jane Doe");
  expect(janeDoe.age).toBe(20);
  expect(janeDoe.isActive).toBe(true);
});

test("should return empty data object when instantiated without properties", () => {
  class Person extends createSchemaClass({
    type: "object",
    properties: {
      name: { type: "string" },
    },
  }) {}

  const johnDoe = new Person();

  expect(johnDoe).toEqual({});
});
