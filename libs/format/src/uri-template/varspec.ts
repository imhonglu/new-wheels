import { alpha, digit, pattern } from "@imhonglu/pattern-builder";
import type { SafeExecutor } from "@imhonglu/toolkit";
import { pctEncoded } from "../uri/constants.js";
import { Serializable } from "../utils/serializable/serializable.js";
import { InvalidVarspecError } from "./errors/invalid-varspec-error.js";
import type { Modifier } from "./types/modifier.js";
import { parseModifier } from "./utils/parse-modifier.js";

const regex = pattern(
  pattern(pattern.characterSet(alpha, digit, /[_.]/).or(pctEncoded))
    .or(pctEncoded)
    .nonCapturingGroup()
    .oneOrMore()
    .group(),
  pattern(pattern(":", digit.repeat(1, 3)).or(/\*/))
    .or(/\*/)
    .group()
    .optional(),
)
  .anchor()
  .compile();

/**
 * The Varspec formatter based on RFC 6570.
 *
 * @example
 * ```ts
 * Varspec.parse("name"); // { string: "name", name: "name" }
 * ```
 *
 * @example
 * ```ts
 * Varspec.parse("name*"); // { string: "name*", name: "name", modifier: { type: "explode" } }
 * ```
 *
 * @example
 * ```ts
 * Varspec.parse("name:3"); // { string: "name:3", name: "name", modifier: { type: "prefix", maxLength: 3 } }
 * ```
 *
 * @see {@link https://datatracker.ietf.org/doc/html/rfc6570#section-2.3 | RFC 6570#section-2.3}
 */
@Serializable
export class Varspec {
  public name: string;
  public modifier?: Modifier;

  public constructor({ name, modifier }: Varspec) {
    this.name = name;
    this.modifier = modifier;
  }

  public static safeParse: SafeExecutor<typeof Varspec.parse>;

  /**
   * Converts a Varspec string into a {@link Varspec} object.
   *
   * @param text - A valid Varspec string. e.g. "name:3"
   * @throws - {@link InvalidVarspecError}
   */
  public static parse(text: string): Varspec {
    const match = text.match(regex);
    if (!match) {
      throw new InvalidVarspecError(text);
    }
    if (text.startsWith(".") || text.endsWith(".")) {
      throw new InvalidVarspecError(text);
    }

    const [, name, modifier] = match;

    return new Varspec({
      name,
      modifier: modifier ? parseModifier(modifier) : undefined,
    });
  }

  /**
   * Converts an {@link Varspec} object to a Varspec string.
   *
   * @param value - An {@link Varspec} object.
   */
  public static stringify({ name, modifier }: Varspec) {
    return `${name}${modifier ? modifier.type : ""}`;
  }
}
