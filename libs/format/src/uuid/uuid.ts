import { concat, hexDigit } from "@imhonglu/pattern-builder";
import type { SafeExecutor } from "@imhonglu/toolkit";
import { Serializable } from "../utils/serializable/serializable.js";
import { InvalidUUIDError } from "./errors/invalid-uuid-error.js";

const pattern = concat(
	hexDigit.clone().exact(8).group(),
	"-",
	hexDigit.clone().exact(4).group(),
	"-",
	hexDigit.clone().exact(4).group(),
	"-",
	hexDigit.clone().exact(4).group(),
	"-",
	hexDigit.clone().exact(12).group(),
)
	.anchor()
	.toRegExp();

/**
 * The UUID formatter based on RFC 4122.
 *
 * @example
 * ```ts
 * UUID.parse("2EB8AA08-AA98-11EA-B4AA-73B441D16380"); // { segments: ["2EB8AA08", "AA98", "11EA", "B4AA", "73B441D16380"] }
 * ```
 *
 * @see {@link https://datatracker.ietf.org/doc/html/rfc4122#page-4 | RFC 4122#page-4}
 */
@Serializable
export class UUID {
	public readonly segments: [string, string, string, string, string];

	public constructor({ segments }: UUID) {
		this.segments = segments;
	}

	public static safeParse: SafeExecutor<typeof UUID.parse>;

	/**
	 * Converts a UUID string to an {@link UUID} object.
	 *
	 * @param text - A valid UUID string. e.g. "2EB8AA08-AA98-11EA-B4AA-73B441D16380".
	 * @throws - {@link InvalidUUIDError}
	 */
	public static parse(text: string): UUID {
		const match = pattern.exec(text);
		if (!match) {
			throw new InvalidUUIDError(text);
		}

		return new UUID({
			segments: match.slice(1) as [string, string, string, string, string],
		});
	}

	/**
	 * Converts an {@link UUID} object to a UUID string.
	 *
	 * @param value - An {@link UUID} object.
	 */
	public static stringify(value: UUID): string {
		return value.segments.join("-");
	}
}
