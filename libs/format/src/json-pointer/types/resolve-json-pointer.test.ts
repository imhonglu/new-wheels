import { expectTypeOf, test } from "vitest";
import type {
  ResolveJsonPointer,
  SplitJsonPointer,
  UnescapeSegment,
} from "./resolve-json-pointer.js";

interface TestObject {
  string: string;
  number: number;
  boolean: boolean;
  null: null;
  object: {
    nested: string;
    "special/key": string;
    "special~key": string;
  };
  array: Array<{
    id: number;
    value: string;
  }>;
  "special/property": string;
  "special~property": string;
  date: Date;
}

test("should unescape tilde sequences correctly", () => {
  expectTypeOf<UnescapeSegment<"~1">>().toEqualTypeOf<"/">();
  expectTypeOf<UnescapeSegment<"~0">>().toEqualTypeOf<"~">();
  expectTypeOf<UnescapeSegment<"a~1b">>().toEqualTypeOf<"a/b">();
  expectTypeOf<UnescapeSegment<"a~0b">>().toEqualTypeOf<"a~b">();
  expectTypeOf<UnescapeSegment<"~0~1">>().toEqualTypeOf<"~/">();
  expectTypeOf<UnescapeSegment<"a~1b~0c">>().toEqualTypeOf<"a/b~c">();
  expectTypeOf<UnescapeSegment<"normal">>().toEqualTypeOf<"normal">();
});

test("should split JSON Pointer paths correctly", () => {
  expectTypeOf<SplitJsonPointer<"a">>().toEqualTypeOf<["a"]>();
  expectTypeOf<SplitJsonPointer<"a/b">>().toEqualTypeOf<["a", "b"]>();
  expectTypeOf<SplitJsonPointer<"a~1b/c">>().toEqualTypeOf<["a/b", "c"]>();
  expectTypeOf<SplitJsonPointer<"a/b~0c">>().toEqualTypeOf<["a", "b~c"]>();
});

test("should resolve basic property types", () => {
  expectTypeOf<
    ResolveJsonPointer<TestObject, "/string">
  >().toEqualTypeOf<string>();
  expectTypeOf<
    ResolveJsonPointer<TestObject, "/number">
  >().toEqualTypeOf<number>();
  expectTypeOf<
    ResolveJsonPointer<TestObject, "/boolean">
  >().toEqualTypeOf<boolean>();
  expectTypeOf<ResolveJsonPointer<TestObject, "/null">>().toEqualTypeOf<null>();
  expectTypeOf<ResolveJsonPointer<TestObject, "/date">>().toEqualTypeOf<Date>();
});

test("should resolve nested object properties", () => {
  expectTypeOf<
    ResolveJsonPointer<TestObject, "/object/nested">
  >().toEqualTypeOf<string>();
  expectTypeOf<
    ResolveJsonPointer<TestObject, "/object/special~1key">
  >().toEqualTypeOf<string>();
  expectTypeOf<
    ResolveJsonPointer<TestObject, "/object/special~0key">
  >().toEqualTypeOf<string>();
});

test("should resolve array indices and their properties", () => {
  expectTypeOf<ResolveJsonPointer<TestObject, "/array/0">>().toEqualTypeOf<{
    id: number;
    value: string;
  }>();
  expectTypeOf<
    ResolveJsonPointer<TestObject, "/array/0/id">
  >().toEqualTypeOf<number>();
  expectTypeOf<
    ResolveJsonPointer<TestObject, "/array/0/value">
  >().toEqualTypeOf<string>();
});

test("should resolve properties with special characters", () => {
  expectTypeOf<
    ResolveJsonPointer<TestObject, "/special~1property">
  >().toEqualTypeOf<string>();
  expectTypeOf<
    ResolveJsonPointer<TestObject, "/special~0property">
  >().toEqualTypeOf<string>();
});

test("should return never for invalid paths", () => {
  // @ts-expect-error
  expectTypeOf<ResolveJsonPointer<TestObject, "/invalid">>().toBeNever();
  // @ts-expect-error
  expectTypeOf<ResolveJsonPointer<TestObject, "/array/invalid">>().toBeNever();
  // @ts-expect-error
  expectTypeOf<ResolveJsonPointer<TestObject, "/object/invalid">>().toBeNever();
});

test("should return full object for empty pointer", () => {
  expectTypeOf<ResolveJsonPointer<TestObject>>().toEqualTypeOf<TestObject>();
});
