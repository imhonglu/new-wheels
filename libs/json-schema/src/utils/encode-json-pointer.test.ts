import { expect, test } from "vitest";
import { encodeJsonPointer } from "./encode-json-pointer.js";

test("should encode JSON pointer", () => {
  expect(encodeJsonPointer("foo")).toBe("foo");
  expect(encodeJsonPointer("foo/bar")).toBe("foo~1bar");

  expect(encodeJsonPointer("foo~bar")).toBe("foo~0bar");
  expect(encodeJsonPointer("foo/bar")).toBe("foo~1bar");
  expect(encodeJsonPointer("foo%bar")).toBe("foo%25bar");

  expect(encodeJsonPointer("한글")).toBe("%ED%95%9C%EA%B8%80");
  expect(encodeJsonPointer("foo bar")).toBe("foo%20bar");
  expect(encodeJsonPointer("foo+bar")).toBe("foo+bar");

  expect(encodeJsonPointer("foo/~bar 한글")).toBe(
    "foo~1~0bar%20%ED%95%9C%EA%B8%80",
  );
});
