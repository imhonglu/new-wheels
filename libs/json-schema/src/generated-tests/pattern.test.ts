/* This file is automatically generated. Do not edit this file. */
import { describe, expect, test } from "vitest";
import { Schema } from "../schema.js";
describe("pattern validation", () => {
  const schema = {
    $schema: "https://json-schema.org/draft/2020-12/schema",
    pattern: "^a*$",
  };
  test("a matching pattern is valid", () => {
    const instance = new Schema(schema);
    expect(instance.validate("aaa")).toBeTruthy();
  });
  test("a non-matching pattern is invalid", () => {
    const instance = new Schema(schema);
    expect(instance.validate("abc")).toBeFalsy();
  });
  test("ignores booleans", () => {
    const instance = new Schema(schema);
    expect(instance.validate(true)).toBeTruthy();
  });
  test("ignores integers", () => {
    const instance = new Schema(schema);
    expect(instance.validate(123)).toBeTruthy();
  });
  test("ignores floats", () => {
    const instance = new Schema(schema);
    expect(instance.validate(1)).toBeTruthy();
  });
  test("ignores objects", () => {
    const instance = new Schema(schema);
    expect(instance.validate({})).toBeTruthy();
  });
  test("ignores arrays", () => {
    const instance = new Schema(schema);
    expect(instance.validate([])).toBeTruthy();
  });
  test("ignores null", () => {
    const instance = new Schema(schema);
    expect(instance.validate(null)).toBeTruthy();
  });
});
describe("pattern is not anchored", () => {
  const schema = {
    $schema: "https://json-schema.org/draft/2020-12/schema",
    pattern: "a+",
  };
  test("matches a substring", () => {
    const instance = new Schema(schema);
    expect(instance.validate("xxaayy")).toBeTruthy();
  });
});
