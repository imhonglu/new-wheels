/* This file is automatically generated. Do not edit this file. */
import { describe, expect, test } from "vitest";
import { Schema } from "../schema.js";
describe("validation of internationalized host names", () => {
	const schema = {
		$schema: "https://json-schema.org/draft/2020-12/schema",
		format: "idn-hostname",
	};
	test("all string formats ignore integers", () => {
		const instance = new Schema(schema);
		expect(instance.validate(12)).toBeTruthy();
	});
	test("all string formats ignore floats", () => {
		const instance = new Schema(schema);
		expect(instance.validate(13.7)).toBeTruthy();
	});
	test("all string formats ignore objects", () => {
		const instance = new Schema(schema);
		expect(instance.validate({})).toBeTruthy();
	});
	test("all string formats ignore arrays", () => {
		const instance = new Schema(schema);
		expect(instance.validate([])).toBeTruthy();
	});
	test("all string formats ignore booleans", () => {
		const instance = new Schema(schema);
		expect(instance.validate(false)).toBeTruthy();
	});
	test("all string formats ignore nulls", () => {
		const instance = new Schema(schema);
		expect(instance.validate(null)).toBeTruthy();
	});
	test("a valid host name (example.test in Hangul)", () => {
		const instance = new Schema(schema);
		expect(instance.validate("\uC2E4\uB840.\uD14C\uC2A4\uD2B8")).toBeTruthy();
	});
	test("illegal first char U+302E Hangul single dot tone mark", () => {
		const instance = new Schema(schema);
		expect(
			instance.validate("\u302E\uC2E4\uB840.\uD14C\uC2A4\uD2B8"),
		).toBeFalsy();
	});
	test("contains illegal char U+302E Hangul single dot tone mark", () => {
		const instance = new Schema(schema);
		expect(
			instance.validate("\uC2E4\u302E\uB840.\uD14C\uC2A4\uD2B8"),
		).toBeFalsy();
	});
	test("a host name with a component too long", () => {
		const instance = new Schema(schema);
		expect(
			instance.validate(
				"\uC2E4\uC2E4\uC2E4\uC2E4\uC2E4\uC2E4\uC2E4\uC2E4\uC2E4\uC2E4\uC2E4\uC2E4\uC2E4\uC2E4\uC2E4\uC2E4\uC2E4\uC2E4\uC2E4\uC2E4\uC2E4\uC2E4\uC2E4\uC2E4\uC2E4\uC2E4\uC2E4\uC2E4\uC2E4\uC2E4\uC2E4\uC2E4\uC2E4\uC2E4\uC2E4\uC2E4\uC2E4\uC2E4\uC2E4\uC2E4\uC2E4\uC2E4\uC2E4\uC2E4\uC2E4\uC2E4\uC2E4\uC2E4\uC2E4\uC2E4\uC2E4\uC2E4\uB840\uB840\uD14C\uC2A4\uD2B8\uB840\uB840\uB840\uB840\uB840\uB840\uB840\uB840\uB840\uB840\uB840\uB840\uB840\uB840\uB840\uB840\uB840\uD14C\uC2A4\uD2B8\uB840\uB840\uB840\uB840\uB840\uB840\uB840\uB840\uB840\uB840\uB840\uB840\uB840\uB840\uB840\uB840\uB840\uB840\uB840\uD14C\uC2A4\uD2B8\uB840\uB840\uB840\uB840\uB840\uB840\uB840\uB840\uB840\uB840\uB840\uB840\uD14C\uC2A4\uD2B8\uB840\uB840\uC2E4\uB840.\uD14C\uC2A4\uD2B8",
			),
		).toBeFalsy();
	});
	test("invalid label, correct Punycode", () => {
		const instance = new Schema(schema);
		expect(instance.validate("-> $1.00 <--")).toBeFalsy();
	});
	test("valid Chinese Punycode", () => {
		const instance = new Schema(schema);
		expect(instance.validate("xn--ihqwcrb4cv8a8dqg056pqjye")).toBeTruthy();
	});
	test("invalid Punycode", () => {
		const instance = new Schema(schema);
		expect(instance.validate("xn--X")).toBeFalsy();
	});
	test('U-label contains "--" in the 3rd and 4th position', () => {
		const instance = new Schema(schema);
		expect(instance.validate("XN--aa---o47jg78q")).toBeFalsy();
	});
	test("U-label starts with a dash", () => {
		const instance = new Schema(schema);
		expect(instance.validate("-hello")).toBeFalsy();
	});
	test("U-label ends with a dash", () => {
		const instance = new Schema(schema);
		expect(instance.validate("hello-")).toBeFalsy();
	});
	test("U-label starts and ends with a dash", () => {
		const instance = new Schema(schema);
		expect(instance.validate("-hello-")).toBeFalsy();
	});
	test("Begins with a Spacing Combining Mark", () => {
		const instance = new Schema(schema);
		expect(instance.validate("\u0903hello")).toBeFalsy();
	});
	test("Begins with a Nonspacing Mark", () => {
		const instance = new Schema(schema);
		expect(instance.validate("\u0300hello")).toBeFalsy();
	});
	test("Begins with an Enclosing Mark", () => {
		const instance = new Schema(schema);
		expect(instance.validate("\u0488hello")).toBeFalsy();
	});
	test("Exceptions that are PVALID, left-to-right chars", () => {
		const instance = new Schema(schema);
		expect(instance.validate("\u00DF\u03C2\u0F0B\u3007")).toBeTruthy();
	});
	test("Exceptions that are PVALID, right-to-left chars", () => {
		const instance = new Schema(schema);
		expect(instance.validate("\u06FD\u06FE")).toBeTruthy();
	});
	test("Exceptions that are DISALLOWED, right-to-left chars", () => {
		const instance = new Schema(schema);
		expect(instance.validate("\u0640\u07FA")).toBeFalsy();
	});
	test("Exceptions that are DISALLOWED, left-to-right chars", () => {
		const instance = new Schema(schema);
		expect(
			instance.validate("\u3031\u3032\u3033\u3034\u3035\u302E\u302F\u303B"),
		).toBeFalsy();
	});
	test("MIDDLE DOT with no preceding 'l'", () => {
		const instance = new Schema(schema);
		expect(instance.validate("a\u00B7l")).toBeFalsy();
	});
	test("MIDDLE DOT with nothing preceding", () => {
		const instance = new Schema(schema);
		expect(instance.validate("\u00B7l")).toBeFalsy();
	});
	test("MIDDLE DOT with no following 'l'", () => {
		const instance = new Schema(schema);
		expect(instance.validate("l\u00B7a")).toBeFalsy();
	});
	test("MIDDLE DOT with nothing following", () => {
		const instance = new Schema(schema);
		expect(instance.validate("l\u00B7")).toBeFalsy();
	});
	test("MIDDLE DOT with surrounding 'l's", () => {
		const instance = new Schema(schema);
		expect(instance.validate("l\u00B7l")).toBeTruthy();
	});
	test("Greek KERAIA not followed by Greek", () => {
		const instance = new Schema(schema);
		expect(instance.validate("\u03B1\u0375S")).toBeFalsy();
	});
	test("Greek KERAIA not followed by anything", () => {
		const instance = new Schema(schema);
		expect(instance.validate("\u03B1\u0375")).toBeFalsy();
	});
	test("Greek KERAIA followed by Greek", () => {
		const instance = new Schema(schema);
		expect(instance.validate("\u03B1\u0375\u03B2")).toBeTruthy();
	});
	test("Hebrew GERESH not preceded by Hebrew", () => {
		const instance = new Schema(schema);
		expect(instance.validate("A\u05F3\u05D1")).toBeFalsy();
	});
	test("Hebrew GERESH not preceded by anything", () => {
		const instance = new Schema(schema);
		expect(instance.validate("\u05F3\u05D1")).toBeFalsy();
	});
	test("Hebrew GERESH preceded by Hebrew", () => {
		const instance = new Schema(schema);
		expect(instance.validate("\u05D0\u05F3\u05D1")).toBeTruthy();
	});
	test("Hebrew GERSHAYIM not preceded by Hebrew", () => {
		const instance = new Schema(schema);
		expect(instance.validate("A\u05F4\u05D1")).toBeFalsy();
	});
	test("Hebrew GERSHAYIM not preceded by anything", () => {
		const instance = new Schema(schema);
		expect(instance.validate("\u05F4\u05D1")).toBeFalsy();
	});
	test("Hebrew GERSHAYIM preceded by Hebrew", () => {
		const instance = new Schema(schema);
		expect(instance.validate("\u05D0\u05F4\u05D1")).toBeTruthy();
	});
	test("KATAKANA MIDDLE DOT with no Hiragana, Katakana, or Han", () => {
		const instance = new Schema(schema);
		expect(instance.validate("def\u30FBabc")).toBeFalsy();
	});
	test("KATAKANA MIDDLE DOT with no other characters", () => {
		const instance = new Schema(schema);
		expect(instance.validate("\u30FB")).toBeFalsy();
	});
	test("KATAKANA MIDDLE DOT with Hiragana", () => {
		const instance = new Schema(schema);
		expect(instance.validate("\u30FB\u3041")).toBeTruthy();
	});
	test("KATAKANA MIDDLE DOT with Katakana", () => {
		const instance = new Schema(schema);
		expect(instance.validate("\u30FB\u30A1")).toBeTruthy();
	});
	test("KATAKANA MIDDLE DOT with Han", () => {
		const instance = new Schema(schema);
		expect(instance.validate("\u30FB\u4E08")).toBeTruthy();
	});
	test("Arabic-Indic digits mixed with Extended Arabic-Indic digits", () => {
		const instance = new Schema(schema);
		expect(instance.validate("\u0628\u0660\u06F0")).toBeFalsy();
	});
	test("Arabic-Indic digits not mixed with Extended Arabic-Indic digits", () => {
		const instance = new Schema(schema);
		expect(instance.validate("\u0628\u0660\u0628")).toBeTruthy();
	});
	test("Extended Arabic-Indic digits not mixed with Arabic-Indic digits", () => {
		const instance = new Schema(schema);
		expect(instance.validate("\u06F00")).toBeTruthy();
	});
	test("ZERO WIDTH JOINER not preceded by Virama", () => {
		const instance = new Schema(schema);
		expect(instance.validate("\u0915\u200D\u0937")).toBeFalsy();
	});
	test("ZERO WIDTH JOINER not preceded by anything", () => {
		const instance = new Schema(schema);
		expect(instance.validate("\u200D\u0937")).toBeFalsy();
	});
	test("ZERO WIDTH JOINER preceded by Virama", () => {
		const instance = new Schema(schema);
		expect(instance.validate("\u0915\u094D\u200D\u0937")).toBeTruthy();
	});
	test("ZERO WIDTH NON-JOINER preceded by Virama", () => {
		const instance = new Schema(schema);
		expect(instance.validate("\u0915\u094D\u200C\u0937")).toBeTruthy();
	});
	test("ZERO WIDTH NON-JOINER not preceded by Virama but matches regexp", () => {
		const instance = new Schema(schema);
		expect(instance.validate("\u0628\u064A\u200C\u0628\u064A")).toBeTruthy();
	});
	test("single label", () => {
		const instance = new Schema(schema);
		expect(instance.validate("hostname")).toBeTruthy();
	});
	test("single label with hyphen", () => {
		const instance = new Schema(schema);
		expect(instance.validate("host-name")).toBeTruthy();
	});
	test("single label with digits", () => {
		const instance = new Schema(schema);
		expect(instance.validate("h0stn4me")).toBeTruthy();
	});
	test("single label starting with digit", () => {
		const instance = new Schema(schema);
		expect(instance.validate("1host")).toBeTruthy();
	});
	test("single label ending with digit", () => {
		const instance = new Schema(schema);
		expect(instance.validate("hostnam3")).toBeTruthy();
	});
});