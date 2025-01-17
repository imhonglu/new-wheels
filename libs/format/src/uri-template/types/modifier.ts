export type LiteralModifier = "*" | `:${number}` | undefined;

export interface PrefixModifier {
  type: "prefix";
  maxLength?: number;
}

export interface ExplodeModifier {
  type: "explode";
}

export type Modifier = PrefixModifier | ExplodeModifier;
