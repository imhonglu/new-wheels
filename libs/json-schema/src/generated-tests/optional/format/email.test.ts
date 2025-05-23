/* This file is automatically generated. Do not edit this file. */
import { describe, expect, test } from "vitest";
import { Schema } from "../../../schema.js";
describe("validation of e-mail addresses", () => {
  const schema = {
    $schema: "https://json-schema.org/draft/2020-12/schema",
    format: "email",
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
  test("a valid e-mail address", () => {
    const instance = new Schema(schema);
    expect(instance.validate("joe.bloggs@example.com")).toBeTruthy();
  });
  test("an invalid e-mail address", () => {
    const instance = new Schema(schema);
    expect(instance.validate("2962")).toBeFalsy();
  });
  test("tilde in local part is valid", () => {
    const instance = new Schema(schema);
    expect(instance.validate("te~st@example.com")).toBeTruthy();
  });
  test("tilde before local part is valid", () => {
    const instance = new Schema(schema);
    expect(instance.validate("~test@example.com")).toBeTruthy();
  });
  test("tilde after local part is valid", () => {
    const instance = new Schema(schema);
    expect(instance.validate("test~@example.com")).toBeTruthy();
  });
  test("a quoted string with a space in the local part is valid", () => {
    const instance = new Schema(schema);
    expect(instance.validate('"joe bloggs"@example.com')).toBeTruthy();
  });
  test("a quoted string with a double dot in the local part is valid", () => {
    const instance = new Schema(schema);
    expect(instance.validate('"joe..bloggs"@example.com')).toBeTruthy();
  });
  test("a quoted string with a @ in the local part is valid", () => {
    const instance = new Schema(schema);
    expect(instance.validate('"joe@bloggs"@example.com')).toBeTruthy();
  });
  test("an IPv4-address-literal after the @ is valid", () => {
    const instance = new Schema(schema);
    expect(instance.validate("joe.bloggs@[127.0.0.1]")).toBeTruthy();
  });
  test("an IPv6-address-literal after the @ is valid", () => {
    const instance = new Schema(schema);
    expect(instance.validate("joe.bloggs@[IPv6:::1]")).toBeTruthy();
  });
  test("dot before local part is not valid", () => {
    const instance = new Schema(schema);
    expect(instance.validate(".test@example.com")).toBeFalsy();
  });
  test("dot after local part is not valid", () => {
    const instance = new Schema(schema);
    expect(instance.validate("test.@example.com")).toBeFalsy();
  });
  test("two separated dots inside local part are valid", () => {
    const instance = new Schema(schema);
    expect(instance.validate("te.s.t@example.com")).toBeTruthy();
  });
  test("two subsequent dots inside local part are not valid", () => {
    const instance = new Schema(schema);
    expect(instance.validate("te..st@example.com")).toBeFalsy();
  });
  test("an invalid domain", () => {
    const instance = new Schema(schema);
    expect(instance.validate("joe.bloggs@invalid=domain.com")).toBeFalsy();
  });
  test("an invalid IPv4-address-literal", () => {
    const instance = new Schema(schema);
    expect(instance.validate("joe.bloggs@[127.0.0.300]")).toBeFalsy();
  });
});
