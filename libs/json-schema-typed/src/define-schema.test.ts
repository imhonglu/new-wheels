import { expect, expectTypeOf, test } from "vitest";
import { defineSchema } from "./define-schema.js";
import type { Creatable } from "./types/utils/creatable.js";
import type { SchemaInstanceType } from "./types/utils/schema-instance-type.js";

test("should create a typed schema with required string property", () => {
  const schema = defineSchema({
    type: "object",
    properties: {
      name: { type: "string" },
      createdAt: {
        type: "string",
        format: "date-time",
        default: () => new Date().toISOString(),
      },
    },
    required: ["name", "createdAt"],
  });

  expect(schema).toEqual({
    type: "object",
    properties: {
      name: { type: "string" },
      createdAt: {
        type: "string",
        format: "date-time",
        default: expect.toBeFunction(),
      },
    },
    required: ["name", "createdAt"],
  });

  type SchemaInstance = SchemaInstanceType<typeof schema>;
  type Expected = {
    name: string;
    createdAt: string;
  };

  expectTypeOf<SchemaInstance>().toEqualTypeOf<Expected>();

  type SchemaInput = Creatable<typeof schema>;
  type ExpectedInput = {
    name: string;
  } & {
    createdAt?: string;
  };

  expectTypeOf<SchemaInput>().toEqualTypeOf<ExpectedInput>();
});
