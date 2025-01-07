export function isValidMonth(
	months: number,
): months is 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 {
	return Number.isInteger(months) && months >= 1 && months <= 12;
}
