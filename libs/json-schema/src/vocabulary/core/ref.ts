import { keywordHandler } from "../keyword-handler.js";

keywordHandler.register("$ref", (schema, schemaContext) => {
	const resolveReference = (referenceUri: string) => {
		const normalizedRefPath = schemaContext.uri
			? referenceUri.replace(schemaContext.uri, "")
			: referenceUri;

		if (normalizedRefPath === "#") {
			return schemaContext.root;
		}

		const targetSchema = schemaContext.refMap.get(normalizedRefPath);
		if (!targetSchema) {
			return;
		}

		// Copy related references to new context
		for (const [existingRefPath, referencedSchema] of schemaContext.refMap) {
			const isUnrelatedRef = !existingRefPath.startsWith(referencedSchema.path);
			const isSelfReference = existingRefPath === schemaContext.path;

			if (isUnrelatedRef || isSelfReference) {
				continue;
			}

			const newReferencePath = existingRefPath.replace(
				referencedSchema.path,
				schemaContext.path,
			);

			if (schemaContext.refMap.has(newReferencePath)) {
				continue;
			}
			schemaContext.refMap.set(newReferencePath, referencedSchema);
		}

		return targetSchema;
	};

	let resolvedSchema = resolveReference(schema.$ref);

	return (data) => {
		if (!resolvedSchema) {
			resolvedSchema = resolveReference(schema.$ref);
		}

		return resolvedSchema ? resolvedSchema.validate(data) : true;
	};
});
