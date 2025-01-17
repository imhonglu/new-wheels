import type { FullDate } from "../full-date.js";
import type { FullTime } from "../full-time.js";
import { padZero } from "./pad-zero.js";

export const DEFAULT_MAX_SECONDS = 59;

/**
 * @see {@link https://datatracker.ietf.org/doc/html/rfc3339#appendix-D | RFC 3339#appendix-D}
 * @see {@link https://en.wikipedia.org/wiki/Leap_second | Wiki#Leap_second}
 */
export const LEAP_SECONDS = {
  "1972-06-30": 1,
  "1972-12-31": 1,
  "1973-12-31": 1,
  "1974-12-31": 1,
  "1975-12-31": 1,
  "1976-12-31": 1,
  "1977-12-31": 1,
  "1978-12-31": 1,
  "1979-12-31": 1,
  "1981-06-30": 1,
  "1982-06-30": 1,
  "1983-06-30": 1,
  "1985-06-30": 1,
  "1987-12-31": 1,
  "1989-12-31": 1,
  "1990-12-31": 1,
  "1992-06-30": 1,
  "1993-06-30": 1,
  "1994-06-30": 1,
  "1995-12-31": 1,
  "1997-06-30": 1,
  "1998-12-31": 1,
  "2005-12-31": 1,
  "2008-12-31": 1,
  "2012-06-30": 1,
  "2015-06-30": 1,
  "2016-12-31": 1,
};

export function getSeconds(
  datetime: Omit<FullDate & FullTime, "second" | "string"> = {
    year: 1970,
    month: 1,
    day: 1,
    hour: 0,
    minute: 0,
  },
) {
  let utcDate = new Date(
    Date.UTC(
      datetime.year,
      datetime.month - 1,
      datetime.day,
      datetime.hour,
      datetime.minute,
    ),
  );

  if (datetime.offset) {
    const { sign, hour, minute } = datetime.offset;
    const timeOffset = `${sign}${padZero(hour)}:${padZero(minute)}`;

    utcDate = new Date(utcDate.toISOString().replace("Z", timeOffset));
  }

  const hour = utcDate.getUTCHours();
  const minute = utcDate.getUTCMinutes();
  if (hour !== 23 || minute !== 59) {
    return DEFAULT_MAX_SECONDS;
  }

  const year = utcDate.getUTCFullYear();
  const month = utcDate.getUTCMonth() + 1;
  const day = utcDate.getUTCDate();

  const dateString = `${year}-${month}-${day}` as keyof typeof LEAP_SECONDS;

  return DEFAULT_MAX_SECONDS + (LEAP_SECONDS[dateString] ?? 0);
}
