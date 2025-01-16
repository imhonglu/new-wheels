export type VariableValue = string | number | boolean | null | undefined;
export type VariableKeyValuePair = [key: string, value: VariableValue];

export type Variable =
  | VariableValue
  | Array<VariableValue>
  | Array<VariableKeyValuePair>;
