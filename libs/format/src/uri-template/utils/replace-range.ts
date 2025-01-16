export function replaceRange(
  string: string,
  [start, end]: [number, number],
  replacement: string,
): string {
  return string.slice(0, start) + replacement + string.slice(end);
}
