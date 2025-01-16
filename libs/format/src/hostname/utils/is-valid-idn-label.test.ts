import { expect, test } from "vitest";
import { isValidIdnLabel } from "./is-valid-idn-label.js";

test("should return true for valid IDN label", () => {
  expect(isValidIdnLabel("한국.com")).toBe(true);
});

test("should return false for invalid IDN label", () => {
  expect(isValidIdnLabel("example.com\u00b7")).toBe(false);
});
