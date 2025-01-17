import { decode } from "./decode.js";
import { encode } from "./encode.js";

/**
 * @see {@link https://github.com/nodejs/node/blob/60bd4fd2cc7d59440a8b55199dbc060f82655457/lib/punycode.js#L23 | NodeJS Punycode#L23}
 */
const pattern = {
  punycode: /^xn--/i,
  nonASCII: /[^\0-\x7F]/, // Note: U+007F DEL is excluded too.
};

/**
 * The punycode utility for encoding and decoding punycode strings.
 *
 * @see {@link https://github.com/nodejs/node/blob/main/lib/punycode.js | NodeJS Punycode}
 */
export const punycode = {
  decode,
  encode,

  isEncoded(input: string) {
    return pattern.punycode.test(input);
  },

  toASCII(input: string) {
    return pattern.nonASCII.test(input) ? `xn--${encode(input)}` : input;
  },

  toUnicode(input: string) {
    return punycode.isEncoded(input)
      ? decode(input.slice(4).toLowerCase())
      : input;
  },
};
