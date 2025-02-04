# @imhonglu/new-wheels

[![Checked with Biome](https://img.shields.io/badge/Checked_with-Biome-60a5fa?style=flat&logo=biome)](https://biomejs.dev)

[English](./README.md) | [한국어](./README_KR.md)

## Introduction

"내 취향의 타입 안전한 라이브러리를 만들어보자"는 마음으로 시작한 프로젝트입니다.

불필요한 의존성을 최소화하고 높은 테스트 커버리지를 목표로 만들고 있습니다.  

## Libraries

각 라이브러리의 자세한 내용은 해당 문서로 이동해서 확인할 수 있습니다.

### [@imhonglu/format](https://github.com/imhonglu/new-wheels/blob/main/libs/format/README_KR.md)

- RFC 표준 사양을 준수하는 강타입 문자열 포맷팅 라이브러리입니다.
- 네이티브 [JSON API](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/JSON)와 같은 방식의 API를 제공합니다.

### [@imhonglu/json-schema](https://github.com/imhonglu/new-wheels/blob/main/libs/json-schema/README_KR.md)

- JSON Schema 2020-12-draft 사양을 준수하는 라이브러리입니다.
- [JSON-Schema-test-suite](https://github.com/json-schema-org/JSON-Schema-Test-Suite)를 기반으로 검증되었습니다.
- 스키마 정의에 기반한 **정적 타입 추론**을 지원합니다.

### [@imhonglu/pattern-builder](https://github.com/imhonglu/new-wheels/blob/main/libs/pattern-builder/README_KR.md)

- 정규표현식의 가독성을 높이기 위한 정규표현식(RegExp) 빌더입니다.

### [@imhonglu/toolkit](https://github.com/imhonglu/new-wheels/blob/main/libs/toolkit/README_KR.md)

- 자주 사용되는 유틸리티 함수와 타입들을 모아놓은 라이브러리입니다.

### [@imhonglu/type-guard](https://github.com/imhonglu/new-wheels/blob/main/libs/type-guard/README_KR.md)

- [Jest](https://jestjs.io/) Matcher 패턴에서 영감을 받아 체이닝 방식의 API를 제공합니다.
- `Proxy` 기반으로 동작하여 오버헤드를 최소화하고 타입 안전성을 보장합니다.

### [@imhonglu/type-object](https://github.com/imhonglu/new-wheels/blob/main/libs/type-object/README_KR.md)

- 타입 안전한 [Object API](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object) Wrapper 를 제공합니다.
- 네이티브 동작에 가까운 타입을 제공합니다.
- 지원하는 API
  - `Object.keys`
  - `Object.entries`
  - `Object.fromEntries`
  - `Object.hasOwn`
