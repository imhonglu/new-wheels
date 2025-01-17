import { describe, expect, expectTypeOf, test } from "vitest";
import { createSafeExecutor } from "./create-safe-executor.js";

class TestError extends Error {}

describe("function", () => {
  const fn = (condition: "success" | "error") => {
    if (condition === "error") {
      throw new TestError();
    }
    return "Hello, World!";
  };

  const safeFn = createSafeExecutor(fn);

  test("should have correct type", () => {
    expectTypeOf(safeFn).toEqualTypeOf<
      (
        condition: "success" | "error",
      ) => { ok: true; data: string } | { ok: false; error: unknown }
    >();
  });

  test("should return data when function executes successfully", () => {
    const result = safeFn("success");

    expect(result.ok && result?.data).toBe("Hello, World!");
  });

  test("should return error when function throws an error", () => {
    const result = safeFn("error");

    expect(!result.ok && result?.error).toBeInstanceOf(TestError);
  });
});

describe("asynchronous function", () => {
  const fn = async (condition: "success" | "error") => {
    if (condition === "error") {
      throw new TestError();
    }
    return "Hello, World!";
  };

  const safeFn = createSafeExecutor(fn);

  test("should have correct type", async () => {
    const result = await safeFn("success");

    expectTypeOf(result).toEqualTypeOf<
      | { ok: true; data: string }
      | {
          ok: false;
          error: unknown;
        }
    >();
  });

  test("should return data when async function executes successfully", async () => {
    const result = await safeFn("success");

    expect(result.ok && result.data).toBe("Hello, World!");
  });

  test("should return error when async function throws an error", async () => {
    const result = await safeFn("error");

    expect(!result.ok && result.error).toBeInstanceOf(TestError);
  });
});
