import { expect, test } from "vitest";
import { PatternBuilder, pattern } from "./pattern-builder.js";
import { alpha } from "./patterns/alpha.js";
import { digit } from "./patterns/digit.js";

test("toString", () => {
  expect(pattern("abc").toString()).toBe("abc");
});

test("constructs character sets from pattern inputs", () => {
  expect(PatternBuilder.characterSet(alpha, digit, /[-._~]/).toString()).toBe(
    "[a-zA-Z0-9-._~]",
  );
});

test("compiles text and raw nodes", () => {
  expect(pattern("a.b").toString()).toBe("a\\.b");
  expect(
    pattern()
      .raw(/[a-z]+/)
      .toString(),
  ).toBe("[a-z]+");
});

test("compiles concat and alternation nodes", () => {
  expect(pattern(pattern("prefix"), /[0-9]+/).toString()).toBe("prefix[0-9]+");
  expect(pattern("a").or("b").toString()).toBe("(?:a|b)");
});

test("anchor method", () => {
  expect(pattern("abc").anchor().toString()).toBe("^abc$");
  expect(pattern("abc").anchor("start").toString()).toBe("^abc");
  expect(pattern("abc").anchor("end").toString()).toBe("abc$");
});

test("group methods", () => {
  expect(pattern("abc").group().toString()).toBe("(abc)");
  expect(pattern("abc").nonCapturingGroup().toString()).toBe("(?:abc)");
  expect(
    pattern()
      .group((group) => group("abc"))
      .toString(),
  ).toBe("(abc)");
  expect(
    pattern()
      .nonCapturingGroup((group) => group("abc"))
      .toString(),
  ).toBe("(?:abc)");
  expect(
    pattern()
      .lookahead((group) => group("abc"))
      .toString(),
  ).toBe("(?=abc)");
  expect(
    pattern()
      .negateLookahead((group) => group("abc"))
      .toString(),
  ).toBe("(?!abc)");
  expect(
    pattern()
      .lookbehind((group) => group("abc"))
      .toString(),
  ).toBe("(?<=abc)");
  expect(
    pattern()
      .negateLookbehind((group) => group("abc"))
      .toString(),
  ).toBe("(?<!abc)");
});

test("quantifier methods", () => {
  expect(pattern("abc").oneOrMore().toString()).toBe("(?:abc)+");
  expect(pattern("abc").zeroOrMore().toString()).toBe("(?:abc)*");
  expect(pattern("abc").exact(3).toString()).toBe("(?:abc){3}");
  expect(pattern("abc").repeat(2, 4).toString()).toBe("(?:abc){2,4}");
  expect(pattern("abc").repeat(2).toString()).toBe("(?:abc){2,}");
  expect(pattern("abc").optional().toString()).toBe("(?:abc)?");
});

test("quantify", () => {
  expect(pattern("a").quantify({ min: 0 }).toString()).toBe("(?:a)*");
  expect(pattern("a").quantify({ min: 1 }).toString()).toBe("(?:a)+");
  expect(pattern("a").quantify({ min: 2 }).toString()).toBe("(?:a){2,}");
  expect(pattern("a").quantify({ min: 0, max: 1 }).toString()).toBe("(?:a)?");
  expect(pattern("a").quantify({ min: 3, max: 3 }).toString()).toBe("(?:a){3}");
  expect(pattern("a").quantify({ min: 2, max: 4 }).toString()).toBe(
    "(?:a){2,4}",
  );
});

test("conversion methods", () => {
  expect(pattern("abc").toString()).toBe("abc");
  expect(pattern("abc").compile()).toBeInstanceOf(RegExp);
  expect(pattern("abc").compile("g", "i").flags).toBe("gi");
});

test("chain", () => {
  expect(
    pattern()
      .group((group) => group("abc"))
      .oneOrMore()
      .anchor("start")
      .toString(),
  ).toBe("^(abc)+");
});

test("compile", () => {
  expect(pattern("abc").compile("g", "i").flags).toBe("gi");
  // @ts-expect-error
  expect(() => pattern().raw("[a-z]").compile("a")).toThrow(
    'Failed to create RegExp from "[a-z]" with flags "a"',
  );
});

test("compile", () => {
  const builder = pattern("foo");

  expect(builder.compile("i").test("FOO")).toBe(true);
});

test("callback groups and root anchors", () => {
  expect(
    pattern()
      .group((group) => group(/a/).oneOrMore(), {
        type: "non-capturing",
      })
      .anchor()
      .toString(),
  ).toBe("^(?:a+)$");

  expect(
    pattern()
      .group((group) => group("abc"))
      .anchor()
      .toString(),
  ).toBe("^(abc)$");
});

test("builders do not mutate their source", () => {
  const base = pattern().raw("a|b");

  expect(base.oneOrMore().toString()).toBe("(?:a|b)+");
  expect(base.toString()).toBe("a|b");
});
