export function isValidMinute(minutes: number) {
  return Number.isInteger(minutes) && minutes >= 0 && minutes <= 59;
}
