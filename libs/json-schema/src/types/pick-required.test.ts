import { expectTypeOf, test } from "vitest";
import type { PickRequired } from "./pick-required.js";

test("should extract keys of required properties", () => {
  type TestType = {
    required: string;
    optional?: number;
    nullable: string | null;
    undefinable: string | undefined;
    mixed?: string | undefined;
  };

  type Result = PickRequired<TestType>;
  type Expected = "required" | "nullable";

  expectTypeOf<Result>().toEqualTypeOf<Expected>();
});

test("should extract keys of required properties from intersection type", () => {
  type TestType = {
    required: string;
    nullable: string | null;
  } & {
    optional?: number;
    undefinable: string | undefined;
    mixed?: string | undefined;
  };

  type Result = PickRequired<TestType>;
  type Expected = "required" | "nullable";

  expectTypeOf<Result>().toEqualTypeOf<Expected>();
});

test("should return all keys for object with all required properties", () => {
  type TestType = {
    name: string;
    age: number;
    active: boolean;
  };

  type Result = PickRequired<TestType>;
  type Expected = "name" | "age" | "active";

  expectTypeOf<Result>().toEqualTypeOf<Expected>();
});

test("should return never for object with all optional properties", () => {
  type TestType = {
    name?: string;
    age?: number;
    active?: boolean;
  };

  type Result = PickRequired<TestType>;
  type Expected = never;

  expectTypeOf<Result>().toEqualTypeOf<Expected>();
});

test("should return never for empty object", () => {
  type TestType = {};

  type Result = PickRequired<TestType>;
  type Expected = never;

  expectTypeOf<Result>().toEqualTypeOf<Expected>();
});
