import { expectTypeOf, test } from "vitest";
import type { Mutable } from "./mutable.js";

test("should make all properties of the type mutable", () => {
  const person = {
    name: "John",
    age: 20,
  } as const;

  expectTypeOf<typeof person>().toEqualTypeOf<{
    readonly name: "John";
    readonly age: 20;
  }>();

  expectTypeOf<Mutable<typeof person>>().toEqualTypeOf<{
    name: "John";
    age: 20;
  }>();

  const nestedPerson = {
    info: {
      name: "John",
      age: 20,
    },
    contacts: ["email@test.com"] as const,
  } as const;

  expectTypeOf<Mutable<typeof nestedPerson>>().toEqualTypeOf<{
    info: {
      name: "John";
      age: 20;
    };
    contacts: ["email@test.com"];
  }>();
});
