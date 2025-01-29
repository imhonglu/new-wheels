export type InferPropertyKey<T> = T extends {
  properties: Record<infer K, unknown>;
}
  ? K
  : never;
