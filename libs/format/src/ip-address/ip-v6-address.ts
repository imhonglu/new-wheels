import type { SafeExecutor } from "@imhonglu/toolkit";
import { Serializable } from "../utils/serializable/serializable.js";
import { InvalidIpAddressError } from "./errors/invalid-ip-address-error.js";
import { IPv4Address } from "./ip-v4-address.js";
import { isValidIPv6Part } from "./utils/is-valid-part.js";

const IPV6_MIN_LENGTH = 2;
const IPV6_MAX_LENGTH = 45;
const IPV6_PARTS_MAX = 8;
const IPV6_COMPRESSED_PARTS_MAX = 7;

class SafeParse {
	constructor() {
		console.log(new.target);
	}
}

/**
 * The IPv6Address formatter based on RFC 4291 and RFC 5954.
 *
 *  @example
 * ```ts
 * IPv6Address.parse("::1"); // { segments: ["1"], compressIndex: 0, embeddedIPv4: undefined }
 * ```
 *
 * @see {@link https://datatracker.ietf.org/doc/html/rfc4291 | RFC 4291}
 * @see {@link https://datatracker.ietf.org/doc/html/rfc5954#page-3 | RFC 5954#page-3}
 */
@Serializable
export class IPv6Address {
	public readonly segments: string[];
	public readonly compressIndex?: number;
	public readonly embeddedIPv4?: IPv4Address;

	constructor({ segments, compressIndex, embeddedIPv4 }: IPv6Address) {
		this.segments = segments;
		this.compressIndex = compressIndex;
		this.embeddedIPv4 = embeddedIPv4;
	}

	public static safeParse: SafeExecutor<typeof IPv6Address.parse>;

	/**
	 * Converts a IPv6Address string to an {@link IPv6Address} object.
	 *
	 * @param text - A valid IPv6Address string. e.g. "::1".
	 * @throws - {@link InvalidIpAddressError}
	 */
	public static parse(text: string): IPv6Address {
		if (text.length < IPV6_MIN_LENGTH || text.length > IPV6_MAX_LENGTH) {
			throw new InvalidIpAddressError(text);
		}

		if (text === "::") {
			return new IPv6Address({
				segments: [],
				compressIndex: 0,
			});
		}

		const segments: string[] = [];

		let segment = "";
		let compressIndex: number | undefined;
		let embeddedIPv4: IPv4Address | undefined;

		const addSegment = () => {
			segments.push(segment);
			segment = "";
		};

		for (let i = 0; i < text.length; i++) {
			const char = text[i];
			if (char !== ":") {
				segment += char;
				continue;
			}

			const nextChar = text[i + 1];
			if (nextChar === ":") {
				if (compressIndex !== undefined) {
					throw new InvalidIpAddressError(text);
				}

				compressIndex = i;
				i++;

				// if first part is compressed, skip it
				if (i === 1) continue;
			}
			if (!isValidIPv6Part(segment)) {
				throw new InvalidIpAddressError(text);
			}
			addSegment();
		}

		const isEmbeddedIPv4 = segment.includes(".");

		// if last part is compressed, skip it
		if (compressIndex !== text.length - 2) {
			if (!isEmbeddedIPv4 && !isValidIPv6Part(segment)) {
				throw new InvalidIpAddressError(text);
			}

			if (isEmbeddedIPv4) {
				const result = IPv4Address.safeParse(segment);
				if (!result.ok) {
					throw new InvalidIpAddressError(text);
				}

				embeddedIPv4 = result.data;
			}

			addSegment();
		}

		const max =
			compressIndex !== undefined || isEmbeddedIPv4
				? IPV6_COMPRESSED_PARTS_MAX
				: IPV6_PARTS_MAX;

		if (
			compressIndex !== undefined
				? segments.length > max
				: segments.length !== max
		) {
			throw new InvalidIpAddressError(text);
		}

		return new IPv6Address({
			segments,
			compressIndex,
			embeddedIPv4,
		});
	}

	public static stringify({ segments, compressIndex }: IPv6Address) {
		const address = segments.join(":");
		if (compressIndex !== undefined) {
			const before = address.slice(0, compressIndex);
			const after = address.slice(compressIndex);
			const compress = before && after ? ":" : "::";

			return `${before}${compress}${after}`;
		}
		return address;
	}
}
