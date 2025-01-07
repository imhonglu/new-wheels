import { describe, expect, test } from "vitest";
import { IdnHostname } from "../hostname/idn-hostname.js";
import { IPv4Address } from "../ip-address/ip-v4-address.js";
import { IPv6Address } from "../ip-address/ip-v6-address.js";
import { Authority } from "./authority.js";
import { InvalidAuthorityError } from "./errors/invalid-authority-error.js";

describe("Authority", () => {
	test("should parse a valid AuthorityString", () => {
		expect(Authority.parse("example.com")).toMatchObject({
			userinfo: undefined,
			host: expect.any(IdnHostname),
			port: undefined,
		});

		expect(Authority.parse("example.com").toString()).toBe("example.com");
		expect(JSON.stringify(Authority.parse("example.com"))).toBe(
			'"example.com"',
		);
	});

	test("should parse authority with userinfo", () => {
		expect(Authority.parse("user:pass@example.com")).toMatchObject({
			userinfo: "user:pass",
			host: expect.any(IdnHostname),
		});
	});

	test("should parse authority with port", () => {
		expect(Authority.parse("example.com:8080")).toMatchObject({
			host: expect.any(IdnHostname),
			port: 8080,
		});
	});

	test("should parse authority with all components", () => {
		expect(Authority.parse("user:pass@example.com:8080")).toMatchObject({
			userinfo: "user:pass",
			host: expect.any(IdnHostname),
			port: 8080,
		});
	});

	test("should parse authority with IPv4 address", () => {
		expect(Authority.parse("127.0.0.1:8080")).toMatchObject({
			host: expect.any(IPv4Address),
			port: 8080,
		});
	});

	test("should parse authority with IPv6 address", () => {
		expect(Authority.parse("[::1]")).toMatchObject({
			host: expect.any(IPv6Address),
			port: undefined,
		});

		expect(Authority.parse("[::1]:8080")).toMatchObject({
			host: expect.any(IPv6Address),
			port: 8080,
		});
	});

	test("should throw error for invalid authority strings", () => {
		expect(() => Authority.parse("")).toThrow(InvalidAuthorityError);
		expect(() => Authority.parse("@@example.com")).toThrow(
			InvalidAuthorityError,
		);
		expect(() => Authority.parse("example.com:")).toThrow(
			InvalidAuthorityError,
		);
		expect(() => Authority.parse("example.com:abc")).toThrow(
			InvalidAuthorityError,
		);
		expect(() => Authority.parse("example.com:8080:8081")).toThrow(
			InvalidAuthorityError,
		);
		expect(() => Authority.parse(":8081")).toThrow(InvalidAuthorityError);
	});
});
