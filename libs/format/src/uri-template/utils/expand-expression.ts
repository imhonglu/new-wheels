import { VARIABLE_SEPARATOR } from "../constants.js";
import type { Expression } from "../types/expression.js";
import type { Variable } from "../types/variable.js";
import { getEncoder } from "./get-encoder.js";
import { getOperatorExpansionRule } from "./get-operator-expansion-rule.js";

export function expandExpression(
  expression: Expression,
  values: Record<string, Variable>,
) {
  const rule = getOperatorExpansionRule(expression.operator);
  const encode = getEncoder(rule);

  const expandedParts: string[] = [];

  for (const [varname, varspec] of expression.variables) {
    let inputValue = values[varname];

    if (Array.isArray(inputValue) && varspec.modifier?.type !== "explode") {
      inputValue = inputValue.join(VARIABLE_SEPARATOR);
    }

    if (!Array.isArray(inputValue)) {
      expandedParts.push(encode(varspec, inputValue));
      continue;
    }

    for (const item of inputValue) {
      expandedParts.push(encode(varspec, item));
    }
  }

  return rule.first + expandedParts.join(rule.sep);
}
