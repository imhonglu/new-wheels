/* This file is automatically generated. Do not edit this file. */
import { describe, expect, test } from "vitest";
import { Schema } from "../schema.js";
describe("Location-independent identifier", () => {
  const schema = {
    $schema: "https://json-schema.org/draft/2020-12/schema",
    $ref: "#foo",
    $defs: { A: { $anchor: "foo", type: "integer" } },
  };
  test("match", () => {
    const instance = new Schema(schema);
    expect(instance.validate(1)).toBeTruthy();
  });
  test("mismatch", () => {
    const instance = new Schema(schema);
    expect(instance.validate("a")).toBeFalsy();
  });
});
describe("Location-independent identifier with absolute URI", () => {
  const schema = {
    $schema: "https://json-schema.org/draft/2020-12/schema",
    $ref: "http://localhost:1234/draft2020-12/bar#foo",
    $defs: {
      A: {
        $id: "http://localhost:1234/draft2020-12/bar",
        $anchor: "foo",
        type: "integer",
      },
    },
  };
  test("match", () => {
    const instance = new Schema(schema);
    expect(instance.validate(1)).toBeTruthy();
  });
  test("mismatch", () => {
    const instance = new Schema(schema);
    expect(instance.validate("a")).toBeFalsy();
  });
});
describe("Location-independent identifier with base URI change in subschema", () => {
  const schema = {
    $schema: "https://json-schema.org/draft/2020-12/schema",
    $id: "http://localhost:1234/draft2020-12/root",
    $ref: "http://localhost:1234/draft2020-12/nested.json#foo",
    $defs: {
      A: {
        $id: "nested.json",
        $defs: { B: { $anchor: "foo", type: "integer" } },
      },
    },
  };
  test("match", () => {
    const instance = new Schema(schema);
    expect(instance.validate(1)).toBeTruthy();
  });
  test("mismatch", () => {
    const instance = new Schema(schema);
    expect(instance.validate("a")).toBeFalsy();
  });
});
describe("same $anchor with different base uri", () => {
  const schema = {
    $schema: "https://json-schema.org/draft/2020-12/schema",
    $id: "http://localhost:1234/draft2020-12/foobar",
    $defs: {
      A: {
        $id: "child1",
        allOf: [
          { $id: "child2", $anchor: "my_anchor", type: "number" },
          { $anchor: "my_anchor", type: "string" },
        ],
      },
    },
    $ref: "child1#my_anchor",
  };
  test("$ref resolves to /$defs/A/allOf/1", () => {
    const instance = new Schema(schema);
    expect(instance.validate("a")).toBeTruthy();
  });
  test("$ref does not resolve to /$defs/A/allOf/0", () => {
    const instance = new Schema(schema);
    expect(instance.validate(1)).toBeFalsy();
  });
});
