# GitHub 이슈와 PR로 작업 추적

- Last verified: 2026-08-04
- Verified against: `.github/ISSUE_TEMPLATE/task.yml`, `.github/ISSUE_TEMPLATE/config.yml`, `.github/pull_request_template.md`, `AGENTS.md`, `CONTRIBUTING.md`, `docs/plans/README.md`, `docs/decisions/README.md`

이 가이드는 저장소 변경을 시작하기 전에 GitHub 이슈로 결과와 완료 조건을 정하고, 구현과 PR을 같은 작업에 연결하는 기준입니다. 코드·문서의 현재 계약과 상세 구현 과정은 이슈가 아니라 해당 소스와 기준 문서가 소유합니다.

## 소유권

| 대상 | 소유하는 정보 |
| --- | --- |
| 이슈 | 변경이 필요한 이유, 완료할 결과, 범위와 완료 조건 |
| 브랜치와 커밋 | 이슈 결과를 만드는 검토 가능한 변경 단위 |
| PR | 실제 변경, 검증 결과, 남은 위험과 이슈 연결 |
| Plan | 하나의 이슈를 여러 단계·세션에 걸쳐 실행할 때 필요한 임시 진행 정보 |
| ADR | 구현 후에도 유지할 중요한 선택의 배경, 대안과 결과 |

현재 구현, 설정과 문서 내용을 이슈나 PR에 복사하지 않습니다. 이슈는 해당 파일을 근거로 연결하고, PR은 최종 diff와 검증 결과를 설명합니다.

## 작업 시작

모든 저장소 변경은 구현 전에 기존 이슈를 선택하거나 [작업 Issue Form](../../.github/ISSUE_TEMPLATE/task.yml)으로 새 이슈를 만드는 것에서 시작합니다. 작은 문서 수정이나 내부 리팩터링도 예외로 두지 않되, 결과와 완료 조건은 변경 규모에 맞게 간결하게 작성합니다.

`config.yml`은 일반 기여자에게 빈 이슈 선택지를 제공하지 않지만 유지보수자는 GitHub UI에서 빈 이슈를 계속 볼 수 있습니다. UI 노출 여부와 관계없이 저장소 작업에는 작업 Issue Form의 필드를 적용합니다.

1. 열려 있거나 닫힌 이슈에서 같은 결과를 다루는 항목을 검색합니다.
2. 제목은 구현 활동이 아니라 달성할 결과가 드러나는 간결한 명사형으로 작성합니다.
3. `배경과 목표`에는 현재 상태, 변경이 필요한 이유와 달성할 결과를 적습니다.
4. `범위`에는 같은 결과에 필요한 변경과 중요한 제외 범위만 적습니다.
5. `완료 조건`은 구현 여부를 관찰할 수 있는 동작과 상태로 작성합니다. 실제 실행한 검증 결과는 PR에 기록합니다.
6. 관련 문서·이슈, 재현 근거나 의존 작업이 있을 때만 `참고`에 연결합니다.

민감한 보안 정보나 비밀 값은 공개 이슈에 기록하지 않습니다. 공개할 수 없는 내용을 다루는 작업은 적절한 비공개 채널에서 먼저 범위와 공개 가능한 이슈 연결 방식을 정합니다.

## 변경 범위

하나의 이슈는 독립적으로 승인하고 종료할 수 있는 결과 하나를 소유합니다. 같은 결과에 필요한 구현, 테스트, 설정과 문서는 파일 종류가 달라도 같은 이슈에 둡니다. 별도로 승인하거나 되돌릴 수 있는 결과, 다른 완료 조건이나 후속 일정이 필요한 변경은 새 이슈로 분리합니다.

브랜치 이름에는 이슈 번호와 목적을 알아볼 수 있게 포함하는 것을 권장합니다. 고정 접두사나 형식은 자동화가 필요해질 때 도입합니다.

## Plan과 ADR

이슈는 작업의 이유와 완료 조건을 소유하므로 Plan에 같은 설명이나 체크리스트를 복사하지 않습니다. 하나의 이슈가 여러 패키지·PR·세션에 걸쳐 진행되어 별도 조율이 필요할 때만 [Plan](../plans/README.md)을 만들고 서로 링크합니다. Plan이 끝나면 지속할 구조는 Architecture, 선택 이유는 ADR로 옮긴 뒤 Plan을 삭제합니다.

구현 전에 합의할 작업 범위는 이슈에 두고, 구현 후에도 다른 대안을 다시 검토할 가치가 있는 구조적 선택만 [ADR](../decisions/README.md)로 남깁니다.

## PR 연결과 종료

PR은 [PR 템플릿](../../.github/pull_request_template.md)에 따라 관련 이슈, 실제 변경과 검증을 작성합니다. 추가 증거, 영향이나 남은 위험이 있을 때만 `참고`를 유지합니다.

- PR 하나의 병합으로 이슈가 완료되면 본문에 `Closes #<issue-number>`를 사용합니다.
- 같은 이슈에 후속 PR이 남아 있으면 중간 PR은 `Refs #<issue-number>`로 연결하고, 마지막 PR만 closing keyword를 사용합니다.
- PR에서 발견한 독립 작업은 현재 범위에 섞지 않고 새 이슈를 만들어 `참고`에서 연결합니다.
- 구현이 끝나도 이슈는 PR이 기본 브랜치에 병합되기 전까지 열린 상태로 유지합니다.

GitHub의 closing keyword는 기본 브랜치를 대상으로 하는 PR에서 병합될 때 연결된 이슈를 닫습니다. 정확한 동작은 [GitHub의 이슈와 PR 연결 문서](https://docs.github.com/issues/tracking-your-work-with-issues/using-issues/linking-a-pull-request-to-an-issue)를 따릅니다.

## 템플릿 변경

Issue Form은 [GitHub의 Issue Form 구문](https://docs.github.com/communities/using-templates-to-encourage-useful-issues-and-pull-requests/syntax-for-issue-forms), PR 템플릿의 위치와 동작은 [PR 템플릿 생성 문서](https://docs.github.com/communities/using-templates-to-encourage-useful-issues-and-pull-requests/creating-a-pull-request-template-for-your-repository)를 기준으로 확인합니다.

템플릿을 바꾸면 YAML 구문, 상대 링크, 맞춤법과 whitespace를 확인합니다. Issue Form 선택기와 PR 본문 자동 입력은 파일이 기본 브랜치에 병합된 뒤 GitHub에서 직접 확인해야 하므로, 로컬 파일만 검토한 상태에서 렌더링까지 검증했다고 기록하지 않습니다.

## 완료 확인

- 구현 전에 중복을 확인하고 이슈를 만들거나 선택했는가?
- 이슈가 결과 하나와 검증 가능한 완료 조건을 소유하는가?
- 구현·문서·테스트가 같은 이슈 범위 안에 있는가?
- PR이 이슈를 closing keyword 또는 참조로 연결했는가?
- 범위 밖 후속 작업을 별도 이슈로 분리했는가?
- 실행한 검증과 남은 위험을 PR에 기록했는가?
