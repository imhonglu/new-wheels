export interface PropertiesOptions {
  hasDefault?: boolean;
  required?: boolean;
}

export type Properties<
  T,
  Options extends PropertiesOptions = {
    hasDefault: false;
    required: false;
  },
> = T extends {
  properties: Record<infer K, unknown>;
}
  ? Options["hasDefault"] extends true
    ? Options["required"] extends true
      ? T extends {
          required: Array<infer U extends K>;
        }
        ? {
            [P in U as T["properties"][P] extends {
              default: unknown;
            }
              ? P
              : never]: T["properties"][P];
          }
        : never
      : {
          [P in K as T["properties"][P] extends {
            default: unknown;
          }
            ? P
            : never]: T["properties"][P];
        }
    : T["properties"]
  : never;
