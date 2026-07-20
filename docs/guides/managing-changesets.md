# Changesets 관리 가이드

- Status: Active
- Last verified: 2026-07-21
- Verified against: `.changeset/config.json`, `package.json`, `.github/workflows/release.yaml`

Changesets는 공개 패키지의 버전과 changelog를 관리합니다. 버전 수준의 의미는 [공개 API 정책](../architecture/public-api-policy.md)을 기준으로 판단합니다.

## Changeset 추가

```sh
pnpm changeset
```

또는 `.changeset/<name>.md` 파일을 직접 작성합니다.

```md
---
"@imhonglu/package": minor
---

Describe the consumer-visible change.
```

요약은 구현 과정이 아니라 소비자가 알아야 할 변화와 마이그레이션 내용을 설명합니다.

## 검증

```sh
pnpm changeset status
```

`updateInternalDependencies: patch` 설정으로 인해 직접 지정하지 않은 의존 패키지가 patch 대상에 포함될 수 있습니다.

## 자동화 경계

릴리스 워크플로우는 changeset이 존재할 때 버전 PR 생성과 npm 배포를 자동화합니다. 변경의 의미와 버전 수준 결정은 사람 또는 작업 에이전트가 검토해야 합니다.
