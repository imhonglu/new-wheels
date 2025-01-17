/* This file is automatically generated. Do not edit this file. */
import { describe, expect, test } from "vitest";
import { Schema } from "../../../schema.js";
describe("validation of IP addresses", () => {
  const schema = {
    $schema: "https://json-schema.org/draft/2020-12/schema",
    format: "ipv4",
  };
  test("all string formats ignore integers", () => {
    const instance = new Schema(schema);
    expect(instance.validate(12)).toBeTruthy();
  });
  test("all string formats ignore floats", () => {
    const instance = new Schema(schema);
    expect(instance.validate(13.7)).toBeTruthy();
  });
  test("all string formats ignore objects", () => {
    const instance = new Schema(schema);
    expect(instance.validate({})).toBeTruthy();
  });
  test("all string formats ignore arrays", () => {
    const instance = new Schema(schema);
    expect(instance.validate([])).toBeTruthy();
  });
  test("all string formats ignore booleans", () => {
    const instance = new Schema(schema);
    expect(instance.validate(false)).toBeTruthy();
  });
  test("all string formats ignore nulls", () => {
    const instance = new Schema(schema);
    expect(instance.validate(null)).toBeTruthy();
  });
  test("a valid IP address", () => {
    const instance = new Schema(schema);
    expect(instance.validate("192.168.0.1")).toBeTruthy();
  });
  test("an IP address with too many components", () => {
    const instance = new Schema(schema);
    expect(instance.validate("127.0.0.0.1")).toBeFalsy();
  });
  test("an IP address with out-of-range values", () => {
    const instance = new Schema(schema);
    expect(instance.validate("256.256.256.256")).toBeFalsy();
  });
  test("an IP address without 4 components", () => {
    const instance = new Schema(schema);
    expect(instance.validate("127.0")).toBeFalsy();
  });
  test("an IP address as an integer", () => {
    const instance = new Schema(schema);
    expect(instance.validate("0x7f000001")).toBeFalsy();
  });
  test("an IP address as an integer (decimal)", () => {
    const instance = new Schema(schema);
    expect(instance.validate("2130706433")).toBeFalsy();
  });
  test("invalid leading zeroes, as they are treated as octals", () => {
    const instance = new Schema(schema);
    expect(instance.validate("087.10.0.1")).toBeFalsy();
  });
  test("value without leading zero is valid", () => {
    const instance = new Schema(schema);
    expect(instance.validate("87.10.0.1")).toBeTruthy();
  });
  test("invalid non-ASCII '\u09E8' (a Bengali 2)", () => {
    const instance = new Schema(schema);
    expect(instance.validate("1\u09E87.0.0.1")).toBeFalsy();
  });
  test("netmask is not a part of ipv4 address", () => {
    const instance = new Schema(schema);
    expect(instance.validate("192.168.1.0/24")).toBeFalsy();
  });
});
