# 릴리스

- Last verified: 2026-08-04
- Verified against: `.github/workflows/ci.yaml`, `.github/workflows/release.yaml`, `.changeset/config.json`, `package.json`

릴리스는 `.github/workflows/release.yaml`과 Changesets로 관리합니다.

## 흐름

1. 공개 패키지 변경은 [Changesets 관리](../guides/managing-changesets.md)에 따라 changeset을 포함합니다.
2. PR의 [전체 검증](../guides/testing-and-validation.md)이 통과한 뒤 변경을 `main`에 병합합니다.
3. `main` push로 Release workflow가 실행됩니다.
4. 미소비 changeset이 있으면 Changesets action이 버전 PR을 생성하거나 갱신합니다.
5. 버전 PR이 병합되면 패키지를 빌드하고 npm에 배포합니다.

Release workflow는 패키지를 다시 빌드하지만 lint와 test를 반복하지 않으므로 병합 전 CI가 검증 경계입니다.

## 워크플로우 책임

- `pnpm install --frozen-lockfile`
- 전체 패키지 빌드
- `pnpm run version`을 통한 버전 및 lockfile 갱신
- `pnpm changeset publish`를 통한 배포

## 수동 확인

- changeset의 버전 수준이 [공개 API 정책](../architecture/public-api-policy.md)과 맞는가?
- 내부 의존 패키지의 연쇄 버전 변경이 예상과 맞는가?
- changelog가 소비자 관점에서 이해 가능한가?
- 패키지 `README.md`·`README_KR.md`와 [생성 API 문서](../guides/generating-api-docs.md)가 최신인가?

## 실패 시 확인

- 버전 PR이 생성되지 않으면 미소비 changeset이 있는지 `pnpm changeset status`로 확인합니다.
- 배포가 실패하면 GitHub Actions 로그에서 실패한 패키지와 npm 인증 또는 권한 오류를 확인합니다.
- 일부 패키지만 배포된 경우 npm의 실제 버전을 확인한 뒤 워크플로우를 재실행합니다.
- 워크플로우 밖에서 버전 파일이나 changelog를 임의로 수정하지 않습니다.
