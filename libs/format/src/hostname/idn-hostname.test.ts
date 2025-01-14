import { expect, test } from "vitest";
import { InvalidIdnHostnameError } from "./errors/invalid-idn-hostname-error.js";
import { IdnHostname } from "./idn-hostname.js";

test("should parse a valid IDN Hostname string (with TLD)", () => {
	expect(IdnHostname.parse("한국.com")).toMatchObject({
		unicode: {
			labels: ["한국", "com"],
			tld: ".com",
		},
		ascii: {
			labels: ["xn--3e0b707e", "com"],
			tld: ".com",
		},
	});
	expect(IdnHostname.parse("한국.com").toString()).toBe("xn--3e0b707e.com");
	expect(JSON.stringify(IdnHostname.parse("한국.com"))).toBe(
		'"xn--3e0b707e.com"',
	);
});

test("should parse a valid host name (example.test in Hangul)", () => {
	expect(IdnHostname.parse("실례.테스트")).toMatchObject({
		unicode: {
			labels: ["실례", "테스트"],
			tld: ".테스트",
		},
		ascii: {
			labels: ["xn--9n2bp8q", "xn--9t4b11yi5a"],
			tld: ".xn--9t4b11yi5a",
		},
	});
	expect(IdnHostname.parse("실례.테스트").toString()).toBe(
		"xn--9n2bp8q.xn--9t4b11yi5a",
	);
});

test("should not parse illegal first char U+302E Hangul single dot tone mark", () => {
	expect(() => IdnHostname.parse("〮실례.테스트")).toThrow(
		InvalidIdnHostnameError,
	);
});

test("should not parse contains illegal char U+302E Hangul single dot tone mark", () => {
	expect(() => IdnHostname.parse("실〮례.테스트")).toThrow(
		InvalidIdnHostnameError,
	);
});

test("should not parse a host name with a component too long", () => {
	expect(() =>
		IdnHostname.parse(
			"실실실실실실실실실실실실실실실실실실실실실실실실실실실실실실실실실실실실실실실실실실실실실실실실실실실실례례테스트례례례례례례례례례례례례례례례례례테스트례례례례례례례례례례례례례례례례례례례테스트례례례례례례례례례례례례테스트례례실례",
		),
	).toThrow(InvalidIdnHostnameError);
});

test("should not parse invalid label, correct Punycode", () => {
	expect(() => IdnHostname.parse("-> $1.00 <--")).toThrow(
		InvalidIdnHostnameError,
	);
});

test("should parse valid Chinese Punycode", () => {
	expect(IdnHostname.parse("xn--ihqwcrb4cv8a8dqg056pqjye")).toMatchObject({
		unicode: {
			labels: ["他们为什么不说中文"],
			tld: undefined,
		},
		ascii: {
			labels: ["xn--ihqwcrb4cv8a8dqg056pqjye"],
			tld: undefined,
		},
	});
});

test("should not parse invalid Punycode", () => {
	expect(() => IdnHostname.parse("xn--X")).toThrow();
});

test('should not parse U-label contains "--" in the 3rd and 4th position', () => {
	expect(() => IdnHostname.parse("XN--aa---o47jg78q")).toThrow();
});

test("should not parse a host name that begins with a Spacing Combining Mark", () => {
	expect(() => IdnHostname.parse("\u0903hello")).toThrow(
		InvalidIdnHostnameError,
	);
});
