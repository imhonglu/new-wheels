import { concat, digit, oneOf } from "@imhonglu/pattern-builder";
import type { SafeExecutor } from "@imhonglu/toolkit";
import { Serializable } from "../utils/serializable/serializable.js";
import { InvalidDurationError } from "./errors/invalid-duration-error.js";

const oneMoreDigits = digit.clone().oneOrMore();
const pattern = oneOf(
	concat(
		"P",
		concat(oneMoreDigits, "Y").group().optional(),
		concat(oneMoreDigits, "M").group().optional(),
		concat(oneMoreDigits, "D").group().optional(),

		concat(
			"T",
			concat(oneMoreDigits, "H").group().optional(),
			concat(oneMoreDigits, "M").group().optional(),
			concat(oneMoreDigits, "S").group().optional(),
		)
			.group()
			.optional(),
	)
		.anchor()
		.nonCapturingGroup(),

	concat("P", concat(oneMoreDigits, "W").group()).anchor().nonCapturingGroup(),
)
	.anchor()
	.toRegExp();

/**
 * The Duration formatter based on RFC 3339.
 *
 * @example
 * ```ts
 * Duration.parse("P1Y2M3DT4H5M6S");
 * // { year: 1, month: 2, day: 3, hour: 4, minute: 5, second: 6 }
 * ```
 *
 * @see {@link https://datatracker.ietf.org/doc/html/rfc3339#page-13 | RFC 3339#page-13}
 */
@Serializable
export class Duration {
	public readonly year?: number;
	public readonly month?: number;
	public readonly week?: number;
	public readonly day?: number;
	public readonly hour?: number;
	public readonly minute?: number;
	public readonly second?: number;

	constructor(duration: Duration) {
		this.year = duration.year;
		this.month = duration.month;
		this.week = duration.week;
		this.day = duration.day;
		this.hour = duration.hour;
		this.minute = duration.minute;
		this.second = duration.second;
	}

	public static safeParse: SafeExecutor<typeof Duration.parse>;
	/**
	 * Converts a Duration string to a {@link Duration} object.
	 *
	 * @param text - A valid Duration string. e.g. "P1Y2M3DT4H5M6S".
	 * @throws - {@link InvalidDurationError}
	 */
	public static parse(text: string): Duration {
		const match = text.match(pattern);

		if (!match) {
			throw new InvalidDurationError(text);
		}

		const week = match.pop();

		if (week) {
			return new Duration({
				week: Number.parseInt(week),
			});
		}

		const [, year, month, day, timeElements, hour, minute, second] = match;

		if (
			timeElements === "T" ||
			!(year || month || day || hour || minute || second)
		) {
			throw new InvalidDurationError(text);
		}

		return new Duration({
			year: year ? Number.parseInt(year) : undefined,
			month: month ? Number.parseInt(month) : undefined,
			day: day ? Number.parseInt(day) : undefined,
			hour: hour ? Number.parseInt(hour) : undefined,
			minute: minute ? Number.parseInt(minute) : undefined,
			second: second ? Number.parseInt(second) : undefined,
		});
	}

	public static stringify({
		year,
		month,
		week,
		day,
		hour,
		minute,
		second,
	}: Duration) {
		let result = "P";

		if (week) {
			result += `${week}W`;
			return result;
		}

		if (year) result += `${year}Y`;
		if (month) result += `${month}M`;
		if (day) result += `${day}D`;

		if (hour || minute || second) result += "T";
		if (hour) result += `${hour}H`;
		if (minute) result += `${minute}M`;
		if (second) result += `${second}S`;

		return result;
	}
}
