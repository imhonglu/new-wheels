import ts from "typescript";

const RESERVED_KEYS = ["__proto__"];

export function createVarExpression(value: unknown): ts.Expression {
  if (typeof value === "string") {
    return ts.factory.createStringLiteral(value);
  }

  if (typeof value === "boolean") {
    return value ? ts.factory.createTrue() : ts.factory.createFalse();
  }

  if (typeof value === "number") {
    if (value < 0) {
      return ts.factory.createPrefixUnaryExpression(
        ts.SyntaxKind.MinusToken,
        ts.factory.createNumericLiteral(Math.abs(value)),
      );
    }
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
      value.map((item) => createVarExpression(item)),
    );
  }

  return ts.factory.createObjectLiteralExpression(
    Object.entries(value).map(([key, value]) =>
      ts.factory.createPropertyAssignment(
        RESERVED_KEYS.includes(key)
          ? ts.factory.createComputedPropertyName(
              ts.factory.createStringLiteral(key),
            )
          : ts.factory.createStringLiteral(key),
        createVarExpression(value),
      ),
    ),
  );
}
