# 저장소 가이드

이 디렉터리는 저장소 안에서 반복해서 적용하는 환경 준비, 협업 방식, 변경 절차와 작성·검증 기준을 설명합니다. 프로젝트와 패키지의 사용법은 가장 가까운 README, 현재 구조와 지속할 정책은 [아키텍처](../architecture/README.md), 외부 상태를 바꾸는 절차는 [운영 절차](../operations/README.md)가 소유합니다.

사람의 기여 흐름은 [`CONTRIBUTING.md`](../../CONTRIBUTING.md), 코딩 에이전트의 추가 실행 제약은 [`AGENTS.md`](../../AGENTS.md)에서 시작합니다.

## 시작과 협업

- [로컬 개발 환경 준비](./local-development.md): 최신 Node.js LTS·pnpm 요구사항, 의존성 설치와 Git hook 확인
- [GitHub 이슈와 PR로 작업 추적](./tracking-work-with-github.md): 이슈 선행 생성, 변경 범위와 PR 연결

## 변경과 유지보수

- [의존성 관리](./managing-dependencies.md): 외부·workspace 의존성의 선언, 갱신과 검증
- [공개 API 변경](./changing-a-public-api.md): 영향 조사부터 changeset까지의 절차
- [API 문서 생성](./generating-api-docs.md): TSDoc 기반 레퍼런스 생성과 문제 해결
- [Changesets 관리](./managing-changesets.md): 버전 영향 기록과 검증

## 작성과 검증 기준

- [문서 작성 원칙](./documentation-principles.md): 독자, 근거, 단일 소유와 문서 생명주기
- [CLI 도구 작성](./writing-cli-tools.md): TypeScript CLI의 빌드·실행 경계와 테스트
- [GitHub Actions 작성](./writing-github-actions.md): 최소 구성, 트리거, 실행 속도와 구현 경계
- [TypeScript 문서화](./documenting-typescript.md): 공개 TSDoc과 내부 주석의 기준
- [Markdown 작성](./writing-markdown.md): workspace README 언어 쌍, 메타데이터, 링크와 검증
- [테스트와 검증](./testing-and-validation.md): 로컬 검사, Git hook, CI 피드백
