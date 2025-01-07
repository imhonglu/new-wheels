import { describe, expect, test } from "vitest";
import { isUsableIPv4Address } from "./is-usable-ip-v4-address.js";

describe("isUsableIPv4Address", () => {
	test("should return true for a valid host address within the subnet", () => {
		expect(isUsableIPv4Address("192.168.0.1", 24)).toBe(true);
	});

	test("should return false for a network address within the subnet", () => {
		expect(isUsableIPv4Address("192.168.0.0", 24)).toBe(false);
	});

	test("should return false for a broadcast address within the subnet", () => {
		expect(isUsableIPv4Address("192.168.0.255", 24)).toBe(false);
	});
});
