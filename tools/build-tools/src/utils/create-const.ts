import ts from "typescript";
import { createExpression } from "./create-expression.js";

export function createConst(
	identifier: string,
	value: unknown,
): ts.VariableStatement {
	return ts.factory.createVariableStatement(
		[ts.factory.createModifier(ts.SyntaxKind.ExportKeyword)],
		ts.factory.createVariableDeclarationList(
			[
				ts.factory.createVariableDeclaration(
					ts.factory.createIdentifier(identifier),
					undefined,
					undefined,
					createExpression(value),
				),
			],
			ts.NodeFlags.Const,
		),
	);
}
