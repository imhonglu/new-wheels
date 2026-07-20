# API 문서를 소스에서 생성

- Status: Accepted
- Date: 2026-07-20
- Supersedes: None
- Superseded by: None

## Context

공개 API 설명을 소스와 별도 Markdown에 중복 작성하면 시그니처와 문서가 쉽게 달라집니다. 모든 라이브러리 패키지는 TypeScript 선언을 생성하며 API Extractor와 API Documenter를 사용할 수 있습니다.

## Decision

공개 심볼의 설명, 매개변수, 반환값, 예제는 소스 TSDoc을 기준으로 관리합니다. `libs/*/docs`는 각 패키지의 `generate-docs` 명령으로 생성하고 직접 수정하지 않습니다.

README는 설치 방법과 대표 사용 흐름을 설명하고 상세 API 문서로 연결합니다.

## Alternatives considered

### 상세 API Markdown을 수동 관리

소스와 별도 문서가 같은 계약을 중복해서 설명하므로 시그니처와 설명이 달라질 가능성이 큽니다.

### 생성 결과를 저장소에 커밋하지 않음

문서가 패키지별로 바로 탐색되지 않고, 문서를 확인할 때마다 로컬 생성 환경이 필요합니다. 생성 결과의 변경도 코드 리뷰에서 확인하기 어렵습니다.

## Consequences

- API 시그니처와 설명을 가까운 위치에서 관리할 수 있습니다.
- 생성 문서의 수동 편집은 다음 생성 시 사라집니다.
- 공개 API 변경 시 빌드 후 문서 생성이 필요합니다.
- 생성 도구가 관련 없는 줄바꿈 변경을 만들 수 있으므로 diff를 검토해야 합니다.

구체적인 실행 절차는 [API 문서 생성 가이드](../guides/generating-api-docs.md)를 따릅니다.
