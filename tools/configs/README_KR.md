# @imhonglu/configs

[English](./README.md) | [한국어](./README_KR.md)

`@imhonglu/new-wheels` 패키지가 공유하는 TypeScript와 API Extractor 설정입니다.

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

## 검증

이 패키지는 자체 빌드 출력이나 독립 테스트가 없습니다. 변경 사항은 소비 패키지와 배포 파일 목록을 통해 검증해야 합니다.

```sh
pnpm run build
pnpm --filter @imhonglu/configs pack --dry-run
```
