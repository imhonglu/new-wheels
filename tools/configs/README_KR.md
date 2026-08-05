# @imhonglu/configs

[English](./README.md) | [한국어](./README_KR.md)

`@imhonglu/new-wheels` 패키지가 공유하는 TypeScript, API Extractor와 tsdown 설정입니다.

## 설치

```sh
pnpm add -D @imhonglu/configs
```

## TypeScript

일반 TypeScript 프로젝트는 base 설정을, declaration을 생성하는 패키지는 library 설정을 확장합니다.

```json
{
  "extends": "@imhonglu/configs/tsconfig.lib.json"
}
```

사용 가능한 export는 `tsconfig.base.json`과 `tsconfig.lib.json`입니다.

## API Extractor

```json
{
  "extends": "@imhonglu/configs/api-extractor-base.json",
  "mainEntryPointFilePath": "<projectFolder>/dist/index.d.ts"
}
```

## tsdown

공통 빌드 설정을 사용할 때 tsdown을 함께 설치합니다.

```sh
pnpm add -D @imhonglu/configs tsdown
```

패키지의 `tsdown.config.ts`에서 공통 설정을 사용합니다.

```ts
import sharedConfig from "@imhonglu/configs/tsdown.config.js";
import { defineConfig } from "tsdown";

export default defineConfig(sharedConfig);
```

`baseConfig`와 `declarationConfig`도 함께 내보냅니다. 패키지가 소유하는 플랫폼이나 plugin 예외만 tsdown의 `mergeConfig`로 병합합니다.

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

## 검증

이 패키지는 자체 빌드 출력이나 독립 테스트가 없습니다. 변경 사항은 소비 패키지와 배포 파일 목록을 통해 검증해야 합니다.

```sh
pnpm run build
pnpm --filter @imhonglu/configs pack --dry-run
```
