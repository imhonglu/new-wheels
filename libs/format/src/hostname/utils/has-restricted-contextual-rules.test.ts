import { describe, expect, test } from "vitest";
import { hasRestrictedContextualRules } from "./has-restricted-contextual-rules.js";

describe("hasRestrictedContextualRules", () => {
	test("should detect permitted characters", () => {
		expect(hasRestrictedContextualRules("\u0640")).toBe(true);
		expect(hasRestrictedContextualRules("\u07FA")).toBe(true);
		expect(hasRestrictedContextualRules("\u302E")).toBe(true);
		expect(hasRestrictedContextualRules("\u302F")).toBe(true);
		expect(hasRestrictedContextualRules("\u3031")).toBe(true);
		expect(hasRestrictedContextualRules("\u3035")).toBe(true);
		expect(hasRestrictedContextualRules("\u303B")).toBe(true);
	});
});

describe("hasRestrictedContextualRules - ARABIC-INDIC DIGITS", () => {
	test("should return true for Arabic-Indic digits mixed with Extended Arabic-Indic digits", () => {
		expect(hasRestrictedContextualRules("\u0628\u0660\u06f0")).toBe(true);
	});

	test("should return false for Arabic-Indic digits not mixed with Extended Arabic-Indic digits", () => {
		expect(hasRestrictedContextualRules("\u0628\u0660\u0628")).toBe(false);
	});
});

describe("hasRestrictedContextualRules - EXTENDED ARABIC-INDIC DIGITS", () => {
	test("should return false for Extended Arabic-Indic digits not mixed with Arabic-Indic digits", () => {
		expect(hasRestrictedContextualRules("\u06f00")).toBe(false);
	});
});

describe("hasRestrictedContextualRules - GREEK LOWER NUMERAL SIGN (KERAIA)", () => {
	test("should return true for Greek KERAIA not followed by anything", () => {
		expect(hasRestrictedContextualRules("\u03b1\u0375")).toBe(true);
	});

	test("should return false for Greek KERAIA followed by Greek", () => {
		expect(hasRestrictedContextualRules("\u03b1\u0375\u03b2")).toBe(false);
	});
});

describe("hasRestrictedContextualRules - HEBREW PUNCTUATION GERESH", () => {
	test("should return true for Hebrew GERESH not preceded by anything", () => {
		expect(hasRestrictedContextualRules("\u05f3\u05d1")).toBe(true);
	});

	test("should return false for Hebrew GERESH preceded by Hebrew", () => {
		expect(hasRestrictedContextualRules("\u05d0\u05f3\u05d1")).toBe(false);
	});
});

describe("hasRestrictedContextualRules - HEBREW PUNCTUATION GERSHAYIM", () => {
	test("should return true for Hebrew GERESH not preceded by Hebrew", () => {
		expect(hasRestrictedContextualRules("A\u05f4\u05d1")).toBe(true);
	});

	test("should return true for Hebrew GERESH not preceded by anything", () => {
		expect(hasRestrictedContextualRules("\u05f4\u05d1")).toBe(true);
	});
});

describe("hasRestrictedContextualRules - KATAKANA MIDDLE DOT", () => {
	test("should return true for KATAKANA MIDDLE DOT with no Hiragana, Katakana, or Han", () => {
		expect(hasRestrictedContextualRules("def\u30fbabc")).toBe(true);
	});

	test("should return true for KATAKANA MIDDLE DOT with no other characters", () => {
		expect(hasRestrictedContextualRules("\u30fb")).toBe(true);
	});

	test("should return false for KATAKANA MIDDLE DOT with Hiragana", () => {
		expect(hasRestrictedContextualRules("\u30fb\u3041")).toBe(false);
	});

	test("should return false for KATAKANA MIDDLE DOT with Katakana", () => {
		expect(hasRestrictedContextualRules("\u30fb\u30a1")).toBe(false);
	});

	test("should return false for KATAKANA MIDDLE DOT with Han", () => {
		expect(hasRestrictedContextualRules("\u30fb\u4e08")).toBe(false);
	});
});

describe("hasRestrictedContextualRules - MIDDLE DOT", () => {
	test("should return true for MIDDLE DOT with nothing preceding", () => {
		expect(hasRestrictedContextualRules("\u00b7l")).toBe(true);
	});

	test("should return true for MIDDLE DOT with no following 'l'", () => {
		expect(hasRestrictedContextualRules("l\u00b7a")).toBe(true);
	});

	test("should return true for MIDDLE DOT with nothing following", () => {
		expect(hasRestrictedContextualRules("l\u00b7")).toBe(true);
	});

	test("should return false for MIDDLE DOT with surrounding 'l's", () => {
		expect(hasRestrictedContextualRules("l\u00b7l")).toBe(false);
	});
});

describe("hasRestrictedContextualRules - ZERO WIDTH JOINER", () => {
	test("should return true for ZERO WIDTH JOINER not preceded by anything", () => {
		expect(hasRestrictedContextualRules("\u200d\u0937")).toBe(true);
	});

	test("should return false for ZERO WIDTH JOINER preceded by Virama", () => {
		expect(hasRestrictedContextualRules("\u0915\u094d\u200d\u0937")).toBe(
			false,
		);
	});
});

describe("hasRestrictedContextualRules - ZERO WIDTH NON-JOINER", () => {
	test("should return false for ZERO WIDTH NON-JOINER preceded by Virama", () => {
		expect(hasRestrictedContextualRules("\u0915\u094d\u200c\u0937")).toBe(
			false,
		);
	});

	test("should return false for ZERO WIDTH NON-JOINER not preceded by Virama but matches regexp", () => {
		expect(hasRestrictedContextualRules("\u0628\u064a\u200c\u0628\u064a")).toBe(
			false,
		);
	});
});
