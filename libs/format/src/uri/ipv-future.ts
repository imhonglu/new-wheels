import { characterSet, concat, digit } from "@imhonglu/pattern-builder";
import type { SafeExecutor } from "@imhonglu/toolkit";
import { Serializable } from "../utils/serializable/serializable.js";
import { subDelims, unreserved } from "./constants.js";
import { InvalidIPvFutureError } from "./errors/invalid-ipv-future-error.js";

const pattern = concat(
  /[vV]/,
  digit.clone().group(),
  "\\.",
  characterSet(unreserved, subDelims, ":").oneOrMore().group(),
)
  .anchor()
  .toRegExp();

/**
 * The IPvFuture formatter based on RFC 3986.
 *
 * @example
 * ```ts
 * IPvFuture.parse("v1.something-text"); // { version: 1, address: "something-text" }
 * ```
 *
 * @see {@link https://datatracker.ietf.org/doc/html/rfc3986#section-3.2 | RFC 3986#section-3.2}
 */
@Serializable
export class IPvFuture {
  /**
   * The version flag does not indicate the IP version
   * rather, it indicates future versions of the literal format.
   *
   * @see {@link https://datatracker.ietf.org/doc/html/rfc3986#page-19 | RFC 3986#page-19}
   */
  public version: number;
  public address: string;

  public constructor({ version, address }: IPvFuture) {
    this.version = version;
    this.address = address;
  }

  public static safeParse: SafeExecutor<typeof IPvFuture.parse>;

  /**
   * Converts an IPvFuture string to an {@link IPvFuture} object.
   *
   * @param text - A valid IPvFuture string. e.g. "v1.something-text".
   * @throws - {@link InvalidIPvFutureError}
   */
  public static parse(text: string): IPvFuture {
    const match = pattern.exec(text);

    if (!match) {
      throw new InvalidIPvFutureError(text);
    }

    const [, version, address] = match;

    return new IPvFuture({
      version: Number(version),
      address,
    });
  }

  /**
   * Converts an {@link IPvFuture} object to an IPvFuture string.
   *
   * @param value - An {@link IPvFuture} object.
   */
  public static stringify({ version, address }: IPvFuture): string {
    return `v${version}.${address}`;
  }
}
