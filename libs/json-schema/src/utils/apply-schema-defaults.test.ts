import { expect, test } from "vitest";
import { applySchemaDefaults } from "./apply-schema-defaults.js";

test("applySchemaDefaults", () => {
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
