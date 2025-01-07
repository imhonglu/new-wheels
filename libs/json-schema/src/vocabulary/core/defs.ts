import { Schema } from "../../schema.js";
import { keywordHandler } from "../keyword-handler.js";

keywordHandler.register("$defs", (schema, context) => {
	for (const key in schema.$defs) {
		context.root.refMap.set(
			`#/$defs/${key}`,
			Schema.from(schema.$defs[key], context),
		);
	}
});
