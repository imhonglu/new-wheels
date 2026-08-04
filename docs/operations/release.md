# 릴리스

- Last verified: 2026-08-04
- Verified against: `.github/workflows/ci.yaml`, `.github/workflows/release.yaml`, `.changeset/config.json`, `package.json`

릴리스는 `.github/workflows/release.yaml`과 Changesets로 관리합니다.

## 흐름

1. 공개 패키지 변경은 [Changesets 관리](../guides/managing-changesets.md)에 따라 changeset을 포함합니다.
2. PR의 [전체 검증](../guides/testing-and-validation.md)이 통과한 뒤 변경을 `main`에 병합합니다.
3. changeset Markdown을 포함한 변경이 `main`에 들어오면 Release workflow가 실행됩니다.
4. 미소비 changeset이 있으면 Changesets action이 빌드 없이 버전 PR을 생성하거나 갱신합니다.
5. 버전 PR 병합으로 changeset Markdown이 제거되면 Release workflow가 다시 실행되고, `pnpm run release`가 패키지를 빌드한 뒤 npm에 배포합니다.

Release workflow는 패키지를 다시 빌드하지만 lint와 test를 반복하지 않으므로 병합 전 CI가 검증 경계입니다. 트리거, 권한과 실행 명령의 기준은 이 문서가 아니라 실제 workflow입니다.

## 자동화 경계

Release workflow는 `.changeset/*.md`가 추가·변경·삭제된 `main` push와 명시적인 수동 실행만 받습니다. 고정 lockfile로 의존성을 설치한 뒤 Changesets action에 버전 PR 생성 또는 npm 배포를 맡기며, 전체 build는 실제 publish 명령 안에서만 실행합니다. 이 문서는 workflow 명령을 복제하지 않고 사람이 판단해야 하는 확인 사항과 실패 대응만 소유합니다.

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
