import { Schema, SchemaSymbol } from "../../schema.js";
import type { InferSchemaType } from "../../types/infer-schema-type.js";
import type { InferSchema } from "../../types/infer-schema.js";
import type { SchemaInput } from "../../types/schema-input.js";
import { applySchemaDefaults } from "../../utils/apply-schema-defaults.js";

export function createSchemaClass<const T extends SchemaInput>(
  schemaDefinition: InferSchema<T>,
) {
  // @ts-expect-error
  const schemaContext = new Schema(schemaDefinition as T);

  const SchemaBasedClass = class {
    static [SchemaSymbol] = Schema[SchemaSymbol];

    public data: InferSchemaType<T>;

    constructor(data: InferSchemaType<T>) {
      this.data = applySchemaDefaults(data, schemaDefinition);

      if (typeof data === "object" && data !== null) {
        // biome-ignore lint/correctness/noConstructorReturn: <explanation>
        return new Proxy(this, {
          get(target, prop) {
            if (prop in data) {
              const value = data[prop as keyof typeof data];

              return typeof value === "function" ? value.bind(data) : value;
            }

            return prop in target
              ? target[prop as keyof typeof target]
              : undefined;
          },
        });
      }
    }

    static parse(data: unknown) {
      // biome-ignore lint/complexity/noThisInStatic: <explanation>
      return new this(schemaContext.parse(data));
    }

    toJSON() {
      return JSON.stringify(this.data);
    }
  } as {
    [SchemaSymbol]: typeof SchemaSymbol;

    new (
      data: InferSchemaType<T>,
    ): InferSchemaType<T> extends Exclude<object, null>
      ? T extends { type: unknown }
        ? InferSchemaType<T>
        : {
            data: InferSchemaType<T>;
          }
      : {
          data: InferSchemaType<T>;
        };

    parse: <T>(
      this: {
        new (data: InferSchemaType<T>): T;
      },
      data: unknown,
    ) => T;
  };

  return new Proxy(SchemaBasedClass, {
    get(target, prop) {
      return prop in target
        ? target[prop as keyof typeof target]
        : prop in schemaContext
          ? schemaContext[prop as keyof typeof schemaContext]
          : undefined;
    },
  }) as typeof SchemaBasedClass & typeof schemaContext;
}
