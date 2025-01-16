import { characterSet, oneOf } from "@imhonglu/pattern-builder";
import type { SafeExecutor, SafeResult } from "@imhonglu/toolkit";
import { IdnHostname } from "../hostname/idn-hostname.js";
import { IPv4Address } from "../ip-address/ipv4-address.js";
import { IPv6Address } from "../ip-address/ipv6-address.js";
import { Serializable } from "../utils/serializable/serializable.js";
import {
  iriUnreserved,
  pctEncoded,
  subDelims,
  unreserved,
} from "./constants.js";
import { InvalidAuthorityError } from "./errors/invalid-authority-error.js";
import { IPvFuture } from "./ipv-future.js";
import type { URIParseOptions } from "./types/uri-parse-options.js";
import { parseAuthorityComponents } from "./utils/parse-authority-components.js";

const pattern = {
  iriUserinfo: characterSet(iriUnreserved, subDelims, ":")
    .nonCapturingGroup()
    .oneOrMore()
    .anchor()
    .toRegExp("u"),

  userinfo: oneOf(pctEncoded, characterSet(unreserved, subDelims, ":"))
    .nonCapturingGroup()
    .oneOrMore()
    .anchor()
    .toRegExp(),
};

/**
 * The Authority formatter based on RFC 3986.
 *
 * @example
 * ```ts
 * Authority.parse("example.com"); // { userinfo: undefined, host: { type: "idn-hostname" }, port: undefined }
 * ```
 *
 * @example
 * ```ts
 * Authority.parse("user:pass@example.com"); // { userinfo: "user:pass", host: { type: "idn-hostname" }, port: undefined }
 * ```
 *
 * @example
 * ```ts
 * Authority.parse("127.0.0.1:8080"); // { userinfo: undefined, host: { type: "ipv4-address" }, port: 8080 }
 * ```
 *
 * @example
 * ```ts
 * Authority.parse("[::1]:8080"); // { userinfo: undefined, host: { type: "ipv6-address" }, port: 8080 }
 * ```
 *
 * @see {@link https://datatracker.ietf.org/doc/html/rfc3986#section-3.2 | RFC 3986#section-3.2}
 */
@Serializable
export class Authority {
  public readonly userinfo?: string;
  public readonly host: IdnHostname | IPv4Address | IPv6Address | IPvFuture;
  public readonly port?: number;
  public readonly options?: URIParseOptions;

  public constructor({ userinfo, host, port, options }: Authority) {
    this.userinfo = userinfo;
    this.host = host;
    this.port = port;
    this.options = options;
  }

  public static safeParse: SafeExecutor<typeof Authority.parse>;

  /**
   * Converts an Authority string to an {@link Authority} object.
   *
   * @param text - A valid Authority string. e.g. "example.com".
   * @throws - {@link InvalidAuthorityError}
   */
  public static parse(text: string, options?: URIParseOptions): Authority {
    const authorityComponents = parseAuthorityComponents(text);

    if (!authorityComponents) {
      throw new InvalidAuthorityError(text);
    }

    const { userinfo, host, port, type } = authorityComponents;
    const userinfoPattern = options?.isIri
      ? pattern.iriUserinfo
      : pattern.userinfo;

    if (userinfo && !userinfoPattern.test(userinfo)) {
      throw new InvalidAuthorityError(text);
    }

    let result: SafeResult<IdnHostname | IPv4Address | IPv6Address | IPvFuture>;

    switch (type) {
      case "ipv4-address":
        result = IPv4Address.safeParse(host);
        break;
      case "ipv6-address":
        result = IPv6Address.safeParse(host.slice(1, -1));
        break;
      case "ipv-future":
        result = IPvFuture.safeParse(host.slice(1, -1));
        break;
      case "reg-name":
        result = IdnHostname.safeParse(host);
        break;
    }

    if (!result.ok) {
      throw new InvalidAuthorityError(text);
    }

    return new Authority({
      userinfo,
      host: result.data,
      port,
      options,
    });
  }

  /**
   * Converts an {@link Authority} object to an Authority string.
   *
   * @param value - An {@link Authority} object.
   */
  public static stringify({
    userinfo,
    host,
    port,
    options,
  }: Authority): string {
    let result = "";

    if (userinfo) result += `${userinfo}@`;
    if (host instanceof IPv6Address || host instanceof IPvFuture) {
      result += `[${host}]`;
    } else if (host instanceof IdnHostname) {
      result += options?.isIri
        ? IdnHostname.toUnicode(host)
        : IdnHostname.toAscii(host);
    } else {
      result += `${host}`;
    }
    if (port) result += `:${port}`;

    return result;
  }
}
