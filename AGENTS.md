# AGENTS.md

이 파일은 [AGENTS.md 오픈 포맷](https://agents.md/)을 따르는 코딩 에이전트 실행 계약입니다. 사람을 위한 흐름은 [기여 가이드](./CONTRIBUTING.md), 세부 절차는 연결된 저장소 가이드를 따릅니다.

## 환경 준비

Node.js와 pnpm 요구사항, 의존성 설치와 Git hook 설정은 [로컬 개발 환경](./docs/guides/local-development.md)을 따릅니다.

## 작업 원칙

- 구현 전에 [GitHub 작업 추적](./docs/guides/tracking-work-with-github.md)에 따라 기존 이슈를 확인하거나 새 이슈를 만들고 작업을 연결합니다. GitHub에 접근할 수 없으면 이슈 링크를 임의로 만들지 않고 사용자에게 알립니다.
- 구현 전에 가정, 변경 범위, 성공 기준을 명확히 합니다.
- 결과를 바꾸는 불명확성이 있으면 조용히 가정하지 말고 질문합니다.
- 요청을 해결하는 최소한의 변경만 수행합니다.
- 관련 없는 코드나 문서, 기존 사용자 변경을 수정하지 않습니다.
- 변경 유형에 맞는 검증을 실행하고 결과를 확인합니다.
- 실행하지 못한 검증과 남은 위험을 명확히 알립니다.

## 사실 확인 순서

버전, 스크립트와 패키지 경계처럼 변할 수 있는 실행 사실은 현재 작업 트리에서 확인합니다.

1. 대상 패키지의 `package.json`, 소스, 가까운 테스트와 README
2. 루트 `package.json`, `pnpm-workspace.yaml`, 공용 설정과 워크플로우
3. 이 파일과 [저장소 문서](./docs/README.md)

manifest, 설정과 워크플로우는 현재 실행 사실의 기준입니다. 반면 소스 TSDoc, Architecture와 ADR은 의도한 공개 계약·정책·선택 이유를 기록합니다. 이 계약과 구현이 다르면 어느 한쪽을 자동으로 덮어쓰지 말고 구현 결함인지 의도한 계약 변경인지 먼저 판별한 뒤 해당 변경 절차를 따릅니다.

## 저장소 가이드

- `libs/*`: npm에 공개되는 라이브러리 패키지
- `tools/*`: 빌드·CLI 도구와 공유 설정 패키지

변경 전에 [저장소 가이드](./docs/guides/README.md)에서 작업 유형에 맞는 절차를 선택합니다. Architecture, ADR, 운영 절차와 활성 Plan은 [저장소 문서](./docs/README.md)에서 찾고, 패키지 고유 명령과 계약은 가장 가까운 `package.json`, README, 소스와 테스트에서 확인합니다.

## 반드시 지킬 제약

- 공개 TypeScript API 설명의 기준은 소스 TSDoc입니다.
- `libs/*/docs`는 API Documenter가 생성하므로 직접 수정하지 않습니다.
- `tools/json-schema-conformance/generated`는 적합성 생성기가 관리하므로 직접 수정하지 않습니다.
- `libs/*`와 `tools/*`의 각 workspace 패키지는 `README.md`와 `README_KR.md`를 함께 유지하고, 패키지 사실이 바뀌면 [Markdown 작성](./docs/guides/writing-markdown.md)에 따라 두 문서를 같은 변경에서 검토합니다.
- 공개 패키지의 설치 방법과 대표 예제는 해당 `README.md`와 `README_KR.md`에 둡니다. private 도구는 역할, 명령과 검증 방법을 설명합니다.
- 공개 패키지의 소비자 계약 변경에는 관련 테스트·문서, 패키징 검토와 changeset을 포함합니다. 라이브러리 TypeScript API를 바꾸면 TSDoc과 생성 문서도 갱신합니다.
- 설계 선택의 배경은 기존 현재 상태 문서에 섞지 않고 ADR로 기록합니다.
- 여러 변경에 걸친 미완료 작업만 Plan에 기록하고, 단순 구현 상세나 일회성 수정에는 별도 문서를 만들지 않습니다.
