export type InferPropertyKeyWithDefault<T> = T extends {
  properties: Record<string, unknown>;
}
  ? {
      [K in keyof T["properties"]]: T["properties"][K] extends {
        default: unknown;
      }
        ? K
        : never;
    }[keyof T["properties"]]
  : never;
