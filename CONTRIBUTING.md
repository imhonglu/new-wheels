# 기여 가이드

이 문서는 사람이 `new-wheels`에 변경을 기여할 때 사용하는 진입점입니다. 코딩 에이전트를 사용하면 [`AGENTS.md`](./AGENTS.md)의 실행 제약도 함께 적용합니다.

## 준비

필요한 Node.js와 pnpm 버전, 의존성 설치와 Git hook 확인은 [로컬 개발 환경](./docs/guides/local-development.md)을 따릅니다.

## 기본 흐름

1. [GitHub 작업 추적](./docs/guides/tracking-work-with-github.md)에 따라 이슈를 먼저 만들고 완료할 결과와 조건을 정합니다.
2. [저장소 가이드](./docs/guides/README.md)에서 변경 유형에 맞는 기준 문서를 확인합니다.
3. 구현과 가까운 테스트부터 실행하고 영향 범위에 맞게 검증을 확장합니다.
4. 공개 계약에 영향이 있으면 문서와 changeset을 함께 갱신합니다.

저장소 구조, 기술 결정, 운영 절차와 활성 계획은 [저장소 문서](./docs/README.md)에서 찾습니다.

## 완료와 커밋

최종 diff와 검증 결과를 확인하고 실행하지 못한 검사를 기록합니다. 커밋 메시지는 Conventional Commits 형식을 사용하며, 구현, 생성 문서와 changeset은 서로 독립적으로 검토할 가치가 있으면 별도 커밋으로 나눕니다.

Git hook과 CI에서 실행되는 검사의 정확한 범위는 [테스트와 검증](./docs/guides/testing-and-validation.md)을 기준으로 합니다.
