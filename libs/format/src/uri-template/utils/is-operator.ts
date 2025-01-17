import type { Operator } from "../types/operator.js";

const pattern = /^[+#./;?&=,!@|]$/;

export function isOperator(char: string): char is Operator {
  return pattern.test(char);
}
