import { expect, test, vi } from "vitest";
import { memoize } from "./memoize.js";

test("should memoize synchronous functions", () => {
  const add = vi.fn((a: number, b: number) => a + b);
  const memoizedAdd = memoize(add);

  expect(memoizedAdd(1, 2)).toBe(3);
  expect(memoizedAdd(1, 2)).toBe(3);
  expect(add).toHaveBeenCalledTimes(1);

  expect(memoizedAdd(1, 3)).toBe(4);
  expect(memoizedAdd(1, 3)).toBe(4);
  expect(add).toHaveBeenCalledTimes(2);

  expect(memoizedAdd(2, 3)).toBe(5);
  expect(memoizedAdd(2, 3)).toBe(5);
  expect(add).toHaveBeenCalledTimes(3);
});

test("should memoize asynchronous functions", async () => {
  const add = vi.fn(async (a: number, b: number) => a + b);
  const memoizedAdd = memoize(add);

  expect(await memoizedAdd(1, 2)).toBe(3);
  expect(await memoizedAdd(1, 2)).toBe(3);
  expect(add).toHaveBeenCalledTimes(1);

  expect(await memoizedAdd(1, 3)).toBe(4);
  expect(await memoizedAdd(1, 3)).toBe(4);
  expect(add).toHaveBeenCalledTimes(2);

  const [result1, result2] = await Promise.all([
    memoizedAdd(2, 2),
    memoizedAdd(2, 2),
  ]);
  expect(result1).toBe(4);
  expect(result2).toBe(4);
  expect(add).toHaveBeenCalledTimes(3);
});
