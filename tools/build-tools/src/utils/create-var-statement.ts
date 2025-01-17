import ts from "typescript";
import { createVarExpression } from "./create-var-expression.js";

export function createVarStatement(
  identifier: string | ts.Identifier,
  value: unknown,
  options?: {
    modifiers?: ts.ModifierLike[];
    flag?: ts.NodeFlags;
  },
): ts.VariableStatement {
  const modifiers = options?.modifiers ?? [];
  const flag = options?.flag ?? ts.NodeFlags.Const;
  const declarations: ts.VariableDeclaration[] = [];

  const items = Array.isArray(value) ? value : [value];

  for (const item of items) {
    if (ts.isVariableDeclaration(item)) {
      declarations.push(item);
    } else {
      declarations.push(
        ts.factory.createVariableDeclaration(
          identifier,
          undefined,
          undefined,
          createVarExpression(item),
        ),
      );
    }
  }

  return ts.factory.createVariableStatement(
    modifiers,
    ts.factory.createVariableDeclarationList(declarations, flag),
  );
}
