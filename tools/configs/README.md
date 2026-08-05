# @imhonglu/configs

[English](./README.md) | [한국어](./README_KR.md)

Shared TypeScript, API Extractor, and tsdown configuration for `@imhonglu/new-wheels` packages.

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

## tsdown

Install tsdown when using the shared build configuration.

```sh
pnpm add -D @imhonglu/configs tsdown
```

Use the shared configuration from the package's `tsdown.config.ts`.

```ts
import sharedConfig from "@imhonglu/configs/tsdown.config.js";
import { defineConfig } from "tsdown";

export default defineConfig(sharedConfig);
```

The export also provides `baseConfig` and `declarationConfig`. Use tsdown's `mergeConfig` to add only the platform or plugin overrides owned by the package.

```ts
import {
  baseConfig,
  declarationConfig,
} from "@imhonglu/configs/tsdown.config.js";
import { defineConfig, mergeConfig } from "tsdown";

export default defineConfig([
  mergeConfig(baseConfig, { platform: "node" }),
  declarationConfig,
]);
```

## Validation

This package has no build output or standalone tests. Changes must be validated through its consumers and the published file list.

```sh
pnpm run build
pnpm --filter @imhonglu/configs pack --dry-run
```
