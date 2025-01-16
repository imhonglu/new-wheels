/* This file is automatically generated. Do not edit this file. */
import { describe, expect, test } from "vitest";
import { Schema } from "../schema.js";
describe("minItems validation", () => {
  const schema = {
    $schema: "https://json-schema.org/draft/2020-12/schema",
    minItems: 1,
  };
  test("longer is valid", () => {
    const instance = new Schema(schema);
    expect(instance.validate([1, 2])).toBeTruthy();
  });
  test("exact length is valid", () => {
    const instance = new Schema(schema);
    expect(instance.validate([1])).toBeTruthy();
  });
  test("too short is invalid", () => {
    const instance = new Schema(schema);
    expect(instance.validate([])).toBeFalsy();
  });
  test("ignores non-arrays", () => {
    const instance = new Schema(schema);
    expect(instance.validate("")).toBeTruthy();
  });
});
describe("minItems validation with a decimal", () => {
  const schema = {
    $schema: "https://json-schema.org/draft/2020-12/schema",
    minItems: 1,
  };
  test("longer is valid", () => {
    const instance = new Schema(schema);
    expect(instance.validate([1, 2])).toBeTruthy();
  });
  test("too short is invalid", () => {
    const instance = new Schema(schema);
    expect(instance.validate([])).toBeFalsy();
  });
});
