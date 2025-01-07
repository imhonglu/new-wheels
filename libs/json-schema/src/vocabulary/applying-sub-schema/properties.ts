import { hasOwn } from "@imhonglu/type-object";
import { Schema } from "../../schema.js";
import { is } from "../../utils/is.js";
import { keywordHandler } from "../keyword-handler.js";

keywordHandler.register("properties", (schema, context) => {
	const validators = Object.keys(schema.properties).map((propertyName) => ({
		propertyName,
		subSchema: Schema.from(schema.properties[propertyName], context),
	}));

	return (data) =>
		is.object(data)
			? !validators.some(({ propertyName, subSchema }) =>
					hasOwn(data, propertyName)
						? !subSchema.validate(data[propertyName])
						: false,
				)
			: true;
});
