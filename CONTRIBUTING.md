# 기여 가이드

이 문서는 `new-wheels` 저장소에 코드를 변경하는 기본 절차를 설명합니다.

## 준비

- Node.js 24 이상
- pnpm 11 이상

```sh
pnpm install --frozen-lockfile
```

설치 과정에서 저장소의 Git hook이 활성화됩니다.

## 작업 원칙

[개발 작업 원칙](./docs/guides/development-workflow.md)에 따라 변경 범위와 성공 기준을 먼저 정하고 요청과 직접 관련된 파일만 수정합니다.

공개 API 변경은 구현, 테스트, TSDoc, README 영향 검토, changeset을 함께 처리합니다. 생성 파일은 생성 명령으로만 갱신합니다.

## 검증

대상 패키지의 이름을 사용해 빠르게 검증합니다.

```sh
pnpm --filter <package-name> build
pnpm --filter <package-name> test -- --run
```

패키지에 `build` 또는 `test` 스크립트가 없으면 해당 패키지 README의 검증 절차를 따릅니다. 예를 들어 `@imhonglu/configs` 변경은 소비 패키지를 포함한 전체 build로 확인합니다.

저장소 전체 검증은 CI와 같은 명령을 사용합니다.

```sh
pnpm run build
pnpm cspell --no-summary --no-progress .
pnpm biome ci .
pnpm run check:docs
pnpm vitest --run --exclude "src/generated-tests/**"
```

## 공개 API 변경

공개 export를 추가, 제거하거나 시그니처를 변경하면 다음 문서를 따릅니다.

- [공개 API 변경 가이드](./docs/guides/changing-a-public-api.md)
- [문서 작성 가이드](./docs/guides/writing-documentation.md)
- [Changesets 관리 가이드](./docs/guides/managing-changesets.md)

## 커밋

커밋 메시지는 Conventional Commits 형식을 사용합니다. 구현, 생성 문서, changeset은 서로 독립적으로 검토할 가치가 있으면 별도 커밋으로 나눕니다.

Git hook은 스테이지된 파일에 CSpell과 Biome을 실행하고 Markdown 파일이 포함되면 내부 파일 링크를 확인합니다. 커밋 메시지는 Commitlint로 검사합니다.
