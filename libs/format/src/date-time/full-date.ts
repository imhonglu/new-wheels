import { digit, pattern } from "@imhonglu/pattern-builder";
import type { SafeExecutor } from "@imhonglu/toolkit";
import { Serializable } from "../utils/serializable/serializable.js";
import { InvalidFullDateError } from "./errors/invalid-full-date-error.js";
import { isValidDay } from "./utils/is-valid-day.js";
import { padZero } from "./utils/pad-zero.js";

const fourDigits = digit.exact(4).group();
const twoDigits = digit.exact(2).group();
const regex = pattern(fourDigits, "-", twoDigits, "-", twoDigits)
  .anchor()
  .compile();

const FULL_DATE_LENGTH = 10;

/**
 * The FullDate formatter based on RFC 3339.
 *
 * @example
 * ```ts
 * FullDate.parse("2021-01-01");
 * // { year: 2021, month: 1, day: 1 }
 * ```
 *
 * @see {@link https://datatracker.ietf.org/doc/html/rfc3339#section-5.6 | RFC 3339#section-5.6}
 */
@Serializable
export class FullDate {
  public year: number;
  public month: number;
  public day: number;

  constructor({ year, month, day }: FullDate) {
    this.year = year;
    this.month = month;
    this.day = day;
  }

  public static safeParse: SafeExecutor<typeof FullDate.parse>;

  /**
   * Converts a FullDate string to a {@link FullDate} object.
   *
   * @param text - A valid FullDate string. e.g. "2021-01-01".
   * @throws - {@link InvalidFullDateError}
   */
  public static parse(text: string) {
    if (text.length !== FULL_DATE_LENGTH) {
      throw new InvalidFullDateError(text);
    }

    const match = text.match(regex);

    if (!match) {
      throw new InvalidFullDateError(text);
    }

    const [, year, month, day] = match.map(Number);

    if (!isValidDay(day, { year, month })) {
      throw new InvalidFullDateError(text);
    }

    return new FullDate({
      year,
      month,
      day,
    });
  }

  /**
   * Converts an {@link FullDate} object to a FullDate string.
   *
   * @param value - An {@link FullDate} object.
   */
  public static stringify({ year, month, day }: FullDate) {
    return `${year}-${padZero(month)}-${padZero(day)}`;
  }
}
