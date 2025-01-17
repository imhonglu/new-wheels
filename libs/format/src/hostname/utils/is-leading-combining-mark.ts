const pattern = /\p{M}/u;

/**
 * @see {@link https://datatracker.ietf.org/doc/html/rfc5891#section-4.2.3.2 | RFC 5891#section-4.2.3.2}
 */
export function isLeadingCombiningMark(label: string): boolean {
  return pattern.test(label.charAt(0));
}
