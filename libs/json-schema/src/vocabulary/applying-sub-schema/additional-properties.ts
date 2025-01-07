import { keys } from "@imhonglu/type-object";
import { Schema } from "../../schema.js";
import { is } from "../../utils/is.js";
import { keywordHandler } from "../keyword-handler.js";

keywordHandler.register("additionalProperties", (schema, context) => {
	const subSchema = Schema.from(schema.additionalProperties, context);

	const propertyNames = new Set(Object.keys(schema.properties ?? {}));
	const patterns = Object.keys(schema.patternProperties ?? {}).map(
		(pattern) => new RegExp(pattern),
	);

	const isAdditionalPropertyName = (propertyName: string) =>
		propertyNames.has(propertyName)
			? false
			: !patterns.some((pattern) => pattern.test(propertyName));

	return (data) => {
		if (!is.object(data) || schema.additionalProperties === true) {
			return true;
		}

		const additionalPropertyNames = keys(data).filter(isAdditionalPropertyName);

		return schema.additionalProperties === false
			? additionalPropertyNames.length === 0
			: !additionalPropertyNames.some(
					(propertyName) => !subSchema.validate(data[propertyName]),
				);
	};
});
