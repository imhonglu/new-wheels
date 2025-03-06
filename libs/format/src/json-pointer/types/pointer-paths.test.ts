import { expectTypeOf, it } from "vitest";
import type { PointerPaths } from "./pointer-paths.js";

interface TestObject {
  string: string;
  number: number;
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
}

it("should generate all possible JSON Pointer paths", () => {
  type Paths = PointerPaths<TestObject>;
  expectTypeOf<Paths>().toEqualTypeOf<
    | ""
    | "/string"
    | "/number"
    | "/object"
    | "/object/nested"
    | "/object/special~1key"
    | "/object/special~0key"
    | "/array"
    | `/array/${number}`
    | `/array/${number}/id`
    | `/array/${number}/value`
    | "/special~1property"
    | "/special~0property"
  >();
});

it("should handle simple objects", () => {
  type Simple = {
    a: string;
    b: number;
  };

  type SimplePaths = PointerPaths<Simple>;
  expectTypeOf<SimplePaths>().toEqualTypeOf<"" | "/a" | "/b">();
});

it("should handle arrays", () => {
  type WithArray = {
    items: string[];
  };

  type ArrayPaths = PointerPaths<WithArray>;
  expectTypeOf<ArrayPaths>().toEqualTypeOf<
    "" | "/items" | `/items/${number}`
  >();
});

it("should handle nested arrays", () => {
  interface NestedArray {
    items: Array<{
      id: number;
      subItems: string[];
    }>;
  }

  type ArrayPaths = PointerPaths<NestedArray>;
  expectTypeOf<ArrayPaths>().toEqualTypeOf<
    | ""
    | "/items"
    | `/items/${number}`
    | `/items/${number}/id`
    | `/items/${number}/subItems`
    | `/items/${number}/subItems/${number}`
  >();
});

it("should handle objects with special characters", () => {
  interface SpecialChars {
    "a/b": string;
    "c~d": number;
    "e/f~g": {
      "h~i/j": string;
    };
  }

  type SpecialPaths = PointerPaths<SpecialChars>;
  expectTypeOf<SpecialPaths>().toEqualTypeOf<
    "" | "/a~1b" | "/c~0d" | "/e~1f~0g" | "/e~1f~0g/h~0i~1j"
  >();
});
