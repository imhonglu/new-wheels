import { expect, test } from "vitest";
import { applySchemaDefaults } from "./apply-schema-defaults.js";

test("should apply default values while preserving existing properties", () => {
  expect(
    applySchemaDefaults(
      { name: "John" },
      {
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
    ),
  ).toEqual({ name: "John", createdAt: expect.any(String) });
});

test("should apply all default values when input is undefined", () => {
  expect(
    applySchemaDefaults(undefined, {
      type: "object",
      properties: {
        name: { type: "string", default: "John Doe" },
        age: { type: "number", default: 20 },
        isActive: { type: "boolean", default: true },
      },
    }),
  ).toEqual({ name: "John Doe", age: 20, isActive: true });
});

test("should handle nested object properties with defaults", () => {
  expect(
    applySchemaDefaults(
      { user: { name: "John" } },
      {
        type: "object",
        properties: {
          user: {
            type: "object",
            properties: {
              name: { type: "string" },
              settings: {
                type: "object",
                properties: {
                  theme: { type: "string", default: "light" },
                  notifications: { type: "boolean", default: true },
                },
              },
            },
          },
        },
      },
    ),
  ).toEqual({
    user: {
      name: "John",
      settings: {
        theme: "light",
        notifications: true,
      },
    },
  });
});

test("should handle array items with defaults", () => {
  expect(
    applySchemaDefaults(
      { tags: ["typescript"] },
      {
        type: "object",
        properties: {
          tags: {
            type: "array",
            items: {
              type: "string",
            },
            default: ["general"],
          },
        },
      },
    ),
  ).toEqual({ tags: ["typescript"] });
});

test("should not modify input object when no defaults are specified", () => {
  const input = { name: "John", age: 30 };
  expect(
    applySchemaDefaults(input, {
      type: "object",
      properties: {
        name: { type: "string" },
        age: { type: "number" },
      },
    }),
  ).toEqual(input);
});
