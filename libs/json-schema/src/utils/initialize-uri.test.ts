import { expect, test } from "vitest";
import type { Schema } from "../schema.js";
import { initializeUri } from "./initialize-uri.js";

test("should return parent URI when schema has parent", () => {
  const parentUri = "http://example.com/schemas/";
  const schema = {
    parent: { uri: parentUri } as Schema,
    schema: {},
  } as unknown as Schema;

  expect(initializeUri(schema)).toBe(parentUri);
});

test("should return URI without last path segment when schema has valid $id", () => {
  const schema = {
    schema: {
      $id: "http://example.com/schemas/person.json",
    },
  } as unknown as Schema;

  expect(initializeUri(schema)).toBe("http://example.com/schemas/");
});

test("should return undefined when schema content is not an object", () => {
  const schema = {
    schema: "invalid",
  } as unknown as Schema;

  expect(initializeUri(schema)).toBeUndefined();
});

test("should return undefined when schema has no $id", () => {
  const schema = {
    schema: {},
  } as unknown as Schema;

  expect(initializeUri(schema)).toBeUndefined();
});

test("should throw error when $id pathname is empty", () => {
  const schema = {
    schema: {
      $id: "http://example.com",
    },
  } as unknown as Schema;

  expect(() => initializeUri(schema)).toThrow(
    "Invalid $id: URL pathname must have at least one segment",
  );
});
