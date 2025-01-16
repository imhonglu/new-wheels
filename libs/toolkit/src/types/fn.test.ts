import { expectTypeOf, test } from "vitest";
import type { Fn } from "./fn.js";

test("Fn.Callable with args only", () => {
  type A = Fn.Callable<{ args: [number, string] }>;

  expectTypeOf<A>().toBeFunction();
  expectTypeOf<A>().parameters.toEqualTypeOf<[number, string]>();
  expectTypeOf<A>().returns.toBeAny();
});

test("Fn.Callable with return type only", () => {
  type A = Fn.Callable<{ return: string }>;

  expectTypeOf<A>().toBeFunction();
  expectTypeOf<A>().parameters.toEqualTypeOf<[...any[]]>();
  expectTypeOf<A>().returns.toBeString();
});

test("Fn.Callable with args and return type", () => {
  type A = Fn.Callable<{
    args: [number, string];
    return: string;
  }>;

  expectTypeOf<A>().toBeFunction();
  expectTypeOf<A>().parameters.toEqualTypeOf<[number, string]>();
  expectTypeOf<A>().returns.toBeString();
});

test("Fn.Newable with constructor parameters", () => {
  type A = Fn.Newable<{
    args: [number, string];
    return: string;
  }>;

  expectTypeOf<A>().constructorParameters.toEqualTypeOf<[number, string]>();
  expectTypeOf<A>().instance.toEqualTypeOf<string>();
});
