import { keywordHandler } from "../keyword-handler.js";

keywordHandler.register("if", (schema, schemaContext) => {
	const ifSchema = schemaContext.resolveSubSchema("if");
	const thenSchema = schema.then
		? schemaContext.resolveSubSchema("then")
		: undefined;
	const elseSchema = schema.else
		? schemaContext.resolveSubSchema("else")
		: undefined;

	return (data) => {
		const isValid = ifSchema.validate(data);

		if (isValid && thenSchema) {
			return thenSchema.validate(data);
		}

		if (!isValid && elseSchema) {
			return elseSchema.validate(data);
		}

		return true;
	};
});
