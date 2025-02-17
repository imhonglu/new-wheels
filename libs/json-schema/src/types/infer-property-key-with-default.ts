export type InferPropertyKeyWithDefault<T> = T extends {
  properties: Record<infer K, unknown>;
  required: Array<infer U>;
}
  ? {
      [P in K & U]: T["properties"][P] extends {
        default: unknown;
      }
        ? P
        : never;
    }[K & U]
  : never;
