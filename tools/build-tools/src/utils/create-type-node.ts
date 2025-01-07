import ts from "typescript";

export type DataType =
	| string
	| StringConstructor
	| BooleanConstructor
	| NumberConstructor
	| BigIntConstructor
	| null
	| undefined
	| DataType[]
	| {
			[key: string]: DataType | DataType[];
	  };

export function createTypeNode(type: DataType): ts.TypeNode {
	switch (type) {
		case String:
			return ts.factory.createKeywordTypeNode(ts.SyntaxKind.StringKeyword);
		case Boolean:
			return ts.factory.createKeywordTypeNode(ts.SyntaxKind.BooleanKeyword);
		case Number:
			return ts.factory.createKeywordTypeNode(ts.SyntaxKind.NumberKeyword);
		case BigInt:
			return ts.factory.createKeywordTypeNode(ts.SyntaxKind.BigIntKeyword);
		case undefined:
			return ts.factory.createKeywordTypeNode(ts.SyntaxKind.UndefinedKeyword);
		case null:
			return ts.factory.createLiteralTypeNode(ts.factory.createNull());
		default:
			if (typeof type === "string") {
				return ts.factory.createLiteralTypeNode(
					ts.factory.createStringLiteral(type),
				);
			}
			if (Array.isArray(type)) {
				return ts.factory.createUnionTypeNode(
					type.map((item) => createTypeNode(item)),
				);
			}

			return ts.factory.createTypeLiteralNode(
				Object.entries(type).map(([key, value]) =>
					ts.factory.createPropertySignature(
						undefined,
						ts.factory.createStringLiteral(key),
						undefined,
						createTypeNode(value),
					),
				),
			);
	}
}
