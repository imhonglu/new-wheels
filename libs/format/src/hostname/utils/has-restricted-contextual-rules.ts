const ZERO_WIDTH_NON_JOINER = "\u200c";
const ZERO_WIDTH_JOINER = "\u200d";
const MIDDLE_DOT = "\u00B7";
const GREEK_LOWER_NUMERAL_SIGN = "\u0375";
const HEBREW_GERESH = "\u05F3";
const HEBREW_GERSHAYIM = "\u05F4";
const KATAKANA_MIDDLE_DOT = "\u30FB";

const map = new Map<string, (label: string, i: number) => boolean>([
	[
		ZERO_WIDTH_NON_JOINER,
		(label, i) =>
			!(
				isVirama(label.charAt(i - 1)) ||
				label.slice(i - 2, i) === label.slice(i + 1, i + 3)
			),
	],

	[ZERO_WIDTH_JOINER, (label, i) => !isVirama(label.charAt(i - 1))],

	[
		MIDDLE_DOT,
		(label, i) => label.charAt(i - 1) !== "l" || label.charAt(i + 1) !== "l",
	],

	[GREEK_LOWER_NUMERAL_SIGN, (label, i) => !isGreek(label.charAt(i + 1))],
	[HEBREW_GERESH, (label, i) => !isHebrew(label.charAt(i - 1))],
	[HEBREW_GERSHAYIM, (label, i) => !isHebrew(label.charAt(i - 1))],
]);

export function hasRestrictedContextualRules(label: string): boolean {
	const flags = {
		hasKatakanaMiddleDot: false,
		hasJapaneseScript: false,
		hasExtendedArabicDigits: false,
		hasArabicDigits: false,
	};

	const setFlag = (key: keyof typeof flags) => {
		if (!flags[key]) {
			flags[key] = true;
		}
	};

	for (let i = 0; i < label.length; i++) {
		const char = label.charAt(i);

		if (isProhibitedCharacter(char)) {
			return true;
		}

		if (map.has(char)) {
			const isRuleViolated = map.get(char)?.(label, i) ?? false;
			if (isRuleViolated) {
				return true;
			}
		}

		if (char === KATAKANA_MIDDLE_DOT) {
			setFlag("hasKatakanaMiddleDot");
			continue;
		}

		if (isHan(char) || isHiragana(char) || isKatakana(char)) {
			setFlag("hasJapaneseScript");
			continue;
		}

		if (isArabicIndicDigit(char)) {
			setFlag("hasArabicDigits");
			continue;
		}

		if (isExtendedArabicIndicDigit(char)) {
			setFlag("hasExtendedArabicDigits");
		}
	}

	if (flags.hasKatakanaMiddleDot && !flags.hasJapaneseScript) {
		return true;
	}

	if (flags.hasArabicDigits && flags.hasExtendedArabicDigits) {
		return true;
	}

	return false;
}

/**
 * Check if the character is a Virama character.
 * @see {@link https://datatracker.ietf.org/doc/html/rfc5892#appendix-B | RFC 5892#Appendix B}
 * @see {@link https://www.unicode.org/Public/UNIDATA/Scripts.txt | Unicode Scripts}
 */
function isVirama(char: string) {
	const code = char.codePointAt(0) ?? 0;

	return (
		code === 0x094d ||
		code === 0x09cd ||
		(code >= 0x0a4b && code <= 0x0a4d) ||
		code === 0x0acd ||
		code === 0x0b4d ||
		code === 0x0bcd ||
		(code >= 0x0c4a && code <= 0x0c4d) ||
		(code >= 0x0ccc && code <= 0x0ccd) ||
		(code >= 0x0d3b && code <= 0x0d3c) ||
		code === 0x0d4d ||
		(code >= 0x1039 && code <= 0x103a) ||
		(code >= 0x1712 && code <= 0x1714) ||
		code === 0x10a3f ||
		(code >= 0x1bab && code <= 0x1bad) ||
		(code >= 0xa8c4 && code <= 0xa8c5) ||
		(code >= 0xa952 && code <= 0xa953) ||
		code === 0xaaf6 ||
		(code >= 0x110b9 && code <= 0x110ba) ||
		(code >= 0x11038 && code <= 0x11046) ||
		code === 0x11070 ||
		(code >= 0x111bf && code <= 0x111c0) ||
		code === 0x116b6 ||
		(code >= 0x1134b && code <= 0x1134d) ||
		code === 0x11235 ||
		(code >= 0x1163f && code <= 0x11640) ||
		(code >= 0x115bf && code <= 0x115c0) ||
		(code >= 0x112e3 && code <= 0x112ea) ||
		(code >= 0x114c2 && code <= 0x114c3) ||
		code === 0x11c3f ||
		(code >= 0x11442 && code <= 0x11444) ||
		(code >= 0x11d3f && code <= 0x11d45) ||
		(code >= 0x11839 && code <= 0x1183a) ||
		code === 0x11d97 ||
		code === 0x119e0 ||
		code === 0x1193e ||
		(code >= 0x16d6b && code <= 0x16d6c) ||
		(code >= 0x113ce && code <= 0x113cf)
	);
}

/**
 * Check if the character is a Greek character.
 * @see {@link https://datatracker.ietf.org/doc/html/rfc5892#appendix-A.3 | RFC 5892#appendix-A.3}
 * @see {@link https://www.unicode.org/charts/PDF/U0370.pdf | The Unicode Standard 16.0#Greek}
 */
function isGreek(char: string): boolean {
	const code = char.codePointAt(0) ?? 0;
	return code >= 0x0370 && code <= 0x03ff;
}

/**
 * Check if the character is a Hebrew character.
 * @see {@link https://datatracker.ietf.org/doc/html/rfc5892#appendix-A.4 | RFC 5892#appendix-A.4}
 * @see {@link https://www.unicode.org/charts/PDF/U0590.pdf | The Unicode Standard 16.0#Hebrew}
 */
function isHebrew(char: string): boolean {
	const code = char.codePointAt(0) ?? 0;
	return code >= 0x0590 && code <= 0x05ff;
}

/**
 * Check if the character is a Han character.
 * @see {@link https://datatracker.ietf.org/doc/html/rfc5892#appendix-A.7 | RFC 5892#appendix-A.7}
 * @see {@link https://www.unicode.org/charts/PDF/U4E00.pdf | The Unicode Standard 16.0#CJK Unified Ideographs}
 */
function isHan(char: string): boolean {
	const code = char.codePointAt(0) ?? 0;
	return code >= 0x4e00 && code <= 0x9fff;
}

/**
 * Check if the character is a Hiragana character.
 * @see {@link https://datatracker.ietf.org/doc/html/rfc5892#appendix-A.7 | RFC 5892#appendix-A.7}
 * @see {@link https://www.unicode.org/charts/PDF/U3040.pdf | The Unicode Standard 16.0#Hiragana}
 */
function isHiragana(char: string): boolean {
	const code = char.codePointAt(0) ?? 0;
	return code >= 0x3040 && code <= 0x309f;
}

/**
 * Check if the character is a Katakana character.
 * @see {@link https://datatracker.ietf.org/doc/html/rfc5892#appendix-A.7 | RFC 5892#appendix-A.7}
 * @see {@link https://www.unicode.org/charts/PDF/U30A0.pdf | The Unicode Standard 16.0#Katakana}
 */
function isKatakana(char: string): boolean {
	const code = char.codePointAt(0) ?? 0;
	return code >= 0x30a0 && code <= 0x30ff;
}

/**
 * Check if the character is an Arabic-Indic digit.
 * @see {@link https://datatracker.ietf.org/doc/html/rfc5892#appendix-A.8 | RFC 5892#appendix-A.8}
 * @see {@link https://www.unicode.org/charts/PDF/U0600.pdf | The Unicode Standard 16.0#Arabic}
 */
function isArabicIndicDigit(char: string): boolean {
	const code = char.codePointAt(0) ?? 0;
	return code >= 0x0660 && code <= 0x0669;
}

/**
 * Check if the character is an Extended Arabic-Indic digit.
 * @see {@link https://datatracker.ietf.org/doc/html/rfc5892#appendix-A.9 | RFC 5892#appendix-A.9}
 * @see {@link https://www.unicode.org/charts/PDF/U0600.pdf | The Unicode Standard 16.0#Arabic}
 */
function isExtendedArabicIndicDigit(char: string): boolean {
	const code = char.codePointAt(0) ?? 0;
	return code >= 0x06f0 && code <= 0x06f9;
}

/**
 * @see {@link https://datatracker.ietf.org/doc/html/rfc5891#section-4.2.2 | RFC 5891#section-4.2.2}
 * @see {@link https://datatracker.ietf.org/doc/html/rfc5892#section-2.6 | RFC 5892#section-2.6}
 */
function isProhibitedCharacter(char: string) {
	const code = char.codePointAt(0) ?? 0;

	return (
		code === 0x0640 ||
		code === 0x07fa ||
		code === 0x302e ||
		code === 0x302f ||
		(code >= 0x3031 && code <= 0x3035) ||
		code === 0x3035 ||
		code === 0x303b
	);
}
