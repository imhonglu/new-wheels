# @imhonglu/configs

Shared TypeScript and API Extractor configuration for `@imhonglu/new-wheels` packages.

## Installation

```sh
pnpm add -D @imhonglu/configs
```

## TypeScript

Extend the base configuration for general TypeScript projects or the library configuration for packages that emit declarations.

```json
{
  "extends": "@imhonglu/configs/tsconfig.lib.json"
}
```

Available exports are `tsconfig.base.json` and `tsconfig.lib.json`.

## API Extractor

```json
{
  "extends": "@imhonglu/configs/api-extractor-base.json",
  "mainEntryPointFilePath": "<projectFolder>/dist/index.d.ts"
}
```

## Validation

This package has no build output or standalone tests. Changes must be validated through its consumers and the published file list.

```sh
pnpm run build
pnpm --filter @imhonglu/configs exec npm pack --dry-run --ignore-scripts
```
