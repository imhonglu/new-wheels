import { expectTypeOf, test } from "vitest";
import type { InferSchemaType } from "./infer-schema-type.js";

test("should infer primitive types correctly", () => {
  type StringSchema = { type: "string" };
  type NumberSchema = { type: "number" };
  type BooleanSchema = { type: "boolean" };
  type NullSchema = { type: "null" };

  type StringType = InferSchemaType<StringSchema>;
  type NumberType = InferSchemaType<NumberSchema>;
  type BooleanType = InferSchemaType<BooleanSchema>;
  type NullType = InferSchemaType<NullSchema>;

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

  type ArrayType = InferSchemaType<ArraySchema>;
  expectTypeOf<ArrayType>().toEqualTypeOf<string[]>();
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

  type ObjectType = InferSchemaType<ObjectSchema>;
  type Expected = {
    name: string;
    age: number;
  } & { isActive?: boolean };

  expectTypeOf<ObjectType>().toEqualTypeOf<Expected>();
});

test("should infer const value correctly", () => {
  type ConstSchema = {
    const: "hello";
  };

  type ConstType = InferSchemaType<ConstSchema>;
  expectTypeOf<ConstType>().toEqualTypeOf<"hello">();
});

test("should infer enum values correctly", () => {
  type EnumSchema = {
    enum: ["apple", "banana", "orange"];
  };

  type EnumType = InferSchemaType<EnumSchema>;
  expectTypeOf<EnumType>().toEqualTypeOf<"apple" | "banana" | "orange">();
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

  type NestedType = InferSchemaType<NestedSchema>;
  type Expected = {
    user: {
      name: string;
    } & { scores?: number[] };
  };

  expectTypeOf<NestedType>().toEqualTypeOf<Expected>();
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

  type Result = InferSchemaType<Schema>;
  type Expected = {
    name?: string;
    age?: number;
    isActive?: boolean;
  };

  expectTypeOf<Result>().toEqualTypeOf<Expected>();
});
