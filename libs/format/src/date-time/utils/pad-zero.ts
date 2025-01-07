export function padZero(digit: string | number, length = 2) {
	return digit.toString().padStart(length, "0");
}
