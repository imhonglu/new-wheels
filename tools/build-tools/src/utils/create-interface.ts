import ts from "typescript";
import { type DataType, createTypeNode } from "./create-type-node.js";

export function createProperties(
	properties: Record<string, DataType>,
): ts.TypeElement[] {
	return Object.entries(properties).map(([key, value]) =>
		ts.factory.createPropertySignature(
			undefined,
			ts.factory.createStringLiteral(key),
			undefined,
			createTypeNode(value),
		),
	);
}

export function createInterface(
	identifier: string,
	properties: Record<string, DataType>,
): ts.InterfaceDeclaration {
	return ts.factory.createInterfaceDeclaration(
		[ts.factory.createModifier(ts.SyntaxKind.ExportKeyword)],
		ts.factory.createIdentifier(identifier),
		undefined,
		undefined,
		createProperties(properties),
	);
}

export function createType(
	identifier: string,
	type: DataType,
): ts.TypeAliasDeclaration {
	return ts.factory.createTypeAliasDeclaration(
		[ts.factory.createModifier(ts.SyntaxKind.ExportKeyword)],
		ts.factory.createIdentifier(identifier),
		undefined,
		createTypeNode(type),
	);
}
