import { is } from "../../utils/is.js";
import { keywordHandler } from "../keyword-handler.js";

keywordHandler.register("propertyNames", (schema, schemaContext) => {
	const subSchema = schemaContext.resolveSubSchema("propertyNames");

	return (data) => {
		if (!is.object(data) || schema.propertyNames === true) {
			return true;
		}

		const propertyNames = Object.keys(data);

		return schema.propertyNames === false
			? propertyNames.length === 0
			: !propertyNames.some(
					(propertyName) => !subSchema.validate(propertyName),
				);
	};
});
