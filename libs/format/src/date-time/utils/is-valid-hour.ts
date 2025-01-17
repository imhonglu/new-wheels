export function isValidHour(hours: number) {
  return Number.isInteger(hours) && hours >= 0 && hours <= 23;
}
