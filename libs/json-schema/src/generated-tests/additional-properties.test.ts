/* This file is automatically generated. Do not edit this file. */
import { describe, expect, test } from "vitest";
import { Schema } from "../schema.js";
describe("additionalProperties being false does not allow other properties", () => {
  const schema = {
    $schema: "https://json-schema.org/draft/2020-12/schema",
    properties: { foo: {}, bar: {} },
    patternProperties: { "^v": {} },
    additionalProperties: false,
  };
  test("no additional properties is valid", () => {
    const instance = new Schema(schema);
    expect(instance.validate({ foo: 1 })).toBeTruthy();
  });
  test("an additional property is invalid", () => {
    const instance = new Schema(schema);
    expect(instance.validate({ foo: 1, bar: 2, quux: "boom" })).toBeFalsy();
  });
  test("ignores arrays", () => {
    const instance = new Schema(schema);
    expect(instance.validate([1, 2, 3])).toBeTruthy();
  });
  test("ignores strings", () => {
    const instance = new Schema(schema);
    expect(instance.validate("foobarbaz")).toBeTruthy();
  });
  test("ignores other non-objects", () => {
    const instance = new Schema(schema);
    expect(instance.validate(12)).toBeTruthy();
  });
  test("patternProperties are not additional properties", () => {
    const instance = new Schema(schema);
    expect(instance.validate({ foo: 1, vroom: 2 })).toBeTruthy();
  });
});
describe("non-ASCII pattern with additionalProperties", () => {
  const schema = {
    $schema: "https://json-schema.org/draft/2020-12/schema",
    patternProperties: { "^\u00E1": {} },
    additionalProperties: false,
  };
  test("matching the pattern is valid", () => {
    const instance = new Schema(schema);
    expect(instance.validate({ "\u00E1rm\u00E1nyos": 2 })).toBeTruthy();
  });
  test("not matching the pattern is invalid", () => {
    const instance = new Schema(schema);
    expect(instance.validate({ "\u00E9lm\u00E9ny": 2 })).toBeFalsy();
  });
});
describe("additionalProperties with schema", () => {
  const schema = {
    $schema: "https://json-schema.org/draft/2020-12/schema",
    properties: { foo: {}, bar: {} },
    additionalProperties: { type: "boolean" },
  };
  test("no additional properties is valid", () => {
    const instance = new Schema(schema);
    expect(instance.validate({ foo: 1 })).toBeTruthy();
  });
  test("an additional valid property is valid", () => {
    const instance = new Schema(schema);
    expect(instance.validate({ foo: 1, bar: 2, quux: true })).toBeTruthy();
  });
  test("an additional invalid property is invalid", () => {
    const instance = new Schema(schema);
    expect(instance.validate({ foo: 1, bar: 2, quux: 12 })).toBeFalsy();
  });
});
describe("additionalProperties can exist by itself", () => {
  const schema = {
    $schema: "https://json-schema.org/draft/2020-12/schema",
    additionalProperties: { type: "boolean" },
  };
  test("an additional valid property is valid", () => {
    const instance = new Schema(schema);
    expect(instance.validate({ foo: true })).toBeTruthy();
  });
  test("an additional invalid property is invalid", () => {
    const instance = new Schema(schema);
    expect(instance.validate({ foo: 1 })).toBeFalsy();
  });
});
describe("additionalProperties are allowed by default", () => {
  const schema = {
    $schema: "https://json-schema.org/draft/2020-12/schema",
    properties: { foo: {}, bar: {} },
  };
  test("additional properties are allowed", () => {
    const instance = new Schema(schema);
    expect(instance.validate({ foo: 1, bar: 2, quux: true })).toBeTruthy();
  });
});
describe("additionalProperties does not look in applicators", () => {
  const schema = {
    $schema: "https://json-schema.org/draft/2020-12/schema",
    allOf: [{ properties: { foo: {} } }],
    additionalProperties: { type: "boolean" },
  };
  test("properties defined in allOf are not examined", () => {
    const instance = new Schema(schema);
    expect(instance.validate({ foo: 1, bar: true })).toBeFalsy();
  });
});
describe("additionalProperties with null valued instance properties", () => {
  const schema = {
    $schema: "https://json-schema.org/draft/2020-12/schema",
    additionalProperties: { type: "null" },
  };
  test("allows null values", () => {
    const instance = new Schema(schema);
    expect(instance.validate({ foo: null })).toBeTruthy();
  });
});
describe("additionalProperties with propertyNames", () => {
  const schema = {
    $schema: "https://json-schema.org/draft/2020-12/schema",
    propertyNames: { maxLength: 5 },
    additionalProperties: { type: "number" },
  };
  test("Valid against both keywords", () => {
    const instance = new Schema(schema);
    expect(instance.validate({ apple: 4 })).toBeTruthy();
  });
  test("Valid against propertyNames, but not additionalProperties", () => {
    const instance = new Schema(schema);
    expect(instance.validate({ fig: 2, pear: "available" })).toBeFalsy();
  });
});
describe("dependentSchemas with additionalProperties", () => {
  const schema = {
    $schema: "https://json-schema.org/draft/2020-12/schema",
    properties: { foo2: {} },
    dependentSchemas: { foo: {}, foo2: { properties: { bar: {} } } },
    additionalProperties: false,
  };
  test("additionalProperties doesn't consider dependentSchemas", () => {
    const instance = new Schema(schema);
    expect(instance.validate({ foo: "" })).toBeFalsy();
  });
  test("additionalProperties can't see bar", () => {
    const instance = new Schema(schema);
    expect(instance.validate({ bar: "" })).toBeFalsy();
  });
  test("additionalProperties can't see bar even when foo2 is present", () => {
    const instance = new Schema(schema);
    expect(instance.validate({ foo2: "", bar: "" })).toBeFalsy();
  });
});
