import { printNode } from "@imhonglu/build-tools";
import { expect, test, vi } from "vitest";
import type { TestGroup } from "../types/test-group.js";
import { createTestSourceFile } from "./create-test-source-file.js";

vi.mock("node:fs/promises", () => ({
  readFile: vi.fn().mockResolvedValue(
    JSON.stringify([
      {
        description: "test group 1",
        schema: { type: "string" },
        tests: [
          {
            description: "test case 1",
            data: "valid string",
            valid: true,
          },
        ],
      },
    ] satisfies TestGroup[]),
  ),
}));

test("should create test source file", async () => {
  const sourceFile = await createTestSourceFile(
    "./json-schema/src/test-suite/JSON-Schema-Test-Suite/tests/draft2020-12/additionalProperties.json",
    "../schema.js",
  );

  expect(printNode(sourceFile)).toBe(
    `
/* This file is automatically generated. Do not edit this file. */
import { describe, test, expect } from "vitest";
import { Schema } from "../schema.js";
describe("test group 1", () => {
    const schema = { "type": "string" };
    test("test case 1", () => {
        const instance = new Schema(schema);
        expect(instance.validate("valid string")).toBeTruthy();
    });
});
`.trimStart(),
  );

  expect(sourceFile.fileName).toBe("additional-properties.test.ts");
});
