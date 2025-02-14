# @imhonglu/new-wheels

[![Checked with Biome](https://img.shields.io/badge/Checked_with-Biome-60a5fa?style=flat&logo=biome)](https://biomejs.dev)

[English](./README.md) | [한국어](./README_KR.md)

## Introduction

_"내 취향의 타입 안전한 라이브러리를 만들어보자"_ 라는 생각으로 시작한 프로젝트입니다.  
불필요한 의존성을 최소화하고 높은 테스트 커버리지를 목표로 하고 있으며,  
**TypeScript의 타입 시스템을 적극 활용하여, 안전하고 직관적인 라이브러리를 설계하는 데 집중하고 있습니다.**

## Libraries

각 라이브러리에 대한 자세한 내용은 개별 문서에서 확인할 수 있습니다.

- [@imhonglu/json-schema](https://github.com/imhonglu/new-wheels/blob/main/libs/json-schema/README_KR.md)  
  JSON Schema 2020-12 Draft 사양을 준수하며, JSON-Schema-test-suite로 검증된 구현체입니다.  
  **스키마 기반 정적 타입 추론을 지원하여, 선언형 방식으로 안전한 데이터 구조를 정의할 수 있습니다.**
- [@imhonglu/format](https://github.com/imhonglu/new-wheels/blob/main/libs/format/README_KR.md)  
  RFC 표준을 준수하는 강타입 문자열 포맷팅 라이브러리입니다.  
  **네이티브 JSON API와 유사한 API를 제공하여 직관적인 사용성을 지향합니다.**
- [@imhonglu/pattern-builder](https://github.com/imhonglu/new-wheels/blob/main/libs/pattern-builder/README_KR.md)  
  복잡한 정규 표현식을 더 쉽게 구성할 수 있도록 도와주는 RegExp 빌더입니다.  
  **가독성을 높이고, 유지보수를 용이하게 만드는 것이 목표입니다.**
- [@imhonglu/toolkit](https://github.com/imhonglu/new-wheels/blob/main/libs/toolkit/README_KR.md)  
  반복적으로 사용되는 유틸리티 함수와 타입을 모아, 더욱 효율적인 개발을 돕는 라이브러리입니다.  
  **TypeScript 환경에서 반복되는 코드 작성을 줄이고, 일관된 패턴을 유지하는 데 도움을 줍니다.**
- [@imhonglu/type-guard](https://github.com/imhonglu/new-wheels/blob/main/libs/type-guard/README_KR.md)  
  Jest Matcher 패턴에서 영감을 받아 체이닝 방식의 API를 제공합니다.  
  **Proxy 기반으로 동작하여 오버헤드를 최소화하면서도 강력한 타입 안전성을 제공합니다.**
- [@imhonglu/type-object](https://github.com/imhonglu/new-wheels/blob/main/libs/type-object/README_KR.md)  
  타입 안전한 Object API Wrapper를 제공하며, 네이티브 동작에 가까운 타입을 제공합니다.  
  **`Object.keys`, `entries`, `fromEntries`, `hasOwn` 등의 API를 TypeScript 환경에서 더 안전하게 활용할 수 있습니다.**
