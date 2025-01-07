import { expect, test } from "vitest";
import { PatternBuilder } from "./pattern-builder.js";

test("source property", () => {
	expect(new PatternBuilder("abc").source).toBe("abc");
});

test("anchor method", () => {
	expect(new PatternBuilder("abc").anchor().source).toBe("^abc$");
	expect(new PatternBuilder("abc").anchor("start").source).toBe("^abc");
	expect(new PatternBuilder("abc").anchor("end").source).toBe("abc$");
});

test("group methods", () => {
	expect(new PatternBuilder("abc").group().source).toBe("(abc)");
	expect(new PatternBuilder("abc").nonCapturingGroup().source).toBe("(?:abc)");
	expect(new PatternBuilder("abc").lookahead().source).toBe("(?=abc)");
	expect(new PatternBuilder("abc").negateLookahead().source).toBe("(?!abc)");
	expect(new PatternBuilder("abc").lookbehind().source).toBe("(?<=abc)");
	expect(new PatternBuilder("abc").negateLookbehind().source).toBe("(?<!abc)");
});

test("quantifier methods", () => {
	expect(new PatternBuilder("abc").oneOrMore().source).toBe("abc+");
	expect(new PatternBuilder("abc").zeroOrMore().source).toBe("abc*");
	expect(new PatternBuilder("abc").exact(3).source).toBe("abc{3}");
	expect(new PatternBuilder("abc").repeat(2, 4).source).toBe("abc{2,4}");
	expect(new PatternBuilder("abc").repeat(2).source).toBe("abc{2,}");
	expect(new PatternBuilder("abc").optional().source).toBe("abc?");
});

test("conversion methods", () => {
	expect(new PatternBuilder("abc").toString()).toBe("abc");
	expect(new PatternBuilder("abc").toRegExp()).toBeInstanceOf(RegExp);
	expect(new PatternBuilder("abc").toRegExp("g", "i").flags).toBe("gi");
});

test("chain", () => {
	expect(
		new PatternBuilder("abc").anchor("start").group().oneOrMore().source,
	).toBe("(^abc)+");
});
