# 저장소 문서

이 디렉터리는 저장소 유지보수에 필요한 설명과 실행 절차를 보관합니다. 패키지 사용법은 각 패키지 README, 공개 API 상세는 각 패키지의 생성 문서를 참고합니다.

문서는 작업 전에 방향을 제공하는 가이드와 작업 후 결과를 검증하는 피드백 장치가 연결되도록 작성합니다. 반복적으로 위반되는 규칙은 가능한 범위에서 테스트, 린터, Git hook 또는 CI 검사로 옮깁니다.

## 문서 지도

- [아키텍처](./architecture/README.md): 저장소 구조, 패키지 경계, 공개 API 정책
- [기술 결정 기록](./decisions/README.md): 중요한 기술 결정과 트레이드오프
- [개발 가이드](./guides/README.md): 개발 작업을 수행하는 단계별 절차
- [운영 절차](./operations/README.md): 릴리스처럼 외부 상태를 변경하는 절차
- [엔지니어링 하네스](./engineering-harness.md): 저장소 규칙과 자동 검사의 연결 상태
- [실행 계획](./plans/README.md): 여러 변경에 걸친 실행 계획과 진행 기록

## 문서 유형과 생명주기

| 유형 | 답하는 질문 | 생성 기준 | 갱신 및 종료 방식 |
| --- | --- | --- | --- |
| Architecture | 현재 저장소는 어떤 구조와 정책을 유지하는가? | 여러 패키지에 적용되는 구조나 지속적인 정책이 필요할 때 | 현재 구현에 맞춰 덮어쓰며 갱신 |
| Decision | 왜 이 선택을 했는가? | 대안과 트레이드오프를 보존할 중요한 결정이 있을 때 | 기존 기록을 보존하고 새 ADR로 대체 |
| Guide | 반복 작업을 어떻게 수행하는가? | 순서, 명령 또는 완료 조건이 필요한 작업이 있을 때 | 실제 작업 절차에 맞춰 갱신하거나 통합 |
| Operation | 외부 상태를 어떻게 안전하게 변경하고 복구하는가? | 배포, 권한, 외부 서비스가 관련된 작업이 있을 때 | 워크플로우에 맞춰 갱신하고 실패 대응 포함 |
| Harness | 어떤 규칙을 어떤 센서가 검증하는가? | 가이드와 자동 검사의 연결 상태를 추적할 때 | 검사 설정과 함께 갱신 |
| Plan | 장기 작업을 어떤 순서와 기준으로 완료하는가? | 여러 변경이나 세션에 걸친 작업이 있을 때 | 완료·취소 상태와 최종 검증 결과를 기록 |

문제 해결 정보는 별도 지식 저장소에 모으지 않고 가장 가까운 Guide 또는 Operation에 둡니다. 서로 다른 주제의 문제 해결 문서가 실제로 늘어날 때 별도 `troubleshooting` 분류를 만듭니다.

## 문서 책임

| 내용 | 기준 위치 |
| --- | --- |
| 프로젝트와 패키지 소개 | 루트 및 패키지 README |
| 공개 API 계약 | 소스 TSDoc |
| 생성된 API 레퍼런스 | `libs/*/docs` |
| 패키지 경계와 정책 | `docs/architecture` |
| 중요한 선택의 이유 | `docs/decisions` |
| 반복 작업 절차 | `docs/guides` |
| 배포와 외부 상태 변경 절차 | `docs/operations` |
| 규칙과 검증 장치의 연결 | `docs/engineering-harness.md` |
| 장기 작업의 계획과 진행 상태 | `docs/plans` |

## 관리 원칙

- 같은 내용을 여러 문서에 복사하지 않고 기준 문서로 연결합니다.
- 현재 구현된 동작과 향후 계획을 명확히 구분합니다.
- 명령은 저장소 루트에서 실행 가능한 형태로 작성합니다.
- 문서가 설명하는 코드나 설정이 변경되면 같은 작업에서 문서를 검토합니다.
- 독립된 분류가 필요한 경우에만 하위 디렉터리를 만듭니다.
- 하위 디렉터리를 만들면 문서 목록과 추가 기준을 설명하는 `README.md`를 둡니다.
- 새 문서는 가장 가까운 인덱스에 등록합니다.

## 참고 자료

- [Mitchell Hashimoto "My AI Adoption Journey"](https://mitchellh.com/writing/my-ai-adoption-journey)
- [하네스 엔지니어링: 에이전트 우선 세계에서 Codex 활용하기](https://openai.com/ko-KR/index/harness-engineering/)
- [Harness engineering for coding agent users](https://martinfowler.com/articles/harness-engineering.html)
