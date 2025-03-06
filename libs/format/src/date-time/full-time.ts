import { characterSet, concat, digit, oneOf } from "@imhonglu/pattern-builder";
import type { SafeExecutor } from "@imhonglu/toolkit";
import { Serializable } from "../utils/serializable/serializable.js";
import { InvalidFullTimeError } from "./errors/invalid-full-time-error.js";
import type { FullDate } from "./full-date.js";
import { isValidHour } from "./utils/is-valid-hour.js";
import { isValidMinute } from "./utils/is-valid-minute.js";
import { isValidSecond } from "./utils/is-valid-second.js";
import { padZero } from "./utils/pad-zero.js";

const twoDigits = digit.clone().exact(2);
const groupedTwoDigits = twoDigits.clone().group();
const pattern = concat(
  groupedTwoDigits,
  ":",
  groupedTwoDigits,
  ":",
  groupedTwoDigits,

  concat(characterSet("."), digit.clone().oneOrMore()).group().optional(),

  oneOf(
    characterSet("Z", "z"),
    concat(
      characterSet("+", "-"),
      twoDigits,
      ":",
      twoDigits,
    ).nonCapturingGroup(),
  ).group(),
)
  .anchor()
  .toRegExp();

const FULL_TIME_MIN_LENGTH = 8;
const FULL_TIME_MAX_LENGTH = 21;

export interface TimeNumOffset {
  sign: "+" | "-";
  hour: number;
  minute: number;
}

/**
 * The FullTime formatter based on RFC 3339.
 *
 * @example
 * ```ts
 * FullTime.parse("12:34:56Z");
 * // { hour: 12, minute: 34, second: 56, offset: undefined }
 * ```
 *
 * @see {@link https://datatracker.ietf.org/doc/html/rfc3339#section-5.6 | RFC 3339#section-5.6}
 */
@Serializable
export class FullTime {
  public hour: number;
  public minute: number;
  public second: number;
  public secfrac?: `.${number}`;
  public offset?: TimeNumOffset;

  constructor({ hour, minute, second, secfrac, offset }: FullTime) {
    this.hour = hour;
    this.minute = minute;
    this.second = second;
    this.secfrac = secfrac;
    this.offset = offset;
  }

  public static safeParse: SafeExecutor<typeof FullTime.parse>;

  /**
   * Converts a FullTime string to a {@link FullTime} object.
   *
   * @param text - A valid FullTime string. e.g. "12:34:56Z".
   * @param referenceDate - A reference date for leap seconds.
   * @throws - {@link InvalidFullTimeError}
   */
  public static parse(
    text: string,
    /**
     * @defaultValue { year: 1970, month: 1, day: 1 }
     */
    referenceDate: FullDate = {
      year: 1970,
      month: 1,
      day: 1,
    },
  ) {
    if (
      text.length < FULL_TIME_MIN_LENGTH ||
      text.length > FULL_TIME_MAX_LENGTH
    ) {
      throw new InvalidFullTimeError(text);
    }

    const match = text.match(pattern);

    if (!match) {
      throw new InvalidFullTimeError(text);
    }

    const hour = Number.parseInt(match[1]);
    const minute = Number.parseInt(match[2]);
    const second = Number.parseInt(match[3]);
    const secfrac = match[4] as FullTime["secfrac"];

    const offsetString = match[5];
    const offset =
      offsetString.length !== 1
        ? {
            sign: offsetString[0] as TimeNumOffset["sign"],
            hour: Number.parseInt(offsetString.slice(1, 3)),
            minute: Number.parseInt(offsetString.slice(4)),
          }
        : undefined;

    if (
      offset &&
      (!isValidHour(offset.hour) || !isValidMinute(offset.minute))
    ) {
      throw new InvalidFullTimeError(text);
    }

    if (
      !isValidHour(hour) ||
      !isValidMinute(minute) ||
      !isValidSecond(second, {
        ...referenceDate,
        hour,
        minute,
        offset,
      })
    ) {
      throw new InvalidFullTimeError(text);
    }

    return new FullTime({
      hour,
      minute,
      second,
      secfrac,
      offset,
    });
  }

  /**
   * Converts an {@link FullTime} object to a FullTime string.
   *
   * @param value - An {@link FullTime} object.
   */
  public static stringify({ hour, minute, second, secfrac, offset }: FullTime) {
    const timezone = offset
      ? `${offset.sign}${padZero(offset.hour)}:${padZero(offset.minute)}`
      : "Z";

    return `${padZero(hour)}:${padZero(minute)}:${padZero(second)}${secfrac ?? ""}${timezone}`;
  }
}
