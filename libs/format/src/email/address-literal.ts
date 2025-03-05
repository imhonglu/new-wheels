import type { SafeExecutor } from "@imhonglu/toolkit";
import { IPv4Address } from "../ip-address/ipv4-address.js";
import { IPv6Address } from "../ip-address/ipv6-address.js";
import { Serializable } from "../utils/serializable/serializable.js";
import { InvalidEmailDomainError } from "./errors/invalid-email-domain-error.js";

/**
 * The AddressLiteral formatter based on RFC 5321.
 *
 * @example
 * ```ts
 * AddressLiteral.parse("[IPv6:::1]");
 * // { segments: ["1"], compressIndex: 0, embeddedIPv4: undefined, type: "ipv6-address" }
 * ```
 *
 * @example
 * ```ts
 * AddressLiteral.parse("[127.0.0.1]");
 * // { segments: ["127", "0", "0", "1"], type: "ipv4-address" }
 * ```
 *
 * @see {@link https://datatracker.ietf.org/doc/html/rfc5321#section-4.1.3 | RFC 5321#section-4.1.3}
 */
@Serializable
export class AddressLiteral {
  public address: IPv4Address | IPv6Address;

  constructor({ address }: AddressLiteral) {
    this.address = address;
  }

  public static safeParse: SafeExecutor<typeof AddressLiteral.parse>;

  /**
   * Converts a AddressLiteral string to a {@link AddressLiteral} object.
   *
   * @param text - A valid AddressLiteral string. e.g. "[IPv6:::1]".
   * @throws - {@link InvalidEmailDomainError}
   */
  public static parse(text: string): AddressLiteral {
    const isIPv6Address = text.startsWith("[IPv6:");
    const ipAddress = isIPv6Address ? IPv6Address : IPv4Address;
    const result = ipAddress.safeParse(text.slice(isIPv6Address ? 6 : 1, -1));

    if (!result.ok) {
      throw new InvalidEmailDomainError(text);
    }

    return new AddressLiteral({
      address: result.data,
    });
  }

  /**
   * Converts an {@link AddressLiteral} object to an AddressLiteral string.
   *
   * @param value - An {@link AddressLiteral} object.
   */
  public static stringify(domain: AddressLiteral) {
    if (domain.address instanceof IPv6Address) {
      return `[IPv6:${domain.address}]`;
    }

    return `[${domain.address}]`;
  }
}
