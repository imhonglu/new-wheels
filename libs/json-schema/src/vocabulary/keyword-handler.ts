import type { Schema } from "../schema.js";
import type { ObjectSchema } from "../types/json-schema/index.js";
import type { ValidationFunction } from "../types/validation-function.js";

const map = new Map<string, KeywordHandler>();

export type EnsuredKeywordSchema<T> = T extends keyof ObjectSchema
  ? ObjectSchema & {
      [P in T]-?: Exclude<ObjectSchema[P], undefined> | Schema;
    }
  : ObjectSchema;

export type KeywordHandlerParams<T> = [
  schema: EnsuredKeywordSchema<T>,
  schemaContext: Schema<EnsuredKeywordSchema<T>>,
];

export type KeywordHandler<T = undefined> =
  | ((...args: KeywordHandlerParams<T>) => void)
  | ((...args: KeywordHandlerParams<T>) => ValidationFunction);

export const keywordHandler = {
  register<T extends keyof ObjectSchema>(
    keyword: T,
    handler: KeywordHandler<T>,
  ) {
    Object.defineProperty(handler, "name", { value: keyword });

    map.set(keyword, handler as KeywordHandler);
  },

  get<T extends keyof ObjectSchema>(keyword: T) {
    return map.get(keyword);
  },
};
