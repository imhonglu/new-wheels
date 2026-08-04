# CLI는 빌드 산출물로 실행

- Status: Accepted
- Date: 2026-08-04
- Supersedes: None
- Superseded by: None

## Context

CLI마다 저장소 루트의 JavaScript wrapper와 TypeScript 소스를 함께 유지하면 실제 실행 진입점이 둘이 됩니다. wrapper가 소스 실행 방법과 빌드 순서를 대신 결정해 패키지에 배포되는 JavaScript와 로컬·CI에서 검증한 경로도 달라질 수 있습니다.

## Decision

- CLI는 패키지 빌드에 포함하고 package `bin`, package script와 루트 script는 빌드된 `dist/bin`을 실행합니다.
- TypeScript 소스를 직접 실행하거나 별도 JavaScript wrapper를 두는 실행 경로는 제공하지 않습니다.

구현 절차는 [CLI 도구 작성](../guides/writing-cli-tools.md)을 따릅니다.

## Alternatives considered

### TypeScript 소스를 직접 실행

개발 시 빌드를 생략할 수 있지만 소비자와 CI가 실행할 JavaScript 산출물을 검증하지 못합니다. TypeScript 실행기라는 추가 런타임 전제도 생깁니다.

### 저장소 루트의 JavaScript wrapper 유지

초기 호출은 간단하지만 소스, wrapper와 배포 진입점의 역할이 중복됩니다. CLI가 늘어날수록 wrapper와 package manifest가 어긋날 가능성이 커집니다.

### 빌드 산출물을 미리 커밋

실행 전 빌드는 줄지만 소스와 산출물의 동기화를 별도로 관리해야 하고 일반 패키지 build 흐름과 달라집니다.

## Consequences

- 로컬, CI와 설치된 패키지가 같은 JavaScript 진입점을 사용합니다.
- CLI를 실행하기 전에 대상 패키지와 필요한 의존 패키지를 빌드해야 합니다.
- CLI 실행 가능 여부는 빌드 산출물의 완전성에 의존합니다.
