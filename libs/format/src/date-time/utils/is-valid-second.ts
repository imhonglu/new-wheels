import { getSeconds } from "./get-seconds.js";

export function isValidSecond(
	seconds: number,
	referenceDate?: Parameters<typeof getSeconds>[0],
) {
	return (
		Number.isInteger(seconds) &&
		seconds >= 0 &&
		seconds <= getSeconds(referenceDate)
	);
}
