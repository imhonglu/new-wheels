import type { SafeExecutor } from "@imhonglu/toolkit";
import { Serializable } from "../utils/serializable/serializable.js";
import { InvalidIpAddressError } from "./errors/invalid-ip-address-error.js";
import { isValidIPv4Part } from "./utils/is-valid-part.js";

const IPV4_MIN_LENGTH = 7;
const IPV4_MAX_LENGTH = 15;
const IPV4_PARTS_COUNT = 4;

/**
 * The IPv4Address formatter based on RFC 2673 and RFC 5954.
 *
 * @example
 * ```ts
 * IPv4Address.parse("127.0.0.1"); // { segments: ["127", "0", "0", "1"] }
 * ```
 *
 * @see {@link https://datatracker.ietf.org/doc/html/rfc2673#page-3 | RFC 2673#page-3(obsoleted)}
 * @see {@link https://datatracker.ietf.org/doc/html/rfc5954#page-3 | RFC 5954#page-3}
 */
@Serializable
export class IPv4Address {
	public readonly segments: [string, string, string, string];

	constructor({ segments }: IPv4Address) {
		this.segments = segments;
	}

	public static safeParse: SafeExecutor<typeof IPv4Address.parse>;

	/**
	 * Converts a IPv4Address string to an {@link IPv4Address} object.
	 *
	 * @param text - A valid IPv4Address string. e.g. "127.0.0.1".
	 * @throws - {@link InvalidIpAddressError}
	 */
	public static parse(text: string): IPv4Address {
		if (text.length < IPV4_MIN_LENGTH || text.length > IPV4_MAX_LENGTH) {
			throw new InvalidIpAddressError(text);
		}

		const segments = text.split(".");

		if (segments.length !== IPV4_PARTS_COUNT) {
			throw new InvalidIpAddressError(text);
		}

		if (!segments.every(isValidIPv4Part)) {
			throw new InvalidIpAddressError(text);
		}

		return new IPv4Address({
			segments: segments as [string, string, string, string],
		});
	}

	public static stringify(value: IPv4Address) {
		return value.segments.join(".");
	}
}
