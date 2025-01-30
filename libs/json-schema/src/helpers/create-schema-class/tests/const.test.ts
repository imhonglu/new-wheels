import { expect, expectTypeOf, test } from "vitest";
import { createSchemaClass } from "../create-schema-class.js";

test("should correctly infer string literal type", () => {
  class Hello extends createSchemaClass({
    const: "hello",
  }) {}

  expect(new Hello("hello").data).toEqual("hello");
  expect(Hello.parse("hello").data).toEqual("hello");
  expect(JSON.stringify(Hello.parse("hello"))).toBe('"hello"');

  expectTypeOf(new Hello("hello")).toEqualTypeOf<{
    data: "hello";
  }>();
  expectTypeOf(new Hello("hello")).toEqualTypeOf<Hello>();
  expectTypeOf<Hello>().toEqualTypeOf<{
    data: "hello";
  }>();

  expect(() => Hello.parse(1)).toThrow();
});

test("should correctly infer number literal type", () => {
  class FortyTwo extends createSchemaClass({
    const: 42 as const,
  }) {}

  expect(new FortyTwo(42).data).toEqual(42);
  expect(FortyTwo.parse(42).data).toEqual(42);

  expectTypeOf(new FortyTwo(42)).toEqualTypeOf<{
    data: 42;
  }>();
  expectTypeOf(new FortyTwo(42)).toEqualTypeOf<FortyTwo>();
  expectTypeOf<FortyTwo>().toEqualTypeOf<{
    data: 42;
  }>();

  expect(() => FortyTwo.parse(1)).toThrow();
});

test("should correctly infer object literal type", () => {
  class John extends createSchemaClass({
    const: { name: "John", age: 30 },
  }) {}

  expect(new John({ name: "John", age: 30 }).data).toEqual({
    name: "John",
    age: 30,
  });
  expect(John.parse({ name: "John", age: 30 }).data).toEqual({
    name: "John",
    age: 30,
  });

  expectTypeOf(new John({ name: "John", age: 30 })).toEqualTypeOf<{
    data: {
      readonly name: "John";
      readonly age: 30;
    };
  }>();
  expectTypeOf(new John({ name: "John", age: 30 })).toEqualTypeOf<John>();
  expectTypeOf<John>().toEqualTypeOf<{
    data: {
      readonly name: "John";
      readonly age: 30;
    };
  }>();
});
