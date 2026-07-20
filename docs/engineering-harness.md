# 엔지니어링 하네스

- Status: Active
- Last verified: 2026-07-21
- Verified against: `package.json`, `cspell.json`, `biome.json`, `.git-hooks/*`, `.github/workflows/ci.yaml`, `.changeset/config.json`, `libs/*/package.json`, `tools/*/package.json`

이 문서는 저장소가 유지하려는 특성과 이를 안내하거나 검증하는 장치를 연결합니다. 가이드는 작업 전에 방향을 제공하고, 센서는 작업 후 결과를 관찰해 수정 가능한 피드백을 제공합니다.

## 현재 상태

| 보장하려는 특성 | 가이드 | 로컬 센서 | CI 센서 | 상태 |
| --- | --- | --- | --- | --- |
| 코드 스타일과 정적 규칙 | `AGENTS.md`, `CONTRIBUTING.md` | Biome pre-commit | Biome | Enforced |
| 맞춤법 | [문서 작성](./guides/writing-documentation.md) | CSpell pre-commit | CSpell | Enforced |
| 내부 Markdown 파일 경로 | [문서 작성](./guides/writing-documentation.md) | `check:docs` pre-commit | `check:docs` | Enforced |
| 문서 메타데이터와 인덱스 등록 | [문서 작성](./guides/writing-documentation.md) | `check:docs` pre-commit | `check:docs` | Enforced |
| ADR 파일명·상태·대체 링크 | [기술 결정 기록](./decisions/README.md) | `check:docs` pre-commit | `check:docs` | Enforced |
| Plan 파일명·상태·종료 결과 | [실행 계획](./plans/README.md) | `check:docs` pre-commit | `check:docs` | Enforced |
| 타입 안전성 | [테스트와 검증](./guides/testing-and-validation.md) | 패키지 build | 전체 build | Enforced |
| 관련 테스트 | [테스트와 검증](./guides/testing-and-validation.md) | Vitest pre-push | Vitest | Enforced |
| 공개 API 문서 최신성 | [API 문서 생성](./guides/generating-api-docs.md) | 수동 생성 및 diff | 없음 | Manual |
| changeset 존재와 수준 | [Changesets 관리](./guides/managing-changesets.md) | `changeset status` | 없음 | Manual |
| 패키지 의존 방향 | [런타임 의존 관계](./architecture/runtime-dependencies.md) | 없음 | 없음 | Documented |

## 상태 정의

- **Enforced**: 로컬 도구와 CI에서 기계적으로 검사합니다.
- **Partial**: 일부 경로나 변경만 기계적으로 검사합니다.
- **Manual**: 실행 가능한 절차는 있지만 자동으로 강제하지 않습니다.
- **Documented**: 원하는 상태만 설명하며 아직 센서가 없습니다.

## 개선 원칙

1. 같은 실패가 반복되면 기존 가이드가 충분한지 먼저 확인합니다.
2. 결정적으로 검사할 수 있는 규칙은 테스트, 린터 또는 스크립트로 옮깁니다.
3. 센서의 오류 메시지는 원인과 다음 행동을 알 수 있게 작성합니다.
4. 느리거나 비결정적인 검사는 빠른 로컬 검사와 분리합니다.
5. 새 센서를 추가하거나 제거하면 이 표와 관련 가이드를 함께 갱신합니다.

구현할 개선 항목은 이 문서에 향후 계획으로 쌓지 않고 이슈 또는 [실행 계획](./plans/README.md)으로 관리합니다.
