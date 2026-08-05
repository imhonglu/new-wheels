# 로컬 개발 환경 준비

- Last verified: 2026-08-05
- Verified against: `package.json`, `pnpm-lock.yaml`, `pnpm-workspace.yaml`, `.git-hooks/*`, `.github/workflows/ci.yaml`, `.github/workflows/release.yaml`

이 문서는 저장소를 처음 내려받거나 Node.js·pnpm을 바꾼 뒤 공통 로컬 환경을 준비하고 확인하는 절차입니다. 패키지 고유 명령은 가장 가까운 README, 변경 유형별 build·test와 검증 범위는 [테스트와 검증](./testing-and-validation.md)이 소유합니다.

## 요구사항

로컬 개발에는 실행 시점에 지원되는 [최신 Node.js LTS](https://nodejs.org/en/about/previous-releases)를 사용합니다. 루트 `package.json#engines`는 권장 버전을 고정하는 설정이 아니라 저장소와 공개 패키지가 지원하는 최소 호환 범위이며, 현재 기준은 다음과 같습니다.

- Node.js 24.11 이상
- pnpm 11 이상

따라서 Node.js는 최신 LTS이면서 `engines` 범위를 충족해야 합니다. 저장소가 사용하는 정확한 pnpm 버전은 `package.json#packageManager`에서 확인합니다. 저장소는 Node.js와 pnpm의 시스템 설치 방법이나 에디터 확장을 별도로 강제하지 않으며, 선택한 설치 방법은 이 요구사항을 충족해야 합니다.

CI와 릴리스 워크플로는 재현 가능한 검증을 위해 지원하는 Node.js 메이저 버전을 명시적으로 고정합니다. 새 LTS가 나오면 전체 설치·빌드·테스트를 먼저 검증한 뒤 두 워크플로의 버전을 함께 갱신합니다. 기존 버전의 지원을 중단할 근거가 있을 때만 `engines`의 최소 범위도 올립니다.

## 설치와 자동 설정

저장소 루트에서 lockfile을 변경하지 않고 의존성을 설치합니다.

```sh
pnpm install --frozen-lockfile
```

설치 스크립트를 비활성화하지 않았다면 루트 `prepare`가 자동으로 실행되어 Git의 `core.hooksPath`를 `.git-hooks`로 설정합니다. 정상 설치 뒤 `prepare`를 다시 실행할 필요는 없습니다.

## 확인

도구 버전, workspace 포함 범위와 Git hook 경로를 확인합니다.

```sh
node --version
pnpm --version
pnpm list --recursive --depth -1
git config --get core.hooksPath
```

- Node.js는 최신 LTS이면서 `package.json#engines`를 만족하고, pnpm은 `engines`와 `packageManager`에 고정한 버전을 모두 만족해야 합니다.
- workspace 목록은 `pnpm-workspace.yaml#packages`에 포함된 루트·라이브러리·도구 패키지를 보여야 합니다.
- Git hook 경로는 `.git-hooks`여야 합니다.

확인이 끝나면 [저장소 가이드](./README.md)에서 변경 유형에 맞는 문서를 선택합니다.

## 실패와 복구

- `node`나 `pnpm`을 찾지 못하면 사용한 설치 방법의 셸 설정을 적용하고 새 터미널에서 다시 확인합니다.
- Node.js가 최신 LTS가 아니거나 도구 버전이 요구 범위를 만족하지 않으면 도구를 갱신합니다. 로컬 환경에 맞추기 위해 저장소의 `engines`를 낮추지 않습니다.
- `--frozen-lockfile` 설치가 실패하면 manifest·workspace 설정과 `pnpm-lock.yaml`의 불일치를 먼저 확인합니다. 의존성 변경 작업이 아니라면 lockfile을 임의로 재생성하지 않습니다.
- `core.hooksPath`가 다르면 설치 시 스크립트를 비활성화했는지 확인합니다. 의도적으로 비활성화했다면 hook이 없는 것이 정상이며, 다시 사용하려면 해당 설정을 해제하고 `pnpm run prepare`를 실행합니다.

의존성이나 lockfile을 바꿔야 한다면 [의존성 관리](./managing-dependencies.md), hook과 CI가 실행하는 검사 범위는 [테스트와 검증](./testing-and-validation.md)을 따릅니다.
