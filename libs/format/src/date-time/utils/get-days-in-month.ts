import type { FullDate } from "../full-date.js";
import { isLeapYear } from "./is-leap-year.js";

/**
 * @see {@link https://datatracker.ietf.org/doc/html/rfc3339#section-5.7 | RFC 3339#section-5.7}
 */
export const MAX_DAYS = {
  1: 31,
  2: 28,
  3: 31,
  4: 30,
  5: 31,
  6: 30,
  7: 31,
  8: 31,
  9: 30,
  10: 31,
  11: 30,
  12: 31,
};

export function getDaysInMonth(
  { year, month }: Omit<FullDate, "day"> = {
    year: 1970,
    month: 1,
  },
) {
  if (!(month in MAX_DAYS)) {
    return 0;
  }

  const maxDays = MAX_DAYS[month as keyof typeof MAX_DAYS];

  return month === 2 && isLeapYear(year) ? maxDays + 1 : maxDays;
}
