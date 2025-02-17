import { expectTypeOf, test } from "vitest";
import type { InferPropertyKeyWithDefault } from "./infer-property-key-with-default.js";

test("should return the key of the property with a single default value", () => {
  expectTypeOf<
    InferPropertyKeyWithDefault<{
      type: "object";
      properties: {
        name: { default: "John" };
      };
      required: ["name"];
    }>
  >().toEqualTypeOf<"name">();
});

test("should return the key of the property with a multiple default values", () => {
  expectTypeOf<
    InferPropertyKeyWithDefault<{
      type: "object";
      properties: {
        name: { default: "John" };
        age: { default: 30 };
      };
      required: ["name", "age"];
    }>
  >().toEqualTypeOf<"name" | "age">();
});

test("should return never if there are no required properties", () => {
  expectTypeOf<
    InferPropertyKeyWithDefault<{
      type: "object";
      properties: { name: { default: "John" } };
    }>
  >().toEqualTypeOf<never>();
});

test("should return never if there are no properties", () => {
  expectTypeOf<InferPropertyKeyWithDefault<{}>>().toEqualTypeOf<never>();
});

test("should return never if there are no properties with a default value", () => {
  expectTypeOf<
    InferPropertyKeyWithDefault<{
      properties: { name: { type: "string" } };
    }>
  >().toEqualTypeOf<never>();
});
