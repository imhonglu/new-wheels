# @imhonglu/build-tools

[English](./README.md) | [한국어](./README_KR.md)

Build utilities shared by packages in `@imhonglu/new-wheels`.

## Installation

```sh
pnpm add -D @imhonglu/build-tools esbuild tslib typescript
```

## Commands

### `esm-to-cjs`

Run this command from a package whose ESM build output is in `dist`. It converts every `dist/**/*.js` entry to a matching CommonJS `.cjs` file. If `dist` does not exist, it exits without writing files.

```sh
pnpm run build
pnpm exec esm-to-cjs
```

Workspace development follows the repository's [CLI tool guide](../../docs/guides/writing-cli-tools.md).
