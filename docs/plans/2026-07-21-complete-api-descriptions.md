# 공개 API 문서 설명 보완

- Status: Active
- Started: 2026-07-21
- Closed: N/A
- Scope: `libs/format`, `libs/json-schema`, `libs/json-schema-typed`, `libs/type-guard`, `libs/toolkit`

## 성공 기준

- 각 패키지 API 인덱스의 공개 심볼 설명 열이 비어 있지 않습니다.
- 설명은 생성 Markdown이 아니라 공개 심볼의 소스 TSDoc에서 관리합니다.
- 패키지별 build, test, `generate-docs`가 통과합니다.
- 생성 문서 diff에 의도하지 않은 공개 API 변경이 없습니다.

## 단계

- [ ] `format`의 빈 설명 35개를 소스 TSDoc에서 보완하고 검증합니다.
- [ ] `json-schema`의 빈 설명 39개를 소스 TSDoc에서 보완하고 검증합니다.
- [ ] `json-schema-typed`의 빈 설명 27개를 소스 TSDoc에서 보완하고 검증합니다.
- [ ] `type-guard`의 빈 설명 6개를 소스 TSDoc에서 보완하고 검증합니다.
- [ ] `toolkit`의 빈 설명 1개를 소스 TSDoc에서 보완하고 검증합니다.

## 결정 기록

- 패키지별 변경을 독립적으로 검토할 수 있도록 한 패키지씩 보완합니다.
- `libs/*/docs`는 직접 수정하지 않고 [API 문서 생성 가이드](../guides/generating-api-docs.md)에 따라 재생성합니다.

## 진행 기록

- 2026-07-21: 생성된 패키지 API 인덱스를 감사해 빈 설명 108개를 확인했습니다.

## 종료 결과

- 최종 결과: 진행 중
- 검증 결과: N/A
- 남은 작업: 위 단계 전체
