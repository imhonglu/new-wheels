import { getDaysInMonth } from "./get-days-in-month.js";

export function isValidDay(
  days: number,
  referenceDate?: Parameters<typeof getDaysInMonth>[0],
) {
  return (
    Number.isInteger(days) && days >= 1 && days <= getDaysInMonth(referenceDate)
  );
}
