import { alpha, characterSet, concat, digit } from "@imhonglu/pattern-builder";
import type { SafeExecutor } from "@imhonglu/toolkit";
import { Serializable } from "../utils/serializable/serializable.js";
import { InvalidSchemeError } from "./errors/invalid-scheme-error.js";

const pattern = concat(
  characterSet(alpha),
  characterSet(alpha, digit, "+\\-.").nonCapturingGroup().zeroOrMore(),
)
  .anchor()
  .toRegExp();

/**
 * The Scheme formatter based on RFC 3986.
 *
 * @example
 * ```ts
 * Scheme.parse("http");
 * // {
 * //   text: "http",
 * // }
 * ```
 *
 * @see {@link https://datatracker.ietf.org/doc/html/rfc3986#section-3.1 | RFC 3986#section-3.1}
 */
@Serializable
export class Scheme {
  public text: string;

  public constructor({ text }: Scheme) {
    this.text = text;
  }

  public static safeParse: SafeExecutor<typeof Scheme.parse>;

  /**
   * Converts a Scheme string to a {@link Scheme} object.
   *
   * @param text - A valid Scheme string. e.g. "http"
   * @throws - {@link InvalidSchemeError}
   */
  public static parse(text: string): Scheme {
    if (!pattern.test(text)) {
      throw new InvalidSchemeError(text);
    }

    return new Scheme({ text });
  }

  /**
   * Converts a {@link Scheme} object to a Scheme string.
   *
   * @param value - A {@link Scheme} object.
   * @returns - A Scheme string.
   */
  public static stringify(value: Scheme): string {
    return value.text;
  }
}
