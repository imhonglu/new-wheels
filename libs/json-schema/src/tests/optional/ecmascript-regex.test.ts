/* This file is automatically generated. Do not edit this file. */
import { describe, expect, test } from "vitest";
import { Schema } from "../schema.js";
describe("ECMA 262 regex $ does not match trailing newline", () => {
	const schema = {
		$schema: "https://json-schema.org/draft/2020-12/schema",
		type: "string",
		pattern: "^abc$",
	};
	test("matches in Python, but not in ECMA 262", () => {
		const instance = new Schema(schema);
		expect(instance.validate("abc\\n")).toBeFalsy();
	});
	test("matches", () => {
		const instance = new Schema(schema);
		expect(instance.validate("abc")).toBeTruthy();
	});
});
describe("ECMA 262 regex converts \\t to horizontal tab", () => {
	const schema = {
		$schema: "https://json-schema.org/draft/2020-12/schema",
		type: "string",
		pattern: "^\\t$",
	};
	test("does not match", () => {
		const instance = new Schema(schema);
		expect(instance.validate("\\t")).toBeFalsy();
	});
	test("matches", () => {
		const instance = new Schema(schema);
		expect(instance.validate("\t")).toBeTruthy();
	});
});
describe("ECMA 262 regex escapes control codes with \\c and upper letter", () => {
	const schema = {
		$schema: "https://json-schema.org/draft/2020-12/schema",
		type: "string",
		pattern: "^\\cC$",
	};
	test("does not match", () => {
		const instance = new Schema(schema);
		expect(instance.validate("\\cC")).toBeFalsy();
	});
	test("matches", () => {
		const instance = new Schema(schema);
		expect(instance.validate("\u0003")).toBeTruthy();
	});
});
describe("ECMA 262 regex escapes control codes with \\c and lower letter", () => {
	const schema = {
		$schema: "https://json-schema.org/draft/2020-12/schema",
		type: "string",
		pattern: "^\\cc$",
	};
	test("does not match", () => {
		const instance = new Schema(schema);
		expect(instance.validate("\\cc")).toBeFalsy();
	});
	test("matches", () => {
		const instance = new Schema(schema);
		expect(instance.validate("\u0003")).toBeTruthy();
	});
});
describe("ECMA 262 \\d matches ascii digits only", () => {
	const schema = {
		$schema: "https://json-schema.org/draft/2020-12/schema",
		type: "string",
		pattern: "^\\d$",
	};
	test("ASCII zero matches", () => {
		const instance = new Schema(schema);
		expect(instance.validate("0")).toBeTruthy();
	});
	test("NKO DIGIT ZERO does not match (unlike e.g. Python)", () => {
		const instance = new Schema(schema);
		expect(instance.validate("\u07C0")).toBeFalsy();
	});
	test("NKO DIGIT ZERO (as \\u escape) does not match", () => {
		const instance = new Schema(schema);
		expect(instance.validate("\u07C0")).toBeFalsy();
	});
});
describe("ECMA 262 \\D matches everything but ascii digits", () => {
	const schema = {
		$schema: "https://json-schema.org/draft/2020-12/schema",
		type: "string",
		pattern: "^\\D$",
	};
	test("ASCII zero does not match", () => {
		const instance = new Schema(schema);
		expect(instance.validate("0")).toBeFalsy();
	});
	test("NKO DIGIT ZERO matches (unlike e.g. Python)", () => {
		const instance = new Schema(schema);
		expect(instance.validate("\u07C0")).toBeTruthy();
	});
	test("NKO DIGIT ZERO (as \\u escape) matches", () => {
		const instance = new Schema(schema);
		expect(instance.validate("\u07C0")).toBeTruthy();
	});
});
describe("ECMA 262 \\w matches ascii letters only", () => {
	const schema = {
		$schema: "https://json-schema.org/draft/2020-12/schema",
		type: "string",
		pattern: "^\\w$",
	};
	test("ASCII 'a' matches", () => {
		const instance = new Schema(schema);
		expect(instance.validate("a")).toBeTruthy();
	});
	test("latin-1 e-acute does not match (unlike e.g. Python)", () => {
		const instance = new Schema(schema);
		expect(instance.validate("\u00E9")).toBeFalsy();
	});
});
describe("ECMA 262 \\W matches everything but ascii letters", () => {
	const schema = {
		$schema: "https://json-schema.org/draft/2020-12/schema",
		type: "string",
		pattern: "^\\W$",
	};
	test("ASCII 'a' does not match", () => {
		const instance = new Schema(schema);
		expect(instance.validate("a")).toBeFalsy();
	});
	test("latin-1 e-acute matches (unlike e.g. Python)", () => {
		const instance = new Schema(schema);
		expect(instance.validate("\u00E9")).toBeTruthy();
	});
});
describe("ECMA 262 \\s matches whitespace", () => {
	const schema = {
		$schema: "https://json-schema.org/draft/2020-12/schema",
		type: "string",
		pattern: "^\\s$",
	};
	test("ASCII space matches", () => {
		const instance = new Schema(schema);
		expect(instance.validate(" ")).toBeTruthy();
	});
	test("Character tabulation matches", () => {
		const instance = new Schema(schema);
		expect(instance.validate("\t")).toBeTruthy();
	});
	test("Line tabulation matches", () => {
		const instance = new Schema(schema);
		expect(instance.validate("\v")).toBeTruthy();
	});
	test("Form feed matches", () => {
		const instance = new Schema(schema);
		expect(instance.validate("\f")).toBeTruthy();
	});
	test("latin-1 non-breaking-space matches", () => {
		const instance = new Schema(schema);
		expect(instance.validate("\u00A0")).toBeTruthy();
	});
	test("zero-width whitespace matches", () => {
		const instance = new Schema(schema);
		expect(instance.validate("\uFEFF")).toBeTruthy();
	});
	test("line feed matches (line terminator)", () => {
		const instance = new Schema(schema);
		expect(instance.validate("\n")).toBeTruthy();
	});
	test("paragraph separator matches (line terminator)", () => {
		const instance = new Schema(schema);
		expect(instance.validate("\u2029")).toBeTruthy();
	});
	test("EM SPACE matches (Space_Separator)", () => {
		const instance = new Schema(schema);
		expect(instance.validate("\u2003")).toBeTruthy();
	});
	test("Non-whitespace control does not match", () => {
		const instance = new Schema(schema);
		expect(instance.validate("\u0001")).toBeFalsy();
	});
	test("Non-whitespace does not match", () => {
		const instance = new Schema(schema);
		expect(instance.validate("\u2013")).toBeFalsy();
	});
});
describe("ECMA 262 \\S matches everything but whitespace", () => {
	const schema = {
		$schema: "https://json-schema.org/draft/2020-12/schema",
		type: "string",
		pattern: "^\\S$",
	};
	test("ASCII space does not match", () => {
		const instance = new Schema(schema);
		expect(instance.validate(" ")).toBeFalsy();
	});
	test("Character tabulation does not match", () => {
		const instance = new Schema(schema);
		expect(instance.validate("\t")).toBeFalsy();
	});
	test("Line tabulation does not match", () => {
		const instance = new Schema(schema);
		expect(instance.validate("\v")).toBeFalsy();
	});
	test("Form feed does not match", () => {
		const instance = new Schema(schema);
		expect(instance.validate("\f")).toBeFalsy();
	});
	test("latin-1 non-breaking-space does not match", () => {
		const instance = new Schema(schema);
		expect(instance.validate("\u00A0")).toBeFalsy();
	});
	test("zero-width whitespace does not match", () => {
		const instance = new Schema(schema);
		expect(instance.validate("\uFEFF")).toBeFalsy();
	});
	test("line feed does not match (line terminator)", () => {
		const instance = new Schema(schema);
		expect(instance.validate("\n")).toBeFalsy();
	});
	test("paragraph separator does not match (line terminator)", () => {
		const instance = new Schema(schema);
		expect(instance.validate("\u2029")).toBeFalsy();
	});
	test("EM SPACE does not match (Space_Separator)", () => {
		const instance = new Schema(schema);
		expect(instance.validate("\u2003")).toBeFalsy();
	});
	test("Non-whitespace control matches", () => {
		const instance = new Schema(schema);
		expect(instance.validate("\u0001")).toBeTruthy();
	});
	test("Non-whitespace matches", () => {
		const instance = new Schema(schema);
		expect(instance.validate("\u2013")).toBeTruthy();
	});
});
describe("patterns always use unicode semantics with pattern", () => {
	const schema = {
		$schema: "https://json-schema.org/draft/2020-12/schema",
		pattern: "\\p{Letter}cole",
	};
	test("ascii character in json string", () => {
		const instance = new Schema(schema);
		expect(
			instance.validate(
				"Les hivers de mon enfance etaient des saisons longues, longues. Nous vivions en trois lieux: l'ecole, l'eglise et la patinoire; mais la vraie vie etait sur la patinoire.",
			),
		).toBeTruthy();
	});
	test("literal unicode character in json string", () => {
		const instance = new Schema(schema);
		expect(
			instance.validate(
				"Les hivers de mon enfance \u00E9taient des saisons longues, longues. Nous vivions en trois lieux: l'\u00E9cole, l'\u00E9glise et la patinoire; mais la vraie vie \u00E9tait sur la patinoire.",
			),
		).toBeTruthy();
	});
	test("unicode character in hex format in string", () => {
		const instance = new Schema(schema);
		expect(
			instance.validate(
				"Les hivers de mon enfance \u00E9taient des saisons longues, longues. Nous vivions en trois lieux: l'\u00E9cole, l'\u00E9glise et la patinoire; mais la vraie vie \u00E9tait sur la patinoire.",
			),
		).toBeTruthy();
	});
	test("unicode matching is case-sensitive", () => {
		const instance = new Schema(schema);
		expect(
			instance.validate(
				"LES HIVERS DE MON ENFANCE \u00C9TAIENT DES SAISONS LONGUES, LONGUES. NOUS VIVIONS EN TROIS LIEUX: L'\u00C9COLE, L'\u00C9GLISE ET LA PATINOIRE; MAIS LA VRAIE VIE \u00C9TAIT SUR LA PATINOIRE.",
			),
		).toBeFalsy();
	});
});
describe("\\w in patterns matches [A-Za-z0-9_], not unicode letters", () => {
	const schema = {
		$schema: "https://json-schema.org/draft/2020-12/schema",
		pattern: "\\wcole",
	};
	test("ascii character in json string", () => {
		const instance = new Schema(schema);
		expect(
			instance.validate(
				"Les hivers de mon enfance etaient des saisons longues, longues. Nous vivions en trois lieux: l'ecole, l'eglise et la patinoire; mais la vraie vie etait sur la patinoire.",
			),
		).toBeTruthy();
	});
	test("literal unicode character in json string", () => {
		const instance = new Schema(schema);
		expect(
			instance.validate(
				"Les hivers de mon enfance \u00E9taient des saisons longues, longues. Nous vivions en trois lieux: l'\u00E9cole, l'\u00E9glise et la patinoire; mais la vraie vie \u00E9tait sur la patinoire.",
			),
		).toBeFalsy();
	});
	test("unicode character in hex format in string", () => {
		const instance = new Schema(schema);
		expect(
			instance.validate(
				"Les hivers de mon enfance \u00E9taient des saisons longues, longues. Nous vivions en trois lieux: l'\u00E9cole, l'\u00E9glise et la patinoire; mais la vraie vie \u00E9tait sur la patinoire.",
			),
		).toBeFalsy();
	});
	test("unicode matching is case-sensitive", () => {
		const instance = new Schema(schema);
		expect(
			instance.validate(
				"LES HIVERS DE MON ENFANCE \u00C9TAIENT DES SAISONS LONGUES, LONGUES. NOUS VIVIONS EN TROIS LIEUX: L'\u00C9COLE, L'\u00C9GLISE ET LA PATINOIRE; MAIS LA VRAIE VIE \u00C9TAIT SUR LA PATINOIRE.",
			),
		).toBeFalsy();
	});
});
describe("pattern with ASCII ranges", () => {
	const schema = {
		$schema: "https://json-schema.org/draft/2020-12/schema",
		pattern: "[a-z]cole",
	};
	test("literal unicode character in json string", () => {
		const instance = new Schema(schema);
		expect(
			instance.validate(
				"Les hivers de mon enfance \u00E9taient des saisons longues, longues. Nous vivions en trois lieux: l'\u00E9cole, l'\u00E9glise et la patinoire; mais la vraie vie \u00E9tait sur la patinoire.",
			),
		).toBeFalsy();
	});
	test("unicode character in hex format in string", () => {
		const instance = new Schema(schema);
		expect(
			instance.validate(
				"Les hivers de mon enfance \u00E9taient des saisons longues, longues. Nous vivions en trois lieux: l'\u00E9cole, l'\u00E9glise et la patinoire; mais la vraie vie \u00E9tait sur la patinoire.",
			),
		).toBeFalsy();
	});
	test("ascii characters match", () => {
		const instance = new Schema(schema);
		expect(
			instance.validate(
				"Les hivers de mon enfance etaient des saisons longues, longues. Nous vivions en trois lieux: l'ecole, l'eglise et la patinoire; mais la vraie vie etait sur la patinoire.",
			),
		).toBeTruthy();
	});
});
describe("\\d in pattern matches [0-9], not unicode digits", () => {
	const schema = {
		$schema: "https://json-schema.org/draft/2020-12/schema",
		pattern: "^\\d+$",
	};
	test("ascii digits", () => {
		const instance = new Schema(schema);
		expect(instance.validate("42")).toBeTruthy();
	});
	test("ascii non-digits", () => {
		const instance = new Schema(schema);
		expect(instance.validate("-%#")).toBeFalsy();
	});
	test("non-ascii digits (BENGALI DIGIT FOUR, BENGALI DIGIT TWO)", () => {
		const instance = new Schema(schema);
		expect(instance.validate("\u09EA\u09E8")).toBeFalsy();
	});
});
describe("pattern with non-ASCII digits", () => {
	const schema = {
		$schema: "https://json-schema.org/draft/2020-12/schema",
		pattern: "^\\p{digit}+$",
	};
	test("ascii digits", () => {
		const instance = new Schema(schema);
		expect(instance.validate("42")).toBeTruthy();
	});
	test("ascii non-digits", () => {
		const instance = new Schema(schema);
		expect(instance.validate("-%#")).toBeFalsy();
	});
	test("non-ascii digits (BENGALI DIGIT FOUR, BENGALI DIGIT TWO)", () => {
		const instance = new Schema(schema);
		expect(instance.validate("\u09EA\u09E8")).toBeTruthy();
	});
});
describe("patterns always use unicode semantics with patternProperties", () => {
	const schema = {
		$schema: "https://json-schema.org/draft/2020-12/schema",
		type: "object",
		patternProperties: { "\\p{Letter}cole": true },
		additionalProperties: false,
	};
	test("ascii character in json string", () => {
		const instance = new Schema(schema);
		expect(instance.validate({ "l'ecole": "pas de vraie vie" })).toBeTruthy();
	});
	test("literal unicode character in json string", () => {
		const instance = new Schema(schema);
		expect(
			instance.validate({ "l'\u00E9cole": "pas de vraie vie" }),
		).toBeTruthy();
	});
	test("unicode character in hex format in string", () => {
		const instance = new Schema(schema);
		expect(
			instance.validate({ "l'\u00E9cole": "pas de vraie vie" }),
		).toBeTruthy();
	});
	test("unicode matching is case-sensitive", () => {
		const instance = new Schema(schema);
		expect(
			instance.validate({ "L'\u00C9COLE": "PAS DE VRAIE VIE" }),
		).toBeFalsy();
	});
});
describe("\\w in patternProperties matches [A-Za-z0-9_], not unicode letters", () => {
	const schema = {
		$schema: "https://json-schema.org/draft/2020-12/schema",
		type: "object",
		patternProperties: { "\\wcole": true },
		additionalProperties: false,
	};
	test("ascii character in json string", () => {
		const instance = new Schema(schema);
		expect(instance.validate({ "l'ecole": "pas de vraie vie" })).toBeTruthy();
	});
	test("literal unicode character in json string", () => {
		const instance = new Schema(schema);
		expect(
			instance.validate({ "l'\u00E9cole": "pas de vraie vie" }),
		).toBeFalsy();
	});
	test("unicode character in hex format in string", () => {
		const instance = new Schema(schema);
		expect(
			instance.validate({ "l'\u00E9cole": "pas de vraie vie" }),
		).toBeFalsy();
	});
	test("unicode matching is case-sensitive", () => {
		const instance = new Schema(schema);
		expect(
			instance.validate({ "L'\u00C9COLE": "PAS DE VRAIE VIE" }),
		).toBeFalsy();
	});
});
describe("patternProperties with ASCII ranges", () => {
	const schema = {
		$schema: "https://json-schema.org/draft/2020-12/schema",
		type: "object",
		patternProperties: { "[a-z]cole": true },
		additionalProperties: false,
	};
	test("literal unicode character in json string", () => {
		const instance = new Schema(schema);
		expect(
			instance.validate({ "l'\u00E9cole": "pas de vraie vie" }),
		).toBeFalsy();
	});
	test("unicode character in hex format in string", () => {
		const instance = new Schema(schema);
		expect(
			instance.validate({ "l'\u00E9cole": "pas de vraie vie" }),
		).toBeFalsy();
	});
	test("ascii characters match", () => {
		const instance = new Schema(schema);
		expect(instance.validate({ "l'ecole": "pas de vraie vie" })).toBeTruthy();
	});
});
describe("\\d in patternProperties matches [0-9], not unicode digits", () => {
	const schema = {
		$schema: "https://json-schema.org/draft/2020-12/schema",
		type: "object",
		patternProperties: { "^\\d+$": true },
		additionalProperties: false,
	};
	test("ascii digits", () => {
		const instance = new Schema(schema);
		expect(
			instance.validate({ "42": "life, the universe, and everything" }),
		).toBeTruthy();
	});
	test("ascii non-digits", () => {
		const instance = new Schema(schema);
		expect(
			instance.validate({ "-%#": "spending the year dead for tax reasons" }),
		).toBeFalsy();
	});
	test("non-ascii digits (BENGALI DIGIT FOUR, BENGALI DIGIT TWO)", () => {
		const instance = new Schema(schema);
		expect(
			instance.validate({
				"\u09EA\u09E8": "khajit has wares if you have coin",
			}),
		).toBeFalsy();
	});
});
describe("patternProperties with non-ASCII digits", () => {
	const schema = {
		$schema: "https://json-schema.org/draft/2020-12/schema",
		type: "object",
		patternProperties: { "^\\p{digit}+$": true },
		additionalProperties: false,
	};
	test("ascii digits", () => {
		const instance = new Schema(schema);
		expect(
			instance.validate({ "42": "life, the universe, and everything" }),
		).toBeTruthy();
	});
	test("ascii non-digits", () => {
		const instance = new Schema(schema);
		expect(
			instance.validate({ "-%#": "spending the year dead for tax reasons" }),
		).toBeFalsy();
	});
	test("non-ascii digits (BENGALI DIGIT FOUR, BENGALI DIGIT TWO)", () => {
		const instance = new Schema(schema);
		expect(
			instance.validate({
				"\u09EA\u09E8": "khajit has wares if you have coin",
			}),
		).toBeTruthy();
	});
});
