import { expectTypeOf, test } from "vitest";
import type { Properties } from "./properties.js";

test("should extract all properties when no options are provided", () => {
  type Schema = {
    type: "object";
    properties: {
      name: { type: "string" };
      email: { type: "string" };
    };
    required: ["name", "email"];
  };

  type Result = Properties<Schema>;
  type Expected = {
    name: {
      type: "string";
    };
    email: {
      type: "string";
    };
  };

  expectTypeOf<Result>().toEqualTypeOf<Expected>();
});

test("should extract only properties with default values when hasDefault is true", () => {
  type Schema = {
    type: "object";
    properties: {
      name: { type: "string" };
      age: { type: "number"; default: 0 };
      email: { type: "string" };
    };
    required: ["name", "email"];
  };

  type Result = Properties<Schema, { hasDefault: true }>;
  type Expected = {
    age: {
      type: "number";
      default: 0;
    };
  };

  expectTypeOf<Result>().toEqualTypeOf<Expected>();
});

test("should extract all properties with default values regardless of required status", () => {
  type Schema = {
    type: "object";
    properties: {
      name: { type: "string"; default: "" };
      age: { type: "number"; default: 0 };
      email: { type: "string" };
    };
    required: ["name", "email"];
  };

  type Result = Properties<Schema, { hasDefault: true }>;
  type Expected = {
    name: {
      type: "string";
      default: "";
    };
    age: {
      type: "number";
      default: 0;
    };
  };

  expectTypeOf<Result>().toEqualTypeOf<Expected>();
});

test("should extract only required properties that have default values when both options are true", () => {
  type Schema = {
    type: "object";
    properties: {
      name: { type: "string"; default: "" };
      age: { type: "number"; default: 0 };
      email: { type: "string" };
    };
    required: ["name", "email"];
  };

  type Result = Properties<Schema, { hasDefault: true; required: true }>;
  type Expected = {
    name: {
      type: "string";
      default: "";
    };
  };

  expectTypeOf<Result>().toEqualTypeOf<Expected>();
});
