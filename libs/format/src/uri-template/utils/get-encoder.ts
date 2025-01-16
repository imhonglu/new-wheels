import type { VariableKeyValuePair, VariableValue } from "../types/variable.js";
import type { Varspec } from "../varspec.js";
import type { OperatorExpansionRule } from "./get-operator-expansion-rule.js";

export function getEncoder(rule: OperatorExpansionRule) {
  const encode = rule.allow === "U+R" ? encodeURIComponent : encodeURI;

  return (
    varspec: Varspec,
    inputValue: VariableValue | VariableKeyValuePair,
  ) => {
    const isKeyValuePair = Array.isArray(inputValue);
    const key = (isKeyValuePair ? inputValue[0] : varspec.name) as string;
    let value = (isKeyValuePair ? inputValue[1] : inputValue)?.toString() ?? "";

    if (varspec.modifier?.type === "prefix") {
      value = value.slice(0, varspec.modifier.maxLength);
    }

    if (!rule.named) {
      return encode(value);
    }

    return rule.ifemp || value !== "" ? `${key}=${encode(value)}` : "";
  };
}
