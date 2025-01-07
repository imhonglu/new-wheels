import { memoize } from "@imhonglu/toolkit";
import ts from "typescript";

const getPrinter = memoize(ts.createPrinter);
const getTempSourceFile = memoize(() =>
	ts.createSourceFile(
		"source.ts",
		"",
		ts.ScriptTarget.Latest,
		false,
		ts.ScriptKind.TS,
	),
);

export function printNode(node: ts.Node) {
	return getPrinter()
		.printNode(ts.EmitHint.Unspecified, node, getTempSourceFile())
		.replace(/\s+/g, " ");
}
