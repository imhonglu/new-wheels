# 저장소 문서

이 문서는 유지보수 문서의 진입점과 배치 기준입니다. 프로젝트와 공개 패키지는 루트 [`README.md`](../README.md)·[`README_KR.md`](../README_KR.md)에서 시작합니다.

## 목적별 시작점

| 질문 | 시작점 |
| --- | --- |
| 현재 저장소의 구조와 지속할 정책은 무엇인가? | [아키텍처](./architecture/README.md) |
| 왜 이 기술 선택을 했는가? | [기술 결정 기록](./decisions/README.md) |
| 저장소의 환경·협업·변경·작성 기준은 무엇인가? | [저장소 가이드](./guides/README.md) |
| 문서를 어떤 기준으로 작성하고 유지하는가? | [문서 작성 원칙](./guides/documentation-principles.md) |
| 배포·권한과 같은 외부 상태를 어떻게 변경하고 복구하는가? | [운영 절차](./operations/README.md) |
| 여러 변경에 걸친 작업은 어디까지 진행됐는가? | [실행 계획](./plans/README.md) |

## 배치 기준

| 내용 | 기준 위치 |
| --- | --- |
| 프로젝트와 공개 패키지 소개 | 루트 및 패키지 `README.md`·`README_KR.md` |
| 공개 심볼의 계약 | 소스 TSDoc |
| 생성 API 레퍼런스 | `libs/*/docs`의 파생 산출물 |
| 현재 구조, 경계와 정책 | `docs/architecture` |
| 선택의 배경, 대안과 결과 | `docs/decisions` |
| 저장소 공통 작업 절차와 작성·검증 기준 | `docs/guides` |
| 배포·권한과 실패 복구가 필요한 외부 변경 | `docs/operations` |
| 여러 변경에 걸친 한시적 진행 기록 | `docs/plans` |
