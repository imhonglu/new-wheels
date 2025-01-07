import ts from "typescript";

export function createExpression(value: unknown): ts.Expression {
	if (typeof value === "string") {
		return ts.factory.createStringLiteral(value);
	}

	if (typeof value === "boolean") {
		return value ? ts.factory.createTrue() : ts.factory.createFalse();
	}

	if (typeof value === "number") {
		return ts.factory.createNumericLiteral(value);
	}

	if (value === null) {
		return ts.factory.createNull();
	}

	if (value === undefined) {
		return ts.factory.createIdentifier("undefined");
	}

	if (Array.isArray(value)) {
		return ts.factory.createArrayLiteralExpression(
			value.map((item) => createExpression(item)),
		);
	}

	return ts.factory.createObjectLiteralExpression(
		Object.entries(value).map(([key, value]) =>
			ts.factory.createPropertyAssignment(
				ts.factory.createStringLiteral(key),
				createExpression(value),
			),
		),
	);
}
