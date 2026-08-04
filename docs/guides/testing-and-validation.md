# 테스트와 검증 가이드

- Last verified: 2026-08-04
- Verified against: `package.json`, `cspell.json`, `biome.json`, `.git-hooks/*`, `.github/workflows/ci.yaml`, `.changeset/config.json`, `vitest.config.ts`, `libs/*/package.json`, `tools/*/package.json`, `tools/json-schema-conformance`

이 가이드는 변경 범위에 맞는 검증을 선택하고 로컬 검사, Git hook과 CI의 보장 범위 및 실패 처리 기준을 설명합니다. 변경 유형별 고유 검증은 해당 작업 가이드를 따릅니다.

## 작업 중 빠른 피드백

작업 중에는 변경과 가장 가까운 패키지 검증부터 시작합니다. 공용 계약이나 설정에 영향이 있으면 직접 의존 패키지와 전체 검증으로 확장합니다.

```sh
pnpm --filter <package-name> build
pnpm --filter <package-name> test -- --run
```

대상 패키지에 `build` 또는 `test` 스크립트가 없으면 패키지 README에 정의된 소비자 검증을 실행합니다. `@imhonglu/configs`는 자체 빌드 출력이 없으므로 저장소 전체 build와 package dry-run으로 확인합니다.

특정 테스트만 실행할 수도 있습니다.

```sh
pnpm --filter <package-name> exec vitest run <test-file>
```

## 전체 검증

CI와 같은 범위를 로컬에서 확인할 때 저장소 루트에서 다음 명령을 실행합니다.

```sh
pnpm run build
pnpm cspell --no-summary --no-progress .
pnpm biome ci .
pnpm run check:docs
pnpm vitest --run
pnpm --filter @imhonglu/json-schema-conformance test:conformance
```

## 피드백 단계

| 시점 | 검사 범위 |
| --- | --- |
| 커밋 전 | 스테이지된 파일의 CSpell과 Biome, Markdown이 있으면 `check:docs` |
| 커밋 메시지 | Commitlint의 Conventional Commits 형식 |
| 푸시 전 | push 범위의 코드 파일과 관련된 Vitest 테스트 |
| Pull Request | 전체 build, CSpell, Biome, 문서, 기본 Vitest와 JSON Schema 적합성 기준선 |

문서와 changeset만 변경된 push는 관련 테스트를 생략합니다. Git hook은 빠른 피드백 장치이므로 작업 중에는 대상 패키지 검증을 명시적으로 실행합니다.

## 검증 커버리지

| 보장하려는 특성 | 기준 문서·설정 | 로컬 검사 | CI | 수준 |
| --- | --- | --- | --- | --- |
| 코드 스타일과 정적 규칙 | `biome.json` | Biome pre-commit | Biome | Enforced |
| 맞춤법 | `cspell.json` | CSpell pre-commit | CSpell | Enforced |
| 내부 Markdown 링크와 문서 구조 | [Markdown 작성](./writing-markdown.md) | `check:docs` pre-commit | `check:docs` | Enforced |
| ADR과 Plan 형식 | [기술 결정 기록](../decisions/README.md), [실행 계획](../plans/README.md) | `check:docs` pre-commit | `check:docs` | Enforced |
| 타입 안전성 | 이 가이드 | 대상 패키지 build | 전체 build | Enforced |
| 동작 회귀 | 이 가이드 | 대상·관련 Vitest | 전체 기본 Vitest | Enforced |
| JSON Schema 외부 적합성 | [적합성 도구](../../tools/json-schema-conformance/README.md) | 명시적 적합성 명령 | 전체 적합성 기준선 | Enforced |
| 공개 API 문서 최신성 | [API 문서 생성](./generating-api-docs.md) | 생성과 diff 검토 | 없음 | Manual |
| changeset 존재와 수준 | [Changesets 관리](./managing-changesets.md) | `changeset status` | 없음 | Manual |
| GitHub Issue Form과 PR 템플릿 | [GitHub 작업 추적](./tracking-work-with-github.md) | YAML·링크 수동 검토 | 없음 | Manual |
| workspace README 쌍과 영문·한글 의미 일치 | [Markdown 작성](./writing-markdown.md) | 수동 비교 | 없음 | Manual |
| workspace 의존 방향 | [저장소 구조](../architecture/repository-structure.md) | 없음 | 없음 | Documented |

- **Enforced**는 로컬 도구와 CI가 기계적으로 검사합니다.
- **Manual**은 실행 절차가 있지만 자동으로 강제하지 않습니다.
- **Documented**는 원하는 상태만 기록되어 있습니다.

## JSON Schema 적합성 검증

기본 Vitest에서 이 패키지는 `src` 아래 도구 테스트만 실행하고 `generated`의 적합성 테스트는 제외합니다. 생성 fixture나 기준선을 변경할 때는 private [`@imhonglu/json-schema-conformance`](../../tools/json-schema-conformance/README.md) 패키지가 정의한 입력 소유권과 갱신·검사 절차를 따릅니다. CI는 전체 적합성 기준선을 별도 단계로 실행합니다.

## 실패 처리

변경과 무관해 보이는 실패도 재실행만으로 무시하지 않습니다.

1. 대상 테스트를 단독 실행합니다.
2. 변경 전에도 재현되는지 확인합니다.
3. 관련성이 없으면 결과와 근거를 작업 기록에 남깁니다.
4. 재현 조건과 해결 방법이 확인된 반복 문제는 가장 가까운 가이드의 문제 해결 절에 기록합니다.

## 검증 개선 원칙

- 같은 실패가 반복되면 기준 문서와 오류 메시지가 다음 행동을 충분히 설명하는지 확인합니다.
- 결정적으로 검사할 수 있는 규칙은 테스트, 린터나 스크립트로 옮깁니다.
- 느리거나 외부 입력에 의존하는 검사는 빠른 기본 검사와 분리합니다.
