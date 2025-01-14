import { faker } from "@faker-js/faker";
import { expect, test } from "vitest";
import { isValidLabel } from "./is-valid-label.js";

test("should return true for valid labels", () => {
	expect(isValidLabel("valid")).toBe(true);
	expect(isValidLabel("valid123")).toBe(true);
	expect(isValidLabel("valid-label")).toBe(true);
	expect(isValidLabel("valid--label")).toBe(true);
	expect(isValidLabel("0123")).toBe(true);
});

test("should return false for empty string", () => {
	expect(isValidLabel("")).toBe(false);
});

test("should return false for labels longer than 63 characters", () => {
	expect(isValidLabel(faker.string.alphanumeric(64))).toBe(false);
});

test("should return false for labels starting or ending with hyphen", () => {
	expect(isValidLabel("-invalid")).toBe(false);
	expect(isValidLabel("invalid-")).toBe(false);
});

test("should return false for labels containing invalid characters", () => {
	expect(isValidLabel("invalid@")).toBe(false);
	expect(isValidLabel("invalid@")).toBe(false);
	expect(isValidLabel("invalid_label")).toBe(false);
	expect(isValidLabel("invalid space")).toBe(false);
});
