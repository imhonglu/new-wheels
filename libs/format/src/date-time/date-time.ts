import { characterSet, concat } from "@imhonglu/pattern-builder";
import type { SafeExecutor } from "@imhonglu/toolkit";
import { Serializable } from "../utils/serializable/serializable.js";
import { InvalidDateTimeError } from "./errors/invalid-date-time-error.js";
import type { InvalidFullDateError } from "./errors/invalid-full-date-error.js";
import type { InvalidFullTimeError } from "./errors/invalid-full-time-error.js";
import { FullDate } from "./full-date.js";
import { FullTime } from "./full-time.js";

const separator = characterSet("t", "T");
const notSeparators = separator.clone().negate().oneOrMore().group();

const pattern = concat(notSeparators, separator, notSeparators)
	.nonCapturingGroup()
	.anchor()
	.toRegExp();

const DATE_TIME_MAX_LENGTH = 29;
const DATE_TIME_MIN_LENGTH = 20;

/**
 * The DateTime formatter based on RFC 3339.
 *
 * @example
 * ```ts
 * DateTime.parse("2021-01-01T12:34:56Z");
 * // {
 * //   date: { year: 2021, month: 1, day: 1 },
 * //   time: { hour: 12, minute: 34, second: 56, offset: { sign: "+", hour: 0, minute: 0 } }
 * // }
 * ```
 *
 * @see {@link https://datatracker.ietf.org/doc/html/rfc3339#section-5.6 | RFC 3339#section-5.6}
 */
@Serializable
export class DateTime {
	public readonly date: FullDate;
	public readonly time: FullTime;

	constructor({ date, time }: DateTime) {
		this.date = date;
		this.time = time;
	}

	public static safeParse: SafeExecutor<typeof DateTime.parse>;
	/**
	 * Converts a DateTime string to a {@link DateTime} object.
	 *
	 * @param text - A valid DateTime string. e.g. "2021-01-01T12:34:56Z".
	 * @throws - {@link InvalidDateTimeError}
	 * @throws - {@link InvalidFullDateError}
	 * @throws - {@link InvalidFullTimeError}
	 */
	public static parse(text: string): DateTime {
		if (
			text.length < DATE_TIME_MIN_LENGTH ||
			text.length > DATE_TIME_MAX_LENGTH
		) {
			throw new InvalidDateTimeError(text);
		}

		const match = pattern.exec(text);
		if (!match) {
			throw new InvalidDateTimeError(text);
		}

		const [, dateText, timeText] = match;
		const date = FullDate.parse(dateText);

		return new DateTime({
			date,
			time: FullTime.parse(timeText, date),
		});
	}

	public static stringify({ date, time }: DateTime) {
		return `${FullDate.stringify(date)}T${FullTime.stringify(time)}`;
	}
}
