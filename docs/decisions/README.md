# 기술 결정 기록 (ADR)

ADR은 현재 변경이 끝난 뒤에도 유지되고, 나중에 대안을 다시 검토할 가능성이 있는 중요한 저장소 엔지니어링 선택의 이유와 결과를 기록합니다.

## 문서

| ADR | 기록하는 결정 |
| --- | --- |
| [API 문서를 소스에서 생성](./0001-generate-api-docs-from-source.md) | 공개 API 설명의 원본과 생성 레퍼런스의 보관 방식 |
| [JSON Schema 적합성 도구를 공개 라이브러리에서 분리](./0002-separate-json-schema-conformance-tooling.md) | 공개 패키지 경계와 외부 fixture의 재현성·원문 보존 |
| [CLI는 빌드 산출물로 실행](./0003-run-cli-from-build-output.md) | 개발·CI·배포 환경이 공유하는 CLI 실행 경로 |
| [문서는 독자와 질문에 따라 연결](./0004-route-documentation-by-reader-and-purpose.md) | 루트 진입점과 유지보수 문서의 정보 소유 구조 |
| [저장소에는 활성 Plan만 유지](./0005-keep-only-active-plans.md) | 임시 실행 계획과 영구 기록의 경계 |

## 기록 가치 판단

다음 질문에 대체로 “예”라고 답할 수 있을 때 ADR을 작성합니다.

- 이 선택은 현재 세션이나 PR이 끝난 뒤에도 제약으로 남는가?
- 미래 유지보수자가 합리적으로 다른 대안을 다시 선택할 수 있는가?
- 선택 이유를 현재 코드, 설정이나 상태 문서만으로 복원하기 어려운가?
- 이유를 잊었을 때 호환성 비용, 구조적 재작업 또는 같은 논쟁의 반복이 예상되는가?

ADR은 선택 이유와 대안, 장기 결과만 소유합니다. 현재 구조는 Architecture, 반복 절차는 Guide, 외부 상태 변경은 Operation, 구현 과정은 Plan, 최종 검증과 변경 요약은 PR·커밋에 둡니다. 쉽게 되돌릴 수 있는 로컬 선택, 명령 순서, 파일명과 일회성 수정은 ADR로 만들지 않습니다.

## 템플릿

```md
# 제목

- Status: Proposed | Accepted | Rejected | Superseded
- Date: YYYY-MM-DD
- Supersedes: ADR 상대 링크 | None
- Superseded by: ADR 상대 링크 | None

## Context

어떤 문제와 제약이 있는가?

## Decision

무엇을 선택했는가?

## Alternatives considered

어떤 대안을 검토했고 왜 선택하지 않았는가?

## Consequences

무엇을 얻고 무엇을 감수하는가?
```

파일명은 `NNNN-short-title.md` 형식을 사용합니다.

## 상태 전이

- 에이전트나 사람이 검토 중인 선택은 `Proposed`로 작성합니다.
- 사용자 승인이나 구현 결과로 선택이 확정되면 `Accepted`로 바꿉니다.
- 채택하지 않기로 확정한 제안은 이유를 남기고 `Rejected`로 바꿉니다.
- 채택된 결정이 새 결정으로 대체되면 기존 문서를 `Superseded`로 바꾸고 두 ADR을 상대 링크로 연결합니다.

결정이 바뀌어도 기존 문서를 삭제하거나 내용을 덮어쓰지 않습니다.
