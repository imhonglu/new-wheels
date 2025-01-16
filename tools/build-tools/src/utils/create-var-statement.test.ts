import ts from "typescript";
import { expect, test } from "vitest";
import { createVarStatement } from "./create-var-statement.js";
import { printNode } from "./print-node.js";

test("should create a var statement", () => {
  expect(printNode(createVarStatement("foo", "bar"))).toBe(
    `const foo = "bar";`,
  );
});

test("should create a var statement with modifiers", () => {
  expect(
    printNode(
      createVarStatement("foo", "bar", {
        modifiers: [ts.factory.createModifier(ts.SyntaxKind.ExportKeyword)],
      }),
    ),
  ).toBe(`export const foo = "bar";`);
});

test("should create a var statement with flag", () => {
  expect(
    printNode(createVarStatement("foo", "bar", { flag: ts.NodeFlags.Let })),
  ).toBe(`let foo = "bar";`);
});

test("should create a var statement with variable declaration list", () => {
  expect(
    printNode(
      createVarStatement(
        "foo",
        [
          ts.factory.createVariableDeclaration(
            "foo",
            undefined,
            undefined,
            ts.factory.createStringLiteral("bar"),
          ),
        ],
        { flag: ts.NodeFlags.Let },
      ),
    ),
  ).toBe(`let foo = "bar";`);
});
