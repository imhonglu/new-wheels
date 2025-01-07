import { ValidationFailedError } from "../errors/validation-failed-error.js";
import type { SchemaDefinition } from "../schema.js";
import type { JsonSchema } from "../types/json-schema/index.js";
import type { ValidationFunction } from "../types/validation-function.js";
import { is } from "./is.js";

export function buildParser<T>(
	schema: JsonSchema,
	validate: ValidationFunction,
) {
	if (is.boolean(schema) || schema.type !== "object") {
		return (data: unknown): SchemaDefinition.Instance<T> => {
			if (!validate(data)) {
				throw new ValidationFailedError(data);
			}

			return data as SchemaDefinition.Instance<T>;
		};
	}

	return (data: unknown): SchemaDefinition.Instance<T> => {
		const parsed = is.string(data) ? JSON.parse(data) : data;

		if (!validate(parsed)) {
			throw new ValidationFailedError(data);
		}

		return parsed as SchemaDefinition.Instance<T>;
	};
}
