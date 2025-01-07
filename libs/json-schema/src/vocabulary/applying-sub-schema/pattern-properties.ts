import { keys } from "@imhonglu/type-object";
import { Schema } from "../../schema.js";
import { is } from "../../utils/is.js";
import { keywordHandler } from "../keyword-handler.js";

keywordHandler.register("patternProperties", (schema, context) => {
	const validators = Object.keys(schema.patternProperties).map(
		(propertyName) => ({
			pattern: new RegExp(propertyName),
			subSchema: Schema.from(schema.patternProperties[propertyName], context),
		}),
	);

	return (data) => {
		if (!is.object(data)) {
			return true;
		}

		for (const propertyName of keys(data)) {
			if (
				validators.some(({ pattern, subSchema }) =>
					pattern.test(propertyName)
						? !subSchema.validate(data[propertyName])
						: false,
				)
			) {
				return false;
			}
		}

		return true;
	};
});
