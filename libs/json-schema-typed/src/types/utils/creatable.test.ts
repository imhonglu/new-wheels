import { expectTypeOf, test } from "vitest";
import type { Creatable } from "./creatable.js";

test("should make fields optional when they have default values even if required", () => {
  type Schema = {
    type: "object";
    properties: {
      name: { type: "string" };
      age: { type: "number"; default: 20 };
      isActive: { type: "boolean"; default: true };
    };
    required: ["name", "age", "isActive"];
  };

  type Result = Creatable<Schema>;
  type Expected = {
    name: string;
  } & {
    age?: number;
    isActive?: boolean;
  };

  expectTypeOf<Result>().toEqualTypeOf<Expected>();
});

test("should make fields mandatory when required and have no default values", () => {
  type Schema = {
    type: "object";
    properties: {
      name: { type: "string" };
      age: { type: "number" };
      isActive: { type: "boolean"; default: true };
    };
    required: ["name", "age"];
  };

  type Result = Creatable<Schema>;
  type Expected = {
    name: string;
    age: number;
  } & {
    isActive?: boolean;
  };

  expectTypeOf<Result>().toEqualTypeOf<Expected>();
});

test("should handle default values and required correctly in nested objects", () => {
  type Schema = {
    type: "object";
    properties: {
      user: {
        type: "object";
        properties: {
          name: { type: "string" };
          settings: {
            type: "object";
            properties: {
              theme: { type: "string"; default: "light" };
              notifications: { type: "boolean" };
            };
            required: ["notifications"];
          };
        };
        required: ["name", "settings"];
      };
    };
    required: ["user"];
  };

  type Result = Creatable<Schema>;
  type Expected = {
    user: {
      name: string;
      settings: {
        notifications: boolean;
      } & {
        theme?: string;
      };
    };
  };

  expectTypeOf<Result>().toEqualTypeOf<Expected>();
});

test("should make all fields optional when required array is missing", () => {
  type Schema = {
    type: "object";
    properties: {
      name: { type: "string" };
      age: { type: "number"; default: 20 };
      isActive: { type: "boolean" };
    };
  };

  type Result = Creatable<Schema>;
  type Expected = {
    name?: string;
    age?: number;
    isActive?: boolean;
  };

  expectTypeOf<Result>().toEqualTypeOf<Expected>();
});

test("should make all fields optional when required array is empty", () => {
  type Schema = {
    type: "object";
    properties: {
      name: { type: "string" };
      age: { type: "number"; default: 20 };
      isActive: { type: "boolean" };
    };
    required: [];
  };

  type Result = Creatable<Schema>;
  type Expected = {
    name?: string;
    age?: number;
    isActive?: boolean;
  };

  expectTypeOf<Result>().toEqualTypeOf<Expected>();
});

test("should make all fields optional when all fields have default values", () => {
  type Schema = {
    type: "object";
    properties: {
      name: { type: "string"; default: "John" };
      age: { type: "number"; default: 20 };
      isActive: { type: "boolean"; default: true };
    };
    required: ["name", "age", "isActive"];
  };

  type Result = Creatable<Schema>;
  type Expected = {
    name?: string;
    age?: number;
    isActive?: boolean;
  };

  expectTypeOf<Result>().toEqualTypeOf<Expected>();
});
