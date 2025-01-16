import { keywordHandler } from "../keyword-handler.js";

keywordHandler.register("allOf", (schema, schemaContext) => {
	const subSchemas = schema.allOf.map((_, index) =>
		schemaContext.resolveSubSchema("allOf", index),
	);

	return (data) => subSchemas.every((subSchema) => subSchema.validate(data));
});
