import { describe, expect, test, vi } from "vitest";
import { memoize } from "./memoize.js";

describe("memoize", () => {
  test("caches synchronous return values by key", () => {
    const add = vi.fn((a: number, b: number) => a + b);
    const memoizedAdd = memoize(add);

    expect(memoizedAdd(1, 2)).toBe(3);
    expect(memoizedAdd(1, 2)).toBe(3);
    expect(memoizedAdd(1, 3)).toBe(4);

    expect(add).toHaveBeenCalledTimes(2);
  });

  test("caches an undefined return value with the built-in store", () => {
    const returnUndefined = vi.fn(() => undefined);
    const memoized = memoize(returnUndefined);

    expect(memoized()).toBeUndefined();
    expect(memoized()).toBeUndefined();

    expect(returnUndefined).toHaveBeenCalledTimes(1);
  });

  test("passes positional arguments to a custom resolver", () => {
    const format = vi.fn((left: string, right: string) => `${left}:${right}`);
    const resolver = vi.fn((left: string, right: string) =>
      [left, right].sort().join(":"),
    );
    const memoizedFormat = memoize(format, { resolver });

    expect(memoizedFormat("a", "b")).toBe("a:b");
    expect(memoizedFormat("b", "a")).toBe("a:b");

    expect(resolver).toHaveBeenNthCalledWith(1, "a", "b");
    expect(resolver).toHaveBeenNthCalledWith(2, "b", "a");
    expect(format).toHaveBeenCalledTimes(1);
  });

  test("stores and shares an in-flight Promise", async () => {
    let release!: (value: number) => void;
    const gate = new Promise<number>((resolve) => {
      release = resolve;
    });
    const load = vi.fn(async (value: number) => value + (await gate));
    const store = new Map<string, ReturnType<typeof load>>();
    const memoizedLoad = memoize(load, { store });

    const first = memoizedLoad(2);
    const second = memoizedLoad(2);

    expect(second).toBe(first);
    expect(store.get("[2]")).toBe(first);
    expect(load).toHaveBeenCalledTimes(1);

    release(3);
    await expect(first).resolves.toBe(5);
  });

  test("handles Promise-returning regular functions the same way", async () => {
    const load = vi.fn((value: number) => Promise.resolve(value * 2));
    const memoizedLoad = memoize(load);

    const first = memoizedLoad(2);
    const second = memoizedLoad(2);

    expect(second).toBe(first);
    await expect(first).resolves.toBe(4);
    expect(load).toHaveBeenCalledTimes(1);
  });

  test("caches a rejected Promise", async () => {
    const failure = new Error("failed");
    const load = vi.fn(async () => {
      throw failure;
    });
    const memoizedLoad = memoize(load);

    const first = memoizedLoad();
    await expect(first).rejects.toBe(failure);

    const second = memoizedLoad();
    expect(second).toBe(first);
    await expect(second).rejects.toBe(failure);
    expect(load).toHaveBeenCalledTimes(1);
  });

  test("does not cache a synchronous exception", () => {
    const failure = new Error("failed");
    const load = vi.fn(() => {
      throw failure;
    });
    const memoizedLoad = memoize(load);

    expect(() => memoizedLoad()).toThrow(failure);
    expect(() => memoizedLoad()).toThrow(failure);
    expect(load).toHaveBeenCalledTimes(2);
  });
});
