/* This file is automatically generated. Do not edit this file. */
import { describe, expect, test } from "vitest";
import { Schema } from "../schema.js";
describe("contains keyword validation", () => {
  const schema = {
    $schema: "https://json-schema.org/draft/2020-12/schema",
    contains: { minimum: 5 },
  };
  test("array with item matching schema (5) is valid", () => {
    const instance = new Schema(schema);
    expect(instance.validate([3, 4, 5])).toBeTruthy();
  });
  test("array with item matching schema (6) is valid", () => {
    const instance = new Schema(schema);
    expect(instance.validate([3, 4, 6])).toBeTruthy();
  });
  test("array with two items matching schema (5, 6) is valid", () => {
    const instance = new Schema(schema);
    expect(instance.validate([3, 4, 5, 6])).toBeTruthy();
  });
  test("array without items matching schema is invalid", () => {
    const instance = new Schema(schema);
    expect(instance.validate([2, 3, 4])).toBeFalsy();
  });
  test("empty array is invalid", () => {
    const instance = new Schema(schema);
    expect(instance.validate([])).toBeFalsy();
  });
  test("not array is valid", () => {
    const instance = new Schema(schema);
    expect(instance.validate({})).toBeTruthy();
  });
});
describe("contains keyword with const keyword", () => {
  const schema = {
    $schema: "https://json-schema.org/draft/2020-12/schema",
    contains: { const: 5 },
  };
  test("array with item 5 is valid", () => {
    const instance = new Schema(schema);
    expect(instance.validate([3, 4, 5])).toBeTruthy();
  });
  test("array with two items 5 is valid", () => {
    const instance = new Schema(schema);
    expect(instance.validate([3, 4, 5, 5])).toBeTruthy();
  });
  test("array without item 5 is invalid", () => {
    const instance = new Schema(schema);
    expect(instance.validate([1, 2, 3, 4])).toBeFalsy();
  });
});
describe("contains keyword with boolean schema true", () => {
  const schema = {
    $schema: "https://json-schema.org/draft/2020-12/schema",
    contains: true,
  };
  test("any non-empty array is valid", () => {
    const instance = new Schema(schema);
    expect(instance.validate(["foo"])).toBeTruthy();
  });
  test("empty array is invalid", () => {
    const instance = new Schema(schema);
    expect(instance.validate([])).toBeFalsy();
  });
});
describe("contains keyword with boolean schema false", () => {
  const schema = {
    $schema: "https://json-schema.org/draft/2020-12/schema",
    contains: false,
  };
  test("any non-empty array is invalid", () => {
    const instance = new Schema(schema);
    expect(instance.validate(["foo"])).toBeFalsy();
  });
  test("empty array is invalid", () => {
    const instance = new Schema(schema);
    expect(instance.validate([])).toBeFalsy();
  });
  test("non-arrays are valid", () => {
    const instance = new Schema(schema);
    expect(
      instance.validate("contains does not apply to strings"),
    ).toBeTruthy();
  });
});
describe("items + contains", () => {
  const schema = {
    $schema: "https://json-schema.org/draft/2020-12/schema",
    items: { multipleOf: 2 },
    contains: { multipleOf: 3 },
  };
  test("matches items, does not match contains", () => {
    const instance = new Schema(schema);
    expect(instance.validate([2, 4, 8])).toBeFalsy();
  });
  test("does not match items, matches contains", () => {
    const instance = new Schema(schema);
    expect(instance.validate([3, 6, 9])).toBeFalsy();
  });
  test("matches both items and contains", () => {
    const instance = new Schema(schema);
    expect(instance.validate([6, 12])).toBeTruthy();
  });
  test("matches neither items nor contains", () => {
    const instance = new Schema(schema);
    expect(instance.validate([1, 5])).toBeFalsy();
  });
});
describe("contains with false if subschema", () => {
  const schema = {
    $schema: "https://json-schema.org/draft/2020-12/schema",
    contains: { if: false, else: true },
  };
  test("any non-empty array is valid", () => {
    const instance = new Schema(schema);
    expect(instance.validate(["foo"])).toBeTruthy();
  });
  test("empty array is invalid", () => {
    const instance = new Schema(schema);
    expect(instance.validate([])).toBeFalsy();
  });
});
describe("contains with null instance elements", () => {
  const schema = {
    $schema: "https://json-schema.org/draft/2020-12/schema",
    contains: { type: "null" },
  };
  test("allows null items", () => {
    const instance = new Schema(schema);
    expect(instance.validate([null])).toBeTruthy();
  });
});
