/**
 * @see {@link https://github.com/nodejs/node/blob/60bd4fd2cc7d59440a8b55199dbc060f82655457/lib/punycode.js#L108 | NodeJS Punycode#L108}
 *
 * @param string The Unicode input string (UCS-2).
 * @returns The new array of code points.
 */
function decode(string: string) {
  const output = [];

  const length = string.length;

  let counter = 0;

  while (counter < length) {
    const value = string.charCodeAt(counter++);

    if (value >= 0xd800 && value <= 0xdbff && counter < length) {
      // It's a high surrogate, and there is a next character.
      const extra = string.charCodeAt(counter++);
      if ((extra & 0xfc00) === 0xdc00) {
        // Low surrogate.
        output.push(((value & 0x3ff) << 10) + (extra & 0x3ff) + 0x10000);
      } else {
        // It's an unmatched surrogate; only append this code unit, in case the
        // next code unit is the high surrogate of a surrogate pair.
        output.push(value);
        counter--;
      }
    } else {
      output.push(value);
    }
  }

  return output;
}

/**
 * @see {@link https://github.com/nodejs/node/blob/60bd4fd2cc7d59440a8b55199dbc060f82655457/lib/punycode.js#L140 | NodeJS Punycode#L140}
 *
 * @param codePoints The array of numeric code points.
 * @returns The new Unicode string (UCS-2).
 */
function encode(codePoints: number[]) {
  return String.fromCodePoint(...codePoints);
}

export const ucs2 = {
  decode,
  encode,
};
