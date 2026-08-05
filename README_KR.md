# @imhonglu/new-wheels

[![Checked with Biome](https://img.shields.io/badge/Checked_with-Biome-60a5fa?style=flat&logo=biome)](https://biomejs.dev)

[English](./README.md) | [한국어](./README_KR.md)

독립적으로 배포하는 TypeScript 라이브러리와 빌드 도구를 관리하는 pnpm workspace입니다. 패키지별 설치 방법, 예제, 명령과 참고 자료는 각 패키지 README에서 확인합니다.

## 공개 패키지

### 라이브러리

| 패키지 | 역할 |
| --- | --- |
| [`@imhonglu/json-schema`](./libs/json-schema/README_KR.md) | 스키마 기반 타입 추론을 지원하는 JSON Schema Draft 2020-12 검증기 |
| [`@imhonglu/json-schema-typed`](./libs/json-schema-typed/README_KR.md) | 타입 안전한 JSON Schema 정의와 인스턴스 타입 추론 |
| [`@imhonglu/format`](./libs/format/README_KR.md) | RFC로 정의된 문자열의 강타입 파서와 포매터 |
| [`@imhonglu/pattern-builder`](./libs/pattern-builder/README_KR.md) | 정규 표현식 패턴을 단계적으로 구성하는 빌더 |
| [`@imhonglu/toolkit`](./libs/toolkit/README_KR.md) | 재사용 가능한 TypeScript 유틸리티 함수와 타입 |
| [`@imhonglu/type-guard`](./libs/type-guard/README_KR.md) | 조합 가능한 런타임 타입 가드 |
| [`@imhonglu/type-object`](./libs/type-object/README_KR.md) | JavaScript Object API를 타입 안전하게 감싸는 도구 |

### 빌드 도구

| 패키지 | 역할 |
| --- | --- |
| [`@imhonglu/build-tools`](./tools/build-tools/README_KR.md) | 코드 생성을 위한 TypeScript 컴파일러 유틸리티 |
| [`@imhonglu/configs`](./tools/configs/README_KR.md) | 공통 TypeScript, API Extractor와 빌드 설정 |

## 다음 문서

| 목적 | 시작점 |
| --- | --- |
| 패키지 사용 | 위 표의 패키지 README |
| 변경 기여 | [기여 가이드](./CONTRIBUTING.md) |
| 아키텍처와 유지보수 이해 | [저장소 문서](./docs/README.md) |
| 코딩 에이전트로 작업 | [`AGENTS.md`](./AGENTS.md) |
