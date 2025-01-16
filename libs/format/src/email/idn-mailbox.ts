import type { SafeExecutor } from "@imhonglu/toolkit";
import { IdnHostname } from "../hostname/idn-hostname.js";
import { punycode } from "../utils/punycode/punycode.js";
import { Serializable } from "../utils/serializable/serializable.js";
import { AddressLiteral } from "./address-literal.js";
import { InvalidEmailDomainError } from "./errors/invalid-email-domain-error.js";
import { InvalidLocalPartError } from "./errors/invalid-local-part-error.js";
import { InvalidMailboxError } from "./errors/invalid-mailbox-error.js";
import { LocalPart } from "./local-part.js";
import { hasValidLocalPartLength } from "./utils/has-valid-local-part-length.js";
import { hasValidMailboxLength } from "./utils/has-valid-mailbox-length.js";

/**
 * The IdnMailbox formatter based on RFC 5321.
 *
 * @example
 * ```ts
 * IdnMailbox.parse("john.doe\@한국.com");
 * // {
 * //   localPart: {
 * //     unicode: "john.doe",
 * //     ascii: "john.doe"
 * //   },
 * //   domain: {
 * //     unicode: { labels: ["한국", "com"], tld: ".com" },
 * //     ascii: { labels: ["xn--3e0b707e", "com"], tld: ".com" },
 * //     type: "idn-hostname"
 * //   }
 * // }
 * ```
 *
 * @see {@link https://datatracker.ietf.org/doc/html/rfc5321#section-4.1.2 | RFC 5321#section-4.1.2}
 */
@Serializable
export class IdnMailbox {
  public readonly localPart: {
    unicode: string;
    ascii: string;
  };
  public readonly domain: AddressLiteral | IdnHostname;

  constructor({ localPart, domain }: IdnMailbox) {
    this.localPart = localPart;
    this.domain = domain;
  }

  public static safeParse: SafeExecutor<typeof IdnMailbox.parse>;

  /**
   * Converts a IdnMailbox string to a {@link IdnMailbox} object.
   *
   * @param text - A valid IdnMailbox string. e.g. "john.doe\@한국.com".
   * @throws - {@link InvalidMailboxError}
   * @throws - {@link InvalidLocalPartError}
   * @throws - {@link InvalidEmailDomainError}
   */
  public static parse(text: string): IdnMailbox {
    if (!hasValidMailboxLength(text)) {
      throw new InvalidMailboxError(text);
    }

    const atPos = text.lastIndexOf("@");

    if (atPos === -1) {
      throw new InvalidMailboxError(text);
    }

    const unicodeLocalPartText = punycode.toUnicode(text.slice(0, atPos));

    if (!hasValidLocalPartLength(unicodeLocalPartText)) {
      throw new InvalidLocalPartError(text);
    }

    const asciiLocalPartText = LocalPart.parse(
      punycode.toASCII(unicodeLocalPartText),
    ).toString();

    const domainText = text.slice(atPos + 1);

    if (domainText.startsWith("[") && domainText.endsWith("]")) {
      const domain = AddressLiteral.parse(domainText);

      return new IdnMailbox({
        localPart: {
          unicode: unicodeLocalPartText,
          ascii: asciiLocalPartText,
        },
        domain,
      });
    }

    const domainParseResult = IdnHostname.safeParse(domainText);

    if (!domainParseResult.ok) {
      throw new InvalidEmailDomainError(text);
    }

    return new IdnMailbox({
      localPart: {
        unicode: unicodeLocalPartText,
        ascii: asciiLocalPartText,
      },
      domain: domainParseResult.data,
    });
  }

  /**
   * Converts an {@link IdnMailbox} object to an IdnMailbox string.
   *
   * @param value - An {@link IdnMailbox} object.
   */
  public static stringify({ localPart, domain }: IdnMailbox) {
    return `${localPart.ascii}@${domain}`;
  }
}
