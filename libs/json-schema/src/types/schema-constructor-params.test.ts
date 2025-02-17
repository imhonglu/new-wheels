import { expectTypeOf, test } from "vitest";
import type { SchemaConstructorParams } from "./schema-constructor-params.js";

test("should infer the correct argument type", () => {
  type Schema = {
    type: "object";
    properties: {
      name: { type: "string" };
      age: { type: "number"; default: 20 };
      isActive: { type: "boolean"; default: true };
    };
    required: ["name", "age", "isActive"];
  };

  type Result = SchemaConstructorParams<Schema>;
  type Expected = [
    data: { name: string } & { age?: number; isActive?: boolean },
  ];

  expectTypeOf<Result>().toEqualTypeOf<Expected>();
});

test("should infer the correct argument type when required is empty", () => {
  type Schema = {
    type: "object";
    properties: {
      name: { type: "string" };
    };
    required: [];
  };

  type Result = SchemaConstructorParams<Schema>;
  type Expected = [data?: { name?: string }];

  expectTypeOf<Result>().toEqualTypeOf<Expected>();
});

test("should infer the correct argument type when required is undefined", () => {
  type Schema = {
    type: "object";
    properties: {
      name: { type: "string" };
    };
  };

  type Result = SchemaConstructorParams<Schema>;
  type Expected = [data?: { name?: string }];

  expectTypeOf<Result>().toEqualTypeOf<Expected>();
});
