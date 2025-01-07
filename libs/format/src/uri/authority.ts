import { characterSet, oneOf } from "@imhonglu/pattern-builder";
import type { SafeExecutor, SafeResult } from "@imhonglu/toolkit";
import { IdnHostname } from "../hostname/idn-hostname.js";
import { IPv4Address } from "../ip-address/ip-v4-address.js";
import { IPv6Address } from "../ip-address/ip-v6-address.js";
import { Serializable } from "../utils/serializable/serializable.js";
import { pctEncoded, subDelims, unreserved } from "./constants.js";
import { InvalidAuthorityError } from "./errors/invalid-authority-error.js";

const pattern = {
	ipv4: /^\d{1,3}\./,
	ipLiteral: /^\[.+\]$/,
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
	public readonly host: IdnHostname | IPv4Address | IPv6Address;
	public readonly port?: number;

	public constructor({ userinfo, host, port }: Authority) {
		this.userinfo = userinfo;
		this.host = host;
		this.port = port;
	}

	public static safeParse: SafeExecutor<typeof Authority.parse>;

	/**
	 * Converts an Authority string to an {@link Authority} object.
	 *
	 * @param text - A valid Authority string. e.g. "example.com".
	 * @throws - {@link InvalidAuthorityError}
	 */
	public static parse(text: string): Authority {
		const atPos = text.indexOf("@");

		const userinfo = atPos !== -1 ? text.slice(0, atPos) : undefined;
		if (userinfo !== undefined && !pattern.userinfo.test(userinfo)) {
			throw new InvalidAuthorityError(text);
		}

		let host = text.slice(atPos + 1);
		let port: number | undefined;

		const colonPos = host.lastIndexOf(":");
		if (colonPos !== -1) {
			const portString = host.slice(colonPos + 1);

			if (!portString.endsWith("]")) {
				port = Number.parseInt(portString);
				host = host.slice(0, colonPos);
			}
		}

		if (port !== undefined && !Number.isInteger(port)) {
			throw new InvalidAuthorityError(text);
		}

		let type: "idn-hostname" | "ipv4-address" | "ipv6-address";
		let result: SafeResult<IdnHostname | IPv4Address | IPv6Address>;

		if (pattern.ipv4.test(host)) {
			type = "ipv4-address";
			result = IPv4Address.safeParse(host);
		} else if (pattern.ipLiteral.test(host)) {
			type = "ipv6-address";
			result = IPv6Address.safeParse(host.slice(1, -1));
		} else {
			type = "idn-hostname";
			result = IdnHostname.safeParse(host);
		}

		if (!result.ok) {
			throw new InvalidAuthorityError(text);
		}

		return new Authority({
			userinfo,
			host: result.data,
			port,
		});
	}

	public static stringify({ userinfo, host, port }: Authority): string {
		let result = "";

		if (userinfo) result += `${userinfo}@`;
		if (port) result += `:${port}`;
		if (host instanceof IPv6Address) result += `[${host}]`;
		else result += host;

		return result;
	}
}
