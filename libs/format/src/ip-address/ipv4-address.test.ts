import { expect, test } from "vitest";
import { InvalidIpAddressError } from "./errors/invalid-ip-address-error.js";
import { IPv4Address } from "./ipv4-address.js";

test("should parse a valid IPAddress string", () => {
	expect(IPv4Address.parse("192.168.2.1")).toMatchObject({
		segments: ["192", "168", "2", "1"],
	});

	expect(IPv4Address.parse("192.168.2.1").toString()).toBe("192.168.2.1");

	expect(JSON.stringify(IPv4Address.parse("192.168.2.1"))).toBe(
		'"192.168.2.1"',
	);
});

test("should throw an error if the IP address is invalid", () => {
	expect(() => IPv4Address.parse("192.168.2.1.1")).toThrow(
		InvalidIpAddressError,
	);
});

test("should return false for an IPv4 address with leading zeros", () => {
	expect(() => IPv4Address.parse("087.10.0.1")).toThrow(InvalidIpAddressError);
});

test("should return false for an invalid IPv4 address with too many octets", () => {
	expect(() => IPv4Address.parse("192.168.0.1.1")).toThrow(
		InvalidIpAddressError,
	);
});

test("should return false for an invalid IPv4 address with non-numeric characters", () => {
	expect(() => IPv4Address.parse("192.168.0.a")).toThrow(InvalidIpAddressError);
});

test("should return false for an invalid IPv4 address with out-of-range octets", () => {
	expect(() => IPv4Address.parse("256.256.256.256")).toThrow(
		InvalidIpAddressError,
	);
	expect(() => IPv4Address.parse("192.168.0.256")).toThrow(
		InvalidIpAddressError,
	);
});
