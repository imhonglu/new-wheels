import { is } from "../../utils/is.js";
import { keywordHandler } from "../keyword-handler.js";

keywordHandler.register("dependentSchemas", (schema, schemaContext) => {
	const dependentSchemas = Object.keys(schema.dependentSchemas).map(
		(propertyName) => ({
			propertyName,
			subSchema: schemaContext.resolveSubSchema(
				"dependentSchemas",
				propertyName,
			),
		}),
	);

	return (data) => {
		if (!is.object(data)) {
			return true;
		}

		return dependentSchemas.every(({ propertyName, subSchema }) =>
			Object.hasOwn(data, propertyName) ? subSchema.validate(data) : true,
		);
	};
});
