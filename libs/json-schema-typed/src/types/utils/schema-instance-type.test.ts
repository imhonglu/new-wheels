import { expectTypeOf, test } from "vitest";
import type { SchemaInstanceType } from "./schema-instance-type.js";

test("should infer primitive types correctly", () => {
  type StringSchema = { type: "string" };
  type NumberSchema = { type: "number" };
  type BooleanSchema = { type: "boolean" };
  type NullSchema = { type: "null" };

  type StringType = SchemaInstanceType<StringSchema>;
  type NumberType = SchemaInstanceType<NumberSchema>;
  type BooleanType = SchemaInstanceType<BooleanSchema>;
  type NullType = SchemaInstanceType<NullSchema>;

  expectTypeOf<StringType>().toEqualTypeOf<string>();
  expectTypeOf<NumberType>().toEqualTypeOf<number>();
  expectTypeOf<BooleanType>().toEqualTypeOf<boolean>();
  expectTypeOf<NullType>().toEqualTypeOf<null>();
});

test("should infer array type correctly", () => {
  type ArraySchema = {
    type: "array";
    items: { type: "string" };
  };

  type Result = SchemaInstanceType<ArraySchema>;
  type Expected = string[];

  expectTypeOf<Result>().toEqualTypeOf<Expected>();
});

test("should infer object type with required and optional fields correctly", () => {
  type ObjectSchema = {
    type: "object";
    properties: {
      name: { type: "string" };
      age: { type: "number" };
      isActive: { type: "boolean" };
    };
    required: ["name", "age"];
  };

  type Result = SchemaInstanceType<ObjectSchema>;
  type Expected = {
    name: string;
    age: number;
  } & { isActive?: boolean };

  expectTypeOf<Result>().toEqualTypeOf<Expected>();
});

test("should infer const value correctly", () => {
  type ConstSchema = {
    const: "hello";
  };

  type Result = SchemaInstanceType<ConstSchema>;
  type Expected = "hello";

  expectTypeOf<Result>().toEqualTypeOf<Expected>();
});

test("should infer enum values correctly", () => {
  type EnumSchema = {
    enum: ["apple", "banana", "orange"];
  };

  type Result = SchemaInstanceType<EnumSchema>;
  type Expected = "apple" | "banana" | "orange";

  expectTypeOf<Result>().toEqualTypeOf<Expected>();
});

test("should infer nested schema correctly", () => {
  type NestedSchema = {
    type: "object";
    properties: {
      user: {
        type: "object";
        properties: {
          name: { type: "string" };
          scores: {
            type: "array";
            items: { type: "number" };
          };
        };
        required: ["name"];
      };
    };
    required: ["user"];
  };

  type Result = SchemaInstanceType<NestedSchema>;
  type Expected = {
    user: {
      name: string;
    } & { scores?: number[] };
  };

  expectTypeOf<Result>().toEqualTypeOf<Expected>();
});

test("should infer empty required array correctly", () => {
  type Schema = {
    type: "object";
    properties: {
      name: { type: "string" };
      age: { type: "number"; default: 20 };
      isActive: { type: "boolean" };
    };
    required: [];
  };

  type Result = SchemaInstanceType<Schema>;
  type Expected = {
    name?: string;
    age?: number;
    isActive?: boolean;
  };

  expectTypeOf<Result>().toEqualTypeOf<Expected>();
});
