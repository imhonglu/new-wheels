import type { Match } from "./match.js";
import type { Properties } from "./properties.js";
import type { SchemaInstanceType } from "./schema-instance-type.js";

export interface CreatableMap<T> {
  null: SchemaInstanceType<T>;

  boolean: SchemaInstanceType<T>;

  number: SchemaInstanceType<T>;

  integer: SchemaInstanceType<T>;

  array: SchemaInstanceType<T>;

  string: SchemaInstanceType<T>;

  object: T extends { properties: Record<infer K, unknown> }
    ? T extends {
        required: Array<infer U extends K>;
      }
      ? // When required array is empty, all properties are optional
        [U] extends [never]
        ? { [P in K]?: SchemaInstanceType<T["properties"][P]> }
        : // When all required properties have default values, they become optional
          Exclude<U, keyof Properties<T, { hasDefault: true }>> extends never
          ? { [P in U]?: SchemaInstanceType<T["properties"][P]> }
          : // When all properties are required (no optional properties)
            Exclude<
                K,
                Exclude<U, keyof Properties<T, { hasDefault: true }>>
              > extends never
            ? { [P in U]: SchemaInstanceType<T["properties"][P]> }
            : // When there are both required and optional properties
              {
                [P in Exclude<
                  U,
                  keyof Properties<T, { hasDefault: true }>
                >]: SchemaInstanceType<T["properties"][P]>;
              } & {
                [P in Exclude<
                  K,
                  Exclude<U, keyof Properties<T, { hasDefault: true }>>
                >]?: SchemaInstanceType<T["properties"][P]>;
              }
      : // When required array is undefined, all properties are optional
        { [P in K]?: SchemaInstanceType<T["properties"][P]> }
    : Record<string, unknown>;
}

export type Creatable<T> = T extends { type: infer U }
  ? Match<U, CreatableMap<T>>
  : SchemaInstanceType<T>;
