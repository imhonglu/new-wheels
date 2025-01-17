import { expect, test } from "vitest";
import { hasValidLocalPartLength } from "./has-valid-local-part-length.js";

test("hasValidLocalPartLength", () => {
  expect(hasValidLocalPartLength("user")).toBe(true);
  expect(hasValidLocalPartLength("a")).toBe(true);

  expect(hasValidLocalPartLength("")).toBe(false);

  expect(hasValidLocalPartLength("a".repeat(65))).toBe(false);
});
