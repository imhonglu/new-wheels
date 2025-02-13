import { expect, test } from "vitest";
import { unwrap } from "./unwrap.js";

test("should unwrap string value", () => {
  const value = "test";
  expect(unwrap(value)).toBe("test");
});

test("should unwrap number value", () => {
  const value = 123;
  expect(unwrap(value)).toBe(123);
});

test("should unwrap object value", () => {
  const value = { foo: "bar" };
  expect(unwrap(value)).toEqual({ foo: "bar" });
});

test("should throw error when unwrapping null", () => {
  expect(() => unwrap(null)).toThrow("Cannot unwrap null or undefined value");
});

test("should throw error when unwrapping undefined", () => {
  expect(() => unwrap(undefined)).toThrow(
    "Cannot unwrap null or undefined value",
  );
});

test("should unwrap with custom error message", () => {
  expect(() => unwrap(null, "Custom error message")).toThrow(
    "Custom error message",
  );
});

test("should unwrap with Error object", () => {
  const error = new Error("Custom error");
  expect(() => unwrap(null, error)).toThrow(error);
});

test("should unwrap nested object properties", () => {
  const user = {
    name: "John",
    address: {
      street: "Main St",
      city: null as string | null,
    },
  };

  expect(unwrap(user.name)).toBe("John");
  expect(unwrap(user.address.street)).toBe("Main St");
  expect(() => unwrap(user.address.city)).toThrow();
});
