import { pattern } from "@imhonglu/pattern-builder";
import type { SafeExecutor } from "@imhonglu/toolkit";
import { Serializable } from "../utils/serializable/serializable.js";
import { iriPchar, pchar } from "./constants.js";
import { InvalidFragmentError } from "./errors/invalid-fragment-error.js";
import type { URIParseOptions } from "./types/uri-parse-options.js";

const regex = {
  iriFragment: pattern(iriPchar)
    .or(pattern.characterSet("/?"))
    .nonCapturingGroup()
    .zeroOrMore()
    .anchor()
    .compile("u"),

  fragment: pattern(pchar)
    .or(pattern.characterSet("/?"))
    .nonCapturingGroup()
    .zeroOrMore()
    .anchor()
    .compile(),
};

/**
 * The Fragment formatter based on RFC 3986.
 *
 * @example
 * ```ts
 * Fragment.parse("section1"); // { text: "section1" }
 * ```
 *
 * @see {@link https://datatracker.ietf.org/doc/html/rfc3986#section-3.5 | RFC 3986#section-3.5}
 */
@Serializable
export class Fragment {
  public text: string;
  public options?: URIParseOptions;

  public constructor({ text, options }: Fragment) {
    this.text = text;
    this.options = options;
  }

  public static safeParse: SafeExecutor<typeof Fragment.parse>;

  /**
   * Converts a Fragment string to a {@link Fragment} object.
   *
   * @param text - A valid Fragment string.
   * @throws {@link InvalidFragmentError}
   */
  public static parse(text: string, options?: URIParseOptions): Fragment {
    const fragmentPattern = options?.isIri ? regex.iriFragment : regex.fragment;

    if (!fragmentPattern.test(text)) {
      throw new InvalidFragmentError(text);
    }

    return new Fragment({ text, options });
  }

  /**
   * Converts a {@link Fragment} object to a Fragment string.
   *
   * @param value - A {@link Fragment} object.
   */
  public static stringify(value: Fragment): string {
    return value.text;
  }

  public toString(): string {
    return Fragment.stringify(this);
  }
}
