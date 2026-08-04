# @imhonglu/build-tools

[English](./README.md) | [한국어](./README_KR.md)

`@imhonglu/new-wheels` 패키지가 공유하는 빌드 유틸리티입니다.

## 설치

```sh
pnpm add -D @imhonglu/build-tools esbuild tslib typescript
```

## 명령

### `esm-to-cjs`

ESM 빌드 출력이 `dist`에 있는 패키지에서 이 명령을 실행합니다. 모든 `dist/**/*.js` 파일을 대응하는 CommonJS `.cjs` 파일로 변환합니다. `dist`가 없으면 파일을 작성하지 않고 종료합니다.

```sh
pnpm run build
pnpm exec esm-to-cjs
```

workspace 개발은 저장소의 [CLI 도구 작성 가이드](../../docs/guides/writing-cli-tools.md)를 따릅니다.
