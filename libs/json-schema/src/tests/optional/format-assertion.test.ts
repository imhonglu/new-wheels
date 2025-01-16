/* This file is automatically generated. Do not edit this file. */
import { describe, expect, test } from "vitest";
import { Schema } from "../../schema.js";
describe("schema that uses custom metaschema with format-assertion: false", () => {
  const schema = {
    $id: "https://schema/using/format-assertion/false",
    $schema: "http://localhost:1234/draft2020-12/format-assertion-false.json",
    format: "ipv4",
  };
  test("format-assertion: false: valid string", () => {
    const instance = new Schema(schema);
    expect(instance.validate("127.0.0.1")).toBeTruthy();
  });
  test("format-assertion: false: invalid string", () => {
    const instance = new Schema(schema);
    expect(instance.validate("not-an-ipv4")).toBeFalsy();
  });
});
describe("schema that uses custom metaschema with format-assertion: true", () => {
  const schema = {
    $id: "https://schema/using/format-assertion/true",
    $schema: "http://localhost:1234/draft2020-12/format-assertion-true.json",
    format: "ipv4",
  };
  test("format-assertion: true: valid string", () => {
    const instance = new Schema(schema);
    expect(instance.validate("127.0.0.1")).toBeTruthy();
  });
  test("format-assertion: true: invalid string", () => {
    const instance = new Schema(schema);
    expect(instance.validate("not-an-ipv4")).toBeFalsy();
  });
});
