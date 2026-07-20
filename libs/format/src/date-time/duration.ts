import { digit, pattern } from "@imhonglu/pattern-builder";
import type { SafeExecutor } from "@imhonglu/toolkit";
import { Serializable } from "../utils/serializable/serializable.js";
import { InvalidDurationError } from "./errors/invalid-duration-error.js";

const oneMoreDigits = digit.oneOrMore();
const datePattern = pattern(
  "P",
  pattern(oneMoreDigits, "Y").group().optional(),
  pattern(oneMoreDigits, "M").group().optional(),
  pattern(oneMoreDigits, "D").group().optional(),

  pattern(
    "T",
    pattern(oneMoreDigits, "H").group().optional(),
    pattern(oneMoreDigits, "M").group().optional(),
    pattern(oneMoreDigits, "S").group().optional(),
  )
    .group()
    .optional(),
)
  .anchor()
  .nonCapturingGroup();
const weekPattern = pattern("P", pattern(oneMoreDigits, "W").group())
  .anchor()
  .nonCapturingGroup();

const regex = pattern(datePattern).or(weekPattern).anchor().compile();

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
  public year?: number;
  public month?: number;
  public week?: number;
  public day?: number;
  public hour?: number;
  public minute?: number;
  public second?: number;

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
    const match = text.match(regex);

    if (!match) {
      throw new InvalidDurationError(text);
    }

    const week = match.pop();

    if (week) {
      return new Duration({
        week: Number.parseInt(week, 10),
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
      year: year ? Number.parseInt(year, 10) : undefined,
      month: month ? Number.parseInt(month, 10) : undefined,
      day: day ? Number.parseInt(day, 10) : undefined,
      hour: hour ? Number.parseInt(hour, 10) : undefined,
      minute: minute ? Number.parseInt(minute, 10) : undefined,
      second: second ? Number.parseInt(second, 10) : undefined,
    });
  }

  /**
   * Converts an {@link Duration} object to a Duration string.
   *
   * @param value - An {@link Duration} object.
   */
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
