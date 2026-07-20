import { expect, test } from "vitest";
import { UnwrapError } from "./unwrap.error.js";
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
  expect(() => unwrap(null)).toThrow(UnwrapError);
  expect(() => unwrap(null)).toThrow("Cannot unwrap null or undefined value");
});

test("should throw error when unwrapping undefined", () => {
  expect(() => unwrap(undefined)).toThrow(
    "Cannot unwrap null or undefined value",
  );
});

test("should throw with a custom error message", () => {
  expect(() => unwrap(null, "Custom error message")).toThrow(
    "Custom error message",
  );
});

test("should throw with an error cause", () => {
  expect.assertions(2);
  const cause = new Error("Original error");

  try {
    unwrap(null, undefined, { cause });
  } catch (error) {
    expect(error).toBeInstanceOf(UnwrapError);
    expect((error as UnwrapError).cause).toBe(cause);
  }
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
