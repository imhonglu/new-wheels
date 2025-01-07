import type { StructuralValidation } from "../../types/json-schema/structural-validation.js";
import { is } from "../../utils/is.js";
import { keywordHandler } from "../keyword-handler.js";

keywordHandler.register("type", (schema) => {
	const types: StructuralValidation.PrimitiveType[] = is.array(schema.type)
		? schema.type
		: [schema.type];

	return (data) => types.some((type) => is[type](data));
});
