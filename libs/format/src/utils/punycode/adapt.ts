import { PARAMETERS } from "./constants.js";

const BASE_MINUS_T_MIN = PARAMETERS.base - PARAMETERS.tMin;

/**
 * @see {@link https://datatracker.ietf.org/doc/html/rfc3492#section-3.4}
 */
export function adapt(
	biasDelta: number,
	numPoints: number,
	isFirstTime?: boolean,
) {
	let bias = 0;

	let delta = biasDelta;
	delta = isFirstTime ? Math.floor(delta / PARAMETERS.damp) : delta >> 1;
	delta += Math.floor(delta / numPoints);

	while (delta > (BASE_MINUS_T_MIN * PARAMETERS.tMax) >> 1) {
		delta = Math.floor(delta / BASE_MINUS_T_MIN);
		bias += PARAMETERS.base;
	}

	return Math.floor(
		bias + ((BASE_MINUS_T_MIN + 1) * delta) / (delta + PARAMETERS.skew),
	);
}
