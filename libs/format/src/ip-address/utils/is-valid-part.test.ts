import { expect, test } from "vitest";
import { isValidIPv4Part, isValidIPv6Part } from "./is-valid-part.js";

test("should return true for valid IPv4 parts", () => {
	expect(isValidIPv4Part("0")).toBe(true);
	expect(isValidIPv4Part("1")).toBe(true);
	expect(isValidIPv4Part("255")).toBe(true);
});

test("should return false for invalid IPv4 parts", () => {
	expect(isValidIPv4Part("256")).toBe(false);
	expect(isValidIPv4Part("01")).toBe(false);
	expect(isValidIPv4Part("000")).toBe(false);
	expect(isValidIPv4Part("16৪")).toBe(false);
});

test("should return true for valid IPv6 parts", () => {
	expect(isValidIPv6Part("0")).toBe(true);
	expect(isValidIPv6Part("FFFF")).toBe(true);
	expect(isValidIPv6Part("2001")).toBe(true);
});

test("should return false for invalid IPv6 parts", () => {
	expect(isValidIPv6Part("10000")).toBe(false);
	expect(isValidIPv6Part("000৪")).toBe(false);
	expect(isValidIPv6Part("000g")).toBe(false);
});
