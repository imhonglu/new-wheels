# @imhonglu/build-tools

[English](./README.md) | [한국어](./README_KR.md)

TypeScript compiler utilities for code-generation tools.

## Installation

```sh
pnpm add -D @imhonglu/build-tools typescript
```

`typescript` is a peer dependency. Install a version allowed by this package's
`peerDependencies`.

## Example

Create and print a TypeScript type node:

```ts
import { createTypeNode, printNode } from "@imhonglu/build-tools";

const node = createTypeNode({ id: Number, name: String });

console.log(printNode(node));
```

The package also exports helpers for creating declarations, loading a
`tsconfig.json`, running subprocesses, and printing TypeScript AST nodes.
