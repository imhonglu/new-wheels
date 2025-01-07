import { keys } from "@imhonglu/type-object";
import type { Schema, SchemaDefinition } from "../schema.js";
import type { JsonSchema, ObjectSchema } from "../types/json-schema/index.js";
import type { ValidationFunction } from "../types/validation-function.js";
import { keywordHandler } from "../vocabulary/index.js";
import { is } from "./is.js";

export function buildValidator<T extends SchemaDefinition.Type>(
	schema: JsonSchema,
	context: Schema<T>,
) {
	if (is.boolean(schema)) {
		return (data: unknown): data is SchemaDefinition.Instance<T> =>
			data !== undefined ? schema : true;
	}

	const validates = new Map<keyof ObjectSchema, ValidationFunction>();

	for (const keyword of keys(schema)) {
		if (schema[keyword] === undefined) {
			continue;
		}

		const handler = keywordHandler.get(keyword);
		if (!handler) {
			continue;
		}

		const validationFunction = handler(schema, context);
		if (validationFunction) {
			validates.set(keyword, validationFunction);
		}
	}

	return (data: unknown): data is SchemaDefinition.Instance<T> => {
		for (const [keyword, validate] of validates) {
			if (!validate(data)) {
				return false;
			}
		}

		return true;
	};
}
