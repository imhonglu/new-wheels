# GitHub Actions 작성 가이드

- Last verified: 2026-08-04
- Verified against: `.github/workflows/ci.yaml`, `.github/workflows/release.yaml`, `package.json`, `docs/guides/testing-and-validation.md`, `docs/operations/release.md`

이 가이드는 GitHub Actions 워크플로의 최소 구성, 트리거, 실행 속도와 구현 경계를 설명합니다. 검증 범위는 [테스트와 검증](./testing-and-validation.md), 배포 판단과 실패 대응은 [릴리스](../operations/release.md)가 소유합니다. 실행 사실의 기준은 `.github/workflows`의 현재 YAML입니다.

## 기본 방향

- 필요한 상태 변화에만 실행하고, 각 실행은 필요한 결과 하나를 책임집니다.
- 저장소가 지원하는 최신 Node.js LTS 주 버전에서 검증합니다.
- 오래된 실행을 취소하고 다운로드를 캐시하되 검증 자체는 생략하지 않습니다.
- 실행 시간을 줄이기 위한 분기와 추상화가 오동작 위험이나 유지 비용보다 실제로 이득일 때만 추가합니다.

최소 구성은 줄 수가 가장 적은 YAML이 아니라, 실행 이유와 실패 지점을 예측하는 데 불필요한 계층이 없는 상태를 뜻합니다.

## 이름과 배치

워크플로 파일은 `.github/workflows`에 소문자 kebab-case와 `.yaml` 확장자로 둡니다. 이름은 `<동작>-<대상>[-<한정자>].yaml`을 기본으로 하되 `ci.yaml`처럼 책임이 명확한 관용 이름은 그대로 사용합니다. 트리거만 다른 같은 책임을 구분해야 할 때만 `manual` 같은 한정자를 붙입니다.

- 워크플로 `name`은 GitHub UI에서 역할을 바로 알 수 있는 영어 Title Case로 작성합니다.
- `job` ID만으로 역할이 분명하면 `job.name`은 생략합니다. matrix 값처럼 실행마다 달라지는 정보를 보여 줄 때만 추가합니다.
- 단계 이름은 `Checkout`, `Setup pnpm`, `Build packages`처럼 수행 동작과 대상을 나타냅니다.
- 다른 곳에서 참조하지 않는 `job`이나 단계에는 별도 ID를 추가하지 않습니다.

책임이 바뀌어 기존 이름으로 동작을 예측하기 어려울 때만 파일명과 표시 이름을 함께 바꾸고, 모든 참조와 문서 링크를 갱신합니다.

## 트리거와 실행 제어

- `on`에는 결과를 새로 계산하거나 외부 상태를 바꿔야 하는 이벤트만 선언합니다. 이벤트를 추가하기 전에 입력이 무엇이 달라졌고 기존 실행 결과를 재사용할 수 없는지 확인합니다.
- PR CI는 열림, 새 커밋, 다시 열림과 검토 준비 전환에 반응합니다. draft PR에서는 runner를 할당하지 않으며 draft 전환 이벤트는 진행 중인 같은 PR 실행을 취소하는 용도로만 받습니다.
- 필수 PR CI에는 단순 `paths`·`paths-ignore`를 사용하지 않습니다. 경로 필터로 workflow 전체가 생략되면 required check가 pending으로 남을 수 있고, 이 저장소는 문서와 설정도 같은 CI에서 검증합니다.
- `main` push 작업은 모든 병합이 아니라 실제 책임의 입력 파일로 좁힙니다. Release는 미소비 changeset Markdown이 추가·변경·삭제될 때만 자동 실행하며 `workflow_dispatch`는 복구와 명시적인 재실행에 사용합니다.
- 워크플로 기본 권한은 `contents: read`로 제한하고 쓰기 권한은 필요한 `job`에만 부여합니다.
- 같은 대상의 중복 실행이 불필요한 비용이나 경합을 만들면 대상이 드러나는 `concurrency` group을 사용합니다. 새 커밋으로 대체할 수 있는 PR 검증은 이전 실행을 취소하고, 릴리스처럼 외부 상태를 바꾸는 작업은 진행 중인 실행을 취소하지 않습니다.
- 모든 `job`은 명시적인 `runs-on`과 예상 실패 시간을 제한하는 `timeout-minutes`를 가집니다. 타임아웃은 cold cache와 외부 서비스 지연을 고려해 정상 실행 시간보다 충분히 크게 정합니다.
- PR의 코드를 실행하는 검증과 GitHub 또는 외부 상태를 변경하는 작업은 권한 경계가 다르면 별도 `job`이나 워크플로로 분리합니다.

## 실행 속도

- PR별 concurrency로 새 커밋이 대체한 이전 실행을 즉시 취소합니다.
- 같은 권한과 실행기를 쓰는 검증은 한 `job`에서 설치와 빌드 결과를 공유합니다. 병렬화로 줄어드는 시간이 중복 checkout·설치·cache 복원 비용보다 크다고 측정됐거나 권한과 실행기 격리가 필요할 때만 `job`을 나눕니다.
- 빠른 정적 검사를 build와 test보다 먼저 실행해 명백한 실패를 일찍 반환합니다.
- 의존성 캐시는 다운로드만 줄이며 `pnpm install --frozen-lockfile`, build와 test를 건너뛰는 조건으로 사용하지 않습니다.
- build와 정적 검사는 저장소 전체에 실행합니다. 테스트는 pnpm workspace 그래프에서 변경된 패키지와 dependent를 선택하며, 테스트 파일만 바뀌면 `test-pattern`으로 dependent까지 확장하지 않습니다. Markdown만 바뀐 패키지는 테스트 대상에서 제외합니다.
- 루트 `package.json`, lockfile, workspace 선언, 루트 Vitest 설정이나 CI workflow처럼 모든 패키지의 테스트 환경과 실행 방식에 영향을 주는 파일이 바뀌면 전체 테스트와 적합성 기준선으로 확장합니다.
- 별도 path 분류 action이나 동적 matrix를 두지 않습니다. 패키지 경계와 의존 방향은 manifest가 소유하고 pnpm filter가 같은 그래프를 사용해야 합니다.
- Release의 build는 버전 PR 생성 전에 실행하지 않고 Changesets가 실제 publish 명령을 호출할 때 수행합니다.

## 도구 설정과 재사용

Node.js 실행 버전은 공식 릴리스 일정에서 가장 새로운 LTS 주 버전을 숫자로 명시합니다. 자동으로 움직이는 별칭은 사용하지 않으며 새 LTS가 나오면 로컬 환경, `package.json#engines`와 모든 workflow를 같은 변경에서 검증하고 올립니다. 현재 기준은 Node.js 24입니다.

pnpm 버전의 기준은 루트 `package.json#packageManager`이며 `pnpm/action-setup`에 같은 버전을 다시 선언하지 않습니다. 의존성 캐시는 `actions/setup-node`의 pnpm cache를 사용하고, 설치는 `pnpm install --frozen-lockfile`로 manifest와 lockfile의 불일치를 실패로 처리합니다.

외부 액션은 공식 저장소의 현재 지원 major와 변경 사항을 확인한 뒤 갱신합니다. major tag를 바꾸면 요구 runner 버전과 입력의 호환성을 함께 확인합니다.

짧은 체크아웃·설정·명령 연결은 워크플로 YAML에 둡니다. 파싱, 계산이나 정책 판정처럼 단위 테스트가 필요한 로직은 `tools/*`의 TypeScript CLI나 함수로 옮깁니다. 둘 이상의 워크플로가 같은 입력과 동작을 반복하고 별도 책임으로 설명할 수 있을 때만 `.github/actions/<동작>-<대상>/action.yaml`의 composite action으로 추출합니다. 단순한 setup 단계 몇 개의 중복만으로는 추출하지 않습니다.

주석은 YAML만으로 드러나지 않는 이유, 안전 조건과 재검토 조건을 설명할 때만 사용합니다. 단계 이름이나 명령을 반복하는 주석과 기한 없는 TODO는 남기지 않습니다.

## 검증

워크플로를 변경하면 Actionlint로 YAML, 표현식과 `run` 셸을 검사하고 문서 링크와 whitespace를 확인합니다.

```sh
docker run --rm --volume "$PWD:/repo" --workdir /repo rhysd/actionlint:1.7.12
pnpm run check:docs
git diff --check
```

Actionlint는 권한의 충분성, concurrency 동작, 외부 액션의 런타임 호환성과 실제 명령 결과를 보장하지 않습니다. PR에서 실제 CI 결과를 확인하고, 릴리스 워크플로 변경은 권한·버전 PR 생성·npm 배포 경계를 수동으로 검토합니다.

<!-- cspell:ignore rhysd -->
