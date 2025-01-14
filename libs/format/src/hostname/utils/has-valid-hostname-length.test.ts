import { expect, test } from "vitest";
import { hasValidHostnameLength } from "./has-valid-hostname-length.js";

test("should return true for valid hostname lengths", () => {
	expect(hasValidHostnameLength("example.com")).toBe(true);
	expect(hasValidHostnameLength("a")).toBe(true);
	expect(hasValidHostnameLength("a".repeat(255))).toBe(true);
});

test("should return false for invalid hostname lengths", () => {
	expect(hasValidHostnameLength("")).toBe(false);
	expect(hasValidHostnameLength("a".repeat(256))).toBe(false);
});
