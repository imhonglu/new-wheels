# AGENTS.md

이 파일은 [AGENTS.md 오픈 포맷](https://agents.md/)을 따르는 저장소 작업 지침입니다.

## 환경 준비

저장소 루트에서 의존성을 설치합니다.

```sh
pnpm install --frozen-lockfile
```

## 작업 원칙

- 구현 전에 가정, 변경 범위, 성공 기준을 명확히 합니다.
- 결과를 바꾸는 불명확성이 있으면 조용히 가정하지 말고 질문합니다.
- 요청을 해결하는 최소한의 변경만 수행합니다.
- 관련 없는 코드나 문서, 기존 사용자 변경을 수정하지 않습니다.
- 변경 유형에 맞는 검증을 실행하고 결과를 확인합니다.
- 실행하지 못한 검증과 남은 위험을 명확히 알립니다.

자세한 기준은 [개발 작업 원칙](./docs/guides/development-workflow.md)을 따릅니다.

## 저장소 지도

- `libs/*`: npm에 공개되는 라이브러리 패키지
- `tools/*`: 빌드·CLI 도구와 공유 설정 패키지
- [아키텍처](./docs/architecture/README.md): 현재 저장소 구조, 패키지 경계, 공개 API 정책
- [기술 결정 기록](./docs/decisions/README.md): 중요한 선택의 배경과 트레이드오프
- [개발 가이드](./docs/guides/README.md): 반복 작업의 실행 절차
- [운영 절차](./docs/operations/README.md): 릴리스처럼 외부 상태를 변경하는 절차
- [엔지니어링 하네스](./docs/engineering-harness.md): 저장소 규칙과 검증 장치의 연결 상태
- [실행 계획](./docs/plans/README.md): 여러 변경에 걸친 작업 계획과 진행 기록

## 문서 기록 판단

- 여러 세션이나 PR에 걸친 작업은 시작 전에 [실행 계획](./docs/plans/README.md)을 만들거나 기존 계획을 갱신합니다.
- 장기적으로 유지할 구조적 선택이나 대안과 트레이드오프가 있는 결정은 [ADR](./docs/decisions/README.md)로 기록합니다.
- 단순 구현 상세, 쉽게 되돌릴 수 있는 선택, 일회성 수정은 별도 Plan이나 ADR로 만들지 않습니다.
- 작업을 종료할 때 Plan의 상태와 최종 검증 결과를 갱신합니다.
- 문서를 추가하거나 이동하면 가장 가까운 `README.md` 인덱스를 함께 갱신합니다.

## 변경별 필수 절차

| 변경 | 먼저 읽을 문서 | 필수 검증 |
| --- | --- | --- |
| 일반 소스 | [테스트와 검증](./docs/guides/testing-and-validation.md) | 대상 패키지 build, test |
| 공개 도구 API·CLI·패키징 | 대상 `tools/*/README.md` | 대상 패키지 build, test, package dry-run, 공개 패키지 changeset |
| 공유 설정 | [`@imhonglu/configs`](./tools/configs/README.md) | 전체 build, package dry-run, changeset |
| 라이브러리 공개 API | [공개 API 변경](./docs/guides/changing-a-public-api.md) | build, test, API 문서, changeset |
| 수동 문서 | [문서 작성](./docs/guides/writing-documentation.md) | `pnpm run check:docs`, `git diff --check` |
| 생성 API 문서 | [API 문서 생성](./docs/guides/generating-api-docs.md) | 대상 패키지 build, generate-docs |
| 릴리스 | [릴리스](./docs/operations/release.md) | changeset과 워크플로우 상태 확인 |

대상 패키지의 기본 검증 명령은 다음과 같습니다.

```sh
pnpm --filter <package-name> build
pnpm --filter <package-name> test -- --run
```

`build` 또는 `test` 스크립트가 없는 설정 패키지는 해당 패키지 README에 정의된 소비자 검증을 실행합니다.

CLI 또는 패키징 변경은 배포 파일 목록도 확인합니다.

```sh
pnpm --filter <package-name> exec npm pack --dry-run --ignore-scripts
```

## 반드시 지킬 제약

- 공개 API 설명의 기준은 소스 TSDoc입니다.
- `libs/*/docs`는 API Documenter가 생성하므로 직접 수정하지 않습니다.
- 사용자 설치 방법과 대표 예제는 각 패키지 README에 둡니다.
- 라이브러리 공개 API 변경에는 테스트, TSDoc, 생성 문서 검토, changeset을 포함합니다.
- 설계 선택의 배경은 기존 현재 상태 문서에 섞지 않고 ADR로 기록합니다.

사람을 위한 기본 기여 절차는 [기여 가이드](./CONTRIBUTING.md), 전체 문서 분류 기준은 [저장소 문서](./docs/README.md)를 참고합니다.
