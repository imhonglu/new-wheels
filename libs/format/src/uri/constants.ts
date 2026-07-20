// cspell:disable
import { alpha, digit, hexDigit, pattern } from "@imhonglu/pattern-builder";

export const pctEncoded = pattern("%", hexDigit.exact(2));
export const subDelims = pattern.characterSet(/[!$&'()*+,;=]/);

export const unreserved = pattern.characterSet(alpha, digit, /[-._~]/);
export const pchar = pattern(pctEncoded).or(
  pattern.characterSet(unreserved, subDelims, /[:@]/),
);

export const ucschar = pattern.characterSet(
  "\\u{A0}-\\u{D7FF}",
  "\\u{F900}-\\u{FDCF}",
  "\\u{FDF0}-\\u{FFEF}",
  "\\u{10000}-\\u{1FFFD}",
  "\\u{20000}-\\u{2FFFD}",
  "\\u{30000}-\\u{3FFFD}",
  "\\u{40000}-\\u{4FFFD}",
  "\\u{50000}-\\u{5FFFD}",
  "\\u{60000}-\\u{6FFFD}",
  "\\u{70000}-\\u{7FFFD}",
  "\\u{80000}-\\u{8FFFD}",
  "\\u{90000}-\\u{9FFFD}",
  "\\u{A0000}-\\u{AFFFD}",
  "\\u{B0000}-\\u{BFFFD}",
  "\\u{C0000}-\\u{CFFFD}",
  "\\u{D0000}-\\u{DFFFD}",
  "\\u{E1000}-\\u{EFFFD}",
);

export const iriPrivate = pattern.characterSet(
  "\\u{E000}-\\u{F8FF}",
  "\\u{F0000}-\\u{FFFFD}",
  "\\u{100000}-\\u{10FFFD}",
);

export const iriUnreserved = pattern.characterSet(
  alpha,
  digit,
  /[-._~]/,
  ucschar,
);
export const iriPchar = pattern(pctEncoded).or(
  pattern.characterSet(iriUnreserved, subDelims, /[:@]/),
);
