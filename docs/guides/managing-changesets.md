# Changesets 관리 가이드

- Last verified: 2026-08-04
- Verified against: `.changeset/config.json`, `package.json`, `libs/*/package.json`, `tools/*/package.json`, `.github/workflows/release.yaml`

Changesets는 공개 패키지의 소비자 변경에 필요한 버전과 changelog를 관리하고 workspace 의존 관계에 따른 버전 전파를 계산합니다. 버전 수준의 의미는 [공개 API 정책](../architecture/public-api-policy.md)을 기준으로 판단합니다.

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

`updateInternalDependencies: patch` 설정으로 인해 변경 패키지를 workspace dependency로 사용하는 패키지가 patch 대상에 포함될 수 있습니다. 이 계산에는 private 패키지도 나타날 수 있지만, private 패키지를 배포한다는 뜻은 아닙니다.

## 자동화 경계

변경의 의미와 버전 수준 결정은 사람 또는 작업 에이전트가 검토해야 합니다. Changeset이 병합된 뒤의 버전 PR과 npm 배포 흐름은 [릴리스 운영 절차](../operations/release.md)를 따릅니다.

## 완료 확인

- 소비자에게 전달되는 공개 패키지와 버전 수준이 변경 의미에 맞는가?
- 요약이 구현 과정이 아니라 소비자 변화와 필요한 마이그레이션을 설명하는가?
- `pnpm changeset status`의 직접 변경과 workspace 전파 결과를 검토했는가?
