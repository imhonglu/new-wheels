import type { SafeExecutor } from "@imhonglu/toolkit";
import { Serializable } from "../utils/serializable/serializable.js";
import { InvalidHostnameError } from "./errors/invalid-hostname-error.js";
import { hasValidHostnameLength } from "./utils/has-valid-hostname-length.js";
import { isValidLabel } from "./utils/is-valid-label.js";

/**
 * The Hostname formatter based on RFC 1034.
 *
 * @example
 * ```ts
 * Hostname.parse("example.com"); // { labels: ["example", "com"], tld: ".com" }
 * ```
 *
 * @see {@link https://datatracker.ietf.org/doc/html/rfc1034#page-11 | RFC 1034#page-11}
 */
@Serializable
export class Hostname {
  public readonly labels: string[];
  public readonly tld?: string;

  constructor({ labels, tld }: Hostname) {
    this.labels = labels;
    this.tld = tld;
  }

  public static safeParse: SafeExecutor<typeof Hostname.parse>;

  /**
   * Converts a Hostname string to a {@link Hostname} object.
   *
   * @param text - A valid Hostname string. e.g. "example.com".
   * @throws - {@link InvalidHostnameError}
   */
  public static parse(text: string): Hostname {
    if (!hasValidHostnameLength(text)) {
      throw new InvalidHostnameError(text);
    }

    const labels = text.split(".");

    if (!labels.every(isValidLabel)) {
      throw new InvalidHostnameError(text);
    }

    return new Hostname({
      labels,
      tld: labels.length > 1 ? `.${labels[labels.length - 1]}` : undefined,
    });
  }

  /**
   * Converts an {@link Hostname} object to a Hostname string.
   *
   * @param value - An {@link Hostname} object.
   */
  public static stringify({ labels }: Hostname) {
    return labels.join(".");
  }
}
