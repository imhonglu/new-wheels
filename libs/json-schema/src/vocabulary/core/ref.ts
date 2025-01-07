import { keywordHandler } from "../keyword-handler.js";

keywordHandler.register("$ref", (schema, context) => (data) => {
	const ref = context.root.refMap.get(schema.$ref);

	return ref ? ref.validate(data) : true;
});
