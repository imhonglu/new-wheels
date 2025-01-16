import { InvalidVarspecError } from "../errors/invalid-varspec-error.js";
import type {
  ExplodeModifier,
  Modifier,
  PrefixModifier,
} from "../types/modifier.js";

export function parseModifier(text: string): Modifier {
  if (text === "*") {
    return { type: "explode" } as ExplodeModifier;
  }

  const maxLength = Number.parseInt(text.slice(1));
  if (maxLength < 1 || maxLength > 9999) {
    throw new InvalidVarspecError(text);
  }

  return {
    type: "prefix",
    maxLength,
  } as PrefixModifier;
}
