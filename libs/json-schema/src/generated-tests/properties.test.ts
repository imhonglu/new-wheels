/* This file is automatically generated. Do not edit this file. */
import { describe, expect, test } from "vitest";
import { Schema } from "../schema.js";
describe("object properties validation", () => {
  const schema = {
    $schema: "https://json-schema.org/draft/2020-12/schema",
    properties: { foo: { type: "integer" }, bar: { type: "string" } },
  };
  test("both properties present and valid is valid", () => {
    const instance = new Schema(schema);
    expect(instance.validate({ foo: 1, bar: "baz" })).toBeTruthy();
  });
  test("one property invalid is invalid", () => {
    const instance = new Schema(schema);
    expect(instance.validate({ foo: 1, bar: {} })).toBeFalsy();
  });
  test("both properties invalid is invalid", () => {
    const instance = new Schema(schema);
    expect(instance.validate({ foo: [], bar: {} })).toBeFalsy();
  });
  test("doesn't invalidate other properties", () => {
    const instance = new Schema(schema);
    expect(instance.validate({ quux: [] })).toBeTruthy();
  });
  test("ignores arrays", () => {
    const instance = new Schema(schema);
    expect(instance.validate([])).toBeTruthy();
  });
  test("ignores other non-objects", () => {
    const instance = new Schema(schema);
    expect(instance.validate(12)).toBeTruthy();
  });
});
describe("properties, patternProperties, additionalProperties interaction", () => {
  const schema = {
    $schema: "https://json-schema.org/draft/2020-12/schema",
    properties: { foo: { type: "array", maxItems: 3 }, bar: { type: "array" } },
    patternProperties: { "f.o": { minItems: 2 } },
    additionalProperties: { type: "integer" },
  };
  test("property validates property", () => {
    const instance = new Schema(schema);
    expect(instance.validate({ foo: [1, 2] })).toBeTruthy();
  });
  test("property invalidates property", () => {
    const instance = new Schema(schema);
    expect(instance.validate({ foo: [1, 2, 3, 4] })).toBeFalsy();
  });
  test("patternProperty invalidates property", () => {
    const instance = new Schema(schema);
    expect(instance.validate({ foo: [] })).toBeFalsy();
  });
  test("patternProperty validates nonproperty", () => {
    const instance = new Schema(schema);
    expect(instance.validate({ fxo: [1, 2] })).toBeTruthy();
  });
  test("patternProperty invalidates nonproperty", () => {
    const instance = new Schema(schema);
    expect(instance.validate({ fxo: [] })).toBeFalsy();
  });
  test("additionalProperty ignores property", () => {
    const instance = new Schema(schema);
    expect(instance.validate({ bar: [] })).toBeTruthy();
  });
  test("additionalProperty validates others", () => {
    const instance = new Schema(schema);
    expect(instance.validate({ quux: 3 })).toBeTruthy();
  });
  test("additionalProperty invalidates others", () => {
    const instance = new Schema(schema);
    expect(instance.validate({ quux: "foo" })).toBeFalsy();
  });
});
describe("properties with boolean schema", () => {
  const schema = {
    $schema: "https://json-schema.org/draft/2020-12/schema",
    properties: { foo: true, bar: false },
  };
  test("no property present is valid", () => {
    const instance = new Schema(schema);
    expect(instance.validate({})).toBeTruthy();
  });
  test("only 'true' property present is valid", () => {
    const instance = new Schema(schema);
    expect(instance.validate({ foo: 1 })).toBeTruthy();
  });
  test("only 'false' property present is invalid", () => {
    const instance = new Schema(schema);
    expect(instance.validate({ bar: 2 })).toBeFalsy();
  });
  test("both properties present is invalid", () => {
    const instance = new Schema(schema);
    expect(instance.validate({ foo: 1, bar: 2 })).toBeFalsy();
  });
});
describe("properties with escaped characters", () => {
  const schema = {
    $schema: "https://json-schema.org/draft/2020-12/schema",
    properties: {
      "foo\nbar": { type: "number" },
      'foo"bar': { type: "number" },
      "foo\\bar": { type: "number" },
      "foo\rbar": { type: "number" },
      "foo\tbar": { type: "number" },
      "foo\fbar": { type: "number" },
    },
  };
  test("object with all numbers is valid", () => {
    const instance = new Schema(schema);
    expect(
      instance.validate({
        "foo\nbar": 1,
        'foo"bar': 1,
        "foo\\bar": 1,
        "foo\rbar": 1,
        "foo\tbar": 1,
        "foo\fbar": 1,
      }),
    ).toBeTruthy();
  });
  test("object with strings is invalid", () => {
    const instance = new Schema(schema);
    expect(
      instance.validate({
        "foo\nbar": "1",
        'foo"bar': "1",
        "foo\\bar": "1",
        "foo\rbar": "1",
        "foo\tbar": "1",
        "foo\fbar": "1",
      }),
    ).toBeFalsy();
  });
});
describe("properties with null valued instance properties", () => {
  const schema = {
    $schema: "https://json-schema.org/draft/2020-12/schema",
    properties: { foo: { type: "null" } },
  };
  test("allows null values", () => {
    const instance = new Schema(schema);
    expect(instance.validate({ foo: null })).toBeTruthy();
  });
});
describe("properties whose names are Javascript object property names", () => {
  const schema = {
    $schema: "https://json-schema.org/draft/2020-12/schema",
    properties: {
      ["__proto__"]: { type: "number" },
      toString: { properties: { length: { type: "string" } } },
      constructor: { type: "number" },
    },
  };
  test("ignores arrays", () => {
    const instance = new Schema(schema);
    expect(instance.validate([])).toBeTruthy();
  });
  test("ignores other non-objects", () => {
    const instance = new Schema(schema);
    expect(instance.validate(12)).toBeTruthy();
  });
  test("none of the properties mentioned", () => {
    const instance = new Schema(schema);
    expect(instance.validate({})).toBeTruthy();
  });
  test("__proto__ not valid", () => {
    const instance = new Schema(schema);
    expect(instance.validate({ ["__proto__"]: "foo" })).toBeFalsy();
  });
  test("toString not valid", () => {
    const instance = new Schema(schema);
    expect(instance.validate({ toString: { length: 37 } })).toBeFalsy();
  });
  test("constructor not valid", () => {
    const instance = new Schema(schema);
    expect(instance.validate({ constructor: { length: 37 } })).toBeFalsy();
  });
  test("all present and valid", () => {
    const instance = new Schema(schema);
    expect(
      instance.validate({
        ["__proto__"]: 12,
        toString: { length: "foo" },
        constructor: 37,
      }),
    ).toBeTruthy();
  });
});
