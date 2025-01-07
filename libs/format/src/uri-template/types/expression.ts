import type { Varspec } from "../varspec.js";
import type { Operator } from "./operator.js";

export interface Expression {
	operator?: Operator;
	variables: Map<string, Varspec>;
	index: [number, number];
}
