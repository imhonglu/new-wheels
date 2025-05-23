/* This file is automatically generated. Do not edit this file. */
import { describe, expect, test } from "vitest";
import { Schema } from "../schema.js";
describe("uniqueItems validation", () => {
  const schema = {
    $schema: "https://json-schema.org/draft/2020-12/schema",
    uniqueItems: true,
  };
  test("unique array of integers is valid", () => {
    const instance = new Schema(schema);
    expect(instance.validate([1, 2])).toBeTruthy();
  });
  test("non-unique array of integers is invalid", () => {
    const instance = new Schema(schema);
    expect(instance.validate([1, 1])).toBeFalsy();
  });
  test("non-unique array of more than two integers is invalid", () => {
    const instance = new Schema(schema);
    expect(instance.validate([1, 2, 1])).toBeFalsy();
  });
  test("numbers are unique if mathematically unequal", () => {
    const instance = new Schema(schema);
    expect(instance.validate([1, 1, 1])).toBeFalsy();
  });
  test("false is not equal to zero", () => {
    const instance = new Schema(schema);
    expect(instance.validate([0, false])).toBeTruthy();
  });
  test("true is not equal to one", () => {
    const instance = new Schema(schema);
    expect(instance.validate([1, true])).toBeTruthy();
  });
  test("unique array of strings is valid", () => {
    const instance = new Schema(schema);
    expect(instance.validate(["foo", "bar", "baz"])).toBeTruthy();
  });
  test("non-unique array of strings is invalid", () => {
    const instance = new Schema(schema);
    expect(instance.validate(["foo", "bar", "foo"])).toBeFalsy();
  });
  test("unique array of objects is valid", () => {
    const instance = new Schema(schema);
    expect(instance.validate([{ foo: "bar" }, { foo: "baz" }])).toBeTruthy();
  });
  test("non-unique array of objects is invalid", () => {
    const instance = new Schema(schema);
    expect(instance.validate([{ foo: "bar" }, { foo: "bar" }])).toBeFalsy();
  });
  test("property order of array of objects is ignored", () => {
    const instance = new Schema(schema);
    expect(
      instance.validate([
        { foo: "bar", bar: "foo" },
        { bar: "foo", foo: "bar" },
      ]),
    ).toBeFalsy();
  });
  test("unique array of nested objects is valid", () => {
    const instance = new Schema(schema);
    expect(
      instance.validate([
        { foo: { bar: { baz: true } } },
        { foo: { bar: { baz: false } } },
      ]),
    ).toBeTruthy();
  });
  test("non-unique array of nested objects is invalid", () => {
    const instance = new Schema(schema);
    expect(
      instance.validate([
        { foo: { bar: { baz: true } } },
        { foo: { bar: { baz: true } } },
      ]),
    ).toBeFalsy();
  });
  test("unique array of arrays is valid", () => {
    const instance = new Schema(schema);
    expect(instance.validate([["foo"], ["bar"]])).toBeTruthy();
  });
  test("non-unique array of arrays is invalid", () => {
    const instance = new Schema(schema);
    expect(instance.validate([["foo"], ["foo"]])).toBeFalsy();
  });
  test("non-unique array of more than two arrays is invalid", () => {
    const instance = new Schema(schema);
    expect(instance.validate([["foo"], ["bar"], ["foo"]])).toBeFalsy();
  });
  test("1 and true are unique", () => {
    const instance = new Schema(schema);
    expect(instance.validate([1, true])).toBeTruthy();
  });
  test("0 and false are unique", () => {
    const instance = new Schema(schema);
    expect(instance.validate([0, false])).toBeTruthy();
  });
  test("[1] and [true] are unique", () => {
    const instance = new Schema(schema);
    expect(instance.validate([[1], [true]])).toBeTruthy();
  });
  test("[0] and [false] are unique", () => {
    const instance = new Schema(schema);
    expect(instance.validate([[0], [false]])).toBeTruthy();
  });
  test("nested [1] and [true] are unique", () => {
    const instance = new Schema(schema);
    expect(
      instance.validate([
        [[1], "foo"],
        [[true], "foo"],
      ]),
    ).toBeTruthy();
  });
  test("nested [0] and [false] are unique", () => {
    const instance = new Schema(schema);
    expect(
      instance.validate([
        [[0], "foo"],
        [[false], "foo"],
      ]),
    ).toBeTruthy();
  });
  test("unique heterogeneous types are valid", () => {
    const instance = new Schema(schema);
    expect(instance.validate([{}, [1], true, null, 1, "{}"])).toBeTruthy();
  });
  test("non-unique heterogeneous types are invalid", () => {
    const instance = new Schema(schema);
    expect(instance.validate([{}, [1], true, null, {}, 1])).toBeFalsy();
  });
  test("different objects are unique", () => {
    const instance = new Schema(schema);
    expect(
      instance.validate([
        { a: 1, b: 2 },
        { a: 2, b: 1 },
      ]),
    ).toBeTruthy();
  });
  test("objects are non-unique despite key order", () => {
    const instance = new Schema(schema);
    expect(
      instance.validate([
        { a: 1, b: 2 },
        { b: 2, a: 1 },
      ]),
    ).toBeFalsy();
  });
  test('{"a": false} and {"a": 0} are unique', () => {
    const instance = new Schema(schema);
    expect(instance.validate([{ a: false }, { a: 0 }])).toBeTruthy();
  });
  test('{"a": true} and {"a": 1} are unique', () => {
    const instance = new Schema(schema);
    expect(instance.validate([{ a: true }, { a: 1 }])).toBeTruthy();
  });
});
describe("uniqueItems with an array of items", () => {
  const schema = {
    $schema: "https://json-schema.org/draft/2020-12/schema",
    prefixItems: [{ type: "boolean" }, { type: "boolean" }],
    uniqueItems: true,
  };
  test("[false, true] from items array is valid", () => {
    const instance = new Schema(schema);
    expect(instance.validate([false, true])).toBeTruthy();
  });
  test("[true, false] from items array is valid", () => {
    const instance = new Schema(schema);
    expect(instance.validate([true, false])).toBeTruthy();
  });
  test("[false, false] from items array is not valid", () => {
    const instance = new Schema(schema);
    expect(instance.validate([false, false])).toBeFalsy();
  });
  test("[true, true] from items array is not valid", () => {
    const instance = new Schema(schema);
    expect(instance.validate([true, true])).toBeFalsy();
  });
  test("unique array extended from [false, true] is valid", () => {
    const instance = new Schema(schema);
    expect(instance.validate([false, true, "foo", "bar"])).toBeTruthy();
  });
  test("unique array extended from [true, false] is valid", () => {
    const instance = new Schema(schema);
    expect(instance.validate([true, false, "foo", "bar"])).toBeTruthy();
  });
  test("non-unique array extended from [false, true] is not valid", () => {
    const instance = new Schema(schema);
    expect(instance.validate([false, true, "foo", "foo"])).toBeFalsy();
  });
  test("non-unique array extended from [true, false] is not valid", () => {
    const instance = new Schema(schema);
    expect(instance.validate([true, false, "foo", "foo"])).toBeFalsy();
  });
});
describe("uniqueItems with an array of items and additionalItems=false", () => {
  const schema = {
    $schema: "https://json-schema.org/draft/2020-12/schema",
    prefixItems: [{ type: "boolean" }, { type: "boolean" }],
    uniqueItems: true,
    items: false,
  };
  test("[false, true] from items array is valid", () => {
    const instance = new Schema(schema);
    expect(instance.validate([false, true])).toBeTruthy();
  });
  test("[true, false] from items array is valid", () => {
    const instance = new Schema(schema);
    expect(instance.validate([true, false])).toBeTruthy();
  });
  test("[false, false] from items array is not valid", () => {
    const instance = new Schema(schema);
    expect(instance.validate([false, false])).toBeFalsy();
  });
  test("[true, true] from items array is not valid", () => {
    const instance = new Schema(schema);
    expect(instance.validate([true, true])).toBeFalsy();
  });
  test("extra items are invalid even if unique", () => {
    const instance = new Schema(schema);
    expect(instance.validate([false, true, null])).toBeFalsy();
  });
});
describe("uniqueItems=false validation", () => {
  const schema = {
    $schema: "https://json-schema.org/draft/2020-12/schema",
    uniqueItems: false,
  };
  test("unique array of integers is valid", () => {
    const instance = new Schema(schema);
    expect(instance.validate([1, 2])).toBeTruthy();
  });
  test("non-unique array of integers is valid", () => {
    const instance = new Schema(schema);
    expect(instance.validate([1, 1])).toBeTruthy();
  });
  test("numbers are unique if mathematically unequal", () => {
    const instance = new Schema(schema);
    expect(instance.validate([1, 1, 1])).toBeTruthy();
  });
  test("false is not equal to zero", () => {
    const instance = new Schema(schema);
    expect(instance.validate([0, false])).toBeTruthy();
  });
  test("true is not equal to one", () => {
    const instance = new Schema(schema);
    expect(instance.validate([1, true])).toBeTruthy();
  });
  test("unique array of objects is valid", () => {
    const instance = new Schema(schema);
    expect(instance.validate([{ foo: "bar" }, { foo: "baz" }])).toBeTruthy();
  });
  test("non-unique array of objects is valid", () => {
    const instance = new Schema(schema);
    expect(instance.validate([{ foo: "bar" }, { foo: "bar" }])).toBeTruthy();
  });
  test("unique array of nested objects is valid", () => {
    const instance = new Schema(schema);
    expect(
      instance.validate([
        { foo: { bar: { baz: true } } },
        { foo: { bar: { baz: false } } },
      ]),
    ).toBeTruthy();
  });
  test("non-unique array of nested objects is valid", () => {
    const instance = new Schema(schema);
    expect(
      instance.validate([
        { foo: { bar: { baz: true } } },
        { foo: { bar: { baz: true } } },
      ]),
    ).toBeTruthy();
  });
  test("unique array of arrays is valid", () => {
    const instance = new Schema(schema);
    expect(instance.validate([["foo"], ["bar"]])).toBeTruthy();
  });
  test("non-unique array of arrays is valid", () => {
    const instance = new Schema(schema);
    expect(instance.validate([["foo"], ["foo"]])).toBeTruthy();
  });
  test("1 and true are unique", () => {
    const instance = new Schema(schema);
    expect(instance.validate([1, true])).toBeTruthy();
  });
  test("0 and false are unique", () => {
    const instance = new Schema(schema);
    expect(instance.validate([0, false])).toBeTruthy();
  });
  test("unique heterogeneous types are valid", () => {
    const instance = new Schema(schema);
    expect(instance.validate([{}, [1], true, null, 1])).toBeTruthy();
  });
  test("non-unique heterogeneous types are valid", () => {
    const instance = new Schema(schema);
    expect(instance.validate([{}, [1], true, null, {}, 1])).toBeTruthy();
  });
});
describe("uniqueItems=false with an array of items", () => {
  const schema = {
    $schema: "https://json-schema.org/draft/2020-12/schema",
    prefixItems: [{ type: "boolean" }, { type: "boolean" }],
    uniqueItems: false,
  };
  test("[false, true] from items array is valid", () => {
    const instance = new Schema(schema);
    expect(instance.validate([false, true])).toBeTruthy();
  });
  test("[true, false] from items array is valid", () => {
    const instance = new Schema(schema);
    expect(instance.validate([true, false])).toBeTruthy();
  });
  test("[false, false] from items array is valid", () => {
    const instance = new Schema(schema);
    expect(instance.validate([false, false])).toBeTruthy();
  });
  test("[true, true] from items array is valid", () => {
    const instance = new Schema(schema);
    expect(instance.validate([true, true])).toBeTruthy();
  });
  test("unique array extended from [false, true] is valid", () => {
    const instance = new Schema(schema);
    expect(instance.validate([false, true, "foo", "bar"])).toBeTruthy();
  });
  test("unique array extended from [true, false] is valid", () => {
    const instance = new Schema(schema);
    expect(instance.validate([true, false, "foo", "bar"])).toBeTruthy();
  });
  test("non-unique array extended from [false, true] is valid", () => {
    const instance = new Schema(schema);
    expect(instance.validate([false, true, "foo", "foo"])).toBeTruthy();
  });
  test("non-unique array extended from [true, false] is valid", () => {
    const instance = new Schema(schema);
    expect(instance.validate([true, false, "foo", "foo"])).toBeTruthy();
  });
});
describe("uniqueItems=false with an array of items and additionalItems=false", () => {
  const schema = {
    $schema: "https://json-schema.org/draft/2020-12/schema",
    prefixItems: [{ type: "boolean" }, { type: "boolean" }],
    uniqueItems: false,
    items: false,
  };
  test("[false, true] from items array is valid", () => {
    const instance = new Schema(schema);
    expect(instance.validate([false, true])).toBeTruthy();
  });
  test("[true, false] from items array is valid", () => {
    const instance = new Schema(schema);
    expect(instance.validate([true, false])).toBeTruthy();
  });
  test("[false, false] from items array is valid", () => {
    const instance = new Schema(schema);
    expect(instance.validate([false, false])).toBeTruthy();
  });
  test("[true, true] from items array is valid", () => {
    const instance = new Schema(schema);
    expect(instance.validate([true, true])).toBeTruthy();
  });
  test("extra items are invalid even if unique", () => {
    const instance = new Schema(schema);
    expect(instance.validate([false, true, null])).toBeFalsy();
  });
});
