# 저장소 문서

이 문서는 유지보수 문서의 진입점과 배치 기준입니다. 프로젝트와 공개 패키지는 루트 [`README.md`](../README.md)·[`README_KR.md`](../README_KR.md)에서 시작합니다.

## 루트 진입점

| 문서 | 독자와 책임 |
| --- | --- |
| [`README.md`](../README.md), [`README_KR.md`](../README_KR.md) | 모든 독자를 위한 프로젝트 소개와 공개 패키지 목록 |
| [`CONTRIBUTING.md`](../CONTRIBUTING.md) | 사람을 위한 기여 흐름과 작업별 안내 |
| [`AGENTS.md`](../AGENTS.md) | 코딩 에이전트의 실행 제약과 작업별 안내 |

## 목적별 시작점

| 질문 | 시작점 |
| --- | --- |
| 현재 저장소의 구조와 지속할 정책은 무엇인가? | [아키텍처](./architecture/README.md) |
| 왜 이 기술 선택을 했는가? | [기술 결정 기록](./decisions/README.md) |
| 저장소 변경에 적용할 원칙과 반복 작업의 완료 방법은 무엇인가? | [개발 가이드](./guides/README.md) |
| 외부 상태를 어떻게 변경하고 복구하는가? | [운영 절차](./operations/README.md) |
| 여러 변경에 걸친 작업은 어디까지 진행됐는가? | [실행 계획](./plans/README.md) |

## 배치 기준

| 내용 | 기준 위치 |
| --- | --- |
| 프로젝트와 공개 패키지 소개 | 루트 및 패키지 `README.md`·`README_KR.md` |
| 공개 심볼의 계약 | 소스 TSDoc |
| 생성 API 레퍼런스 | `libs/*/docs`의 파생 산출물 |
| 현재 구조, 경계와 정책 | `docs/architecture` |
| 선택의 배경, 대안과 결과 | `docs/decisions` |
| 공통 개발 원칙, 작성·검증 기준과 반복 절차 | `docs/guides` |
| 배포, 권한과 외부 서비스 절차 | `docs/operations` |
| 여러 변경에 걸친 한시적 진행 기록 | `docs/plans` |

공통 작성 원칙은 [문서 작성 원칙](./guides/documentation-principles.md), 소스 주석은 [TypeScript 문서화](./guides/documenting-typescript.md), README·메타데이터와 형식 검증은 [Markdown 작성](./guides/writing-markdown.md)을 따릅니다. ADR과 Plan의 생성 조건과 생명주기는 각 하위 인덱스가 소유합니다.
