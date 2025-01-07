import { describe, expect, test } from "vitest";
import { punycode } from "./punycode.js";

describe("punycode", () => {
	test("should convert Unicode to ASCII (wiki백과)", () => {
		expect(punycode.toASCII("wiki백과")).toBe("xn--wiki-ei4p334e");
	});

	test("should convert ASCII to Unicode (xn--wiki-ei4p334e)", () => {
		expect(punycode.toUnicode("xn--wiki-ei4p334e")).toBe("wiki백과");
	});

	test("should convert ASCII to Unicode (xn--3e0b707e)", () => {
		expect(punycode.toUnicode("xn--3e0b707e")).toBe("한국");
	});

	test("should convert Unicode to ASCII (한국)", () => {
		expect(punycode.toASCII("한국")).toBe("xn--3e0b707e");
	});
});
