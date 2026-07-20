# 기술 결정 기록 (ADR)

ADR은 나중에 다시 논의할 가능성이 있는 중요한 기술 선택의 배경과 결과를 기록합니다.

## 문서

- [API 문서를 소스에서 생성](./0001-generate-api-docs-from-source.md)

## 작성 기준

다음 중 하나에 해당하면 ADR을 고려합니다.

- 여러 패키지에 영향을 주는 구조적 선택
- 공개 API나 호환성 정책의 기준
- 도구 또는 생성 방식의 선택
- 대안과 트레이드오프를 기억할 필요가 있는 결정

단순 구현 상세나 일회성 버그 수정은 ADR로 만들지 않습니다.

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
