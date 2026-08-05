# 의존성 관리 가이드

- Last verified: 2026-08-05
- Verified against: `package.json`, `pnpm-workspace.yaml`, `pnpm-lock.yaml`, `libs/*/package.json`, `tools/*/package.json`, `.changeset/config.json`

이 가이드는 외부 의존성과 workspace 의존성을 추가·갱신·제거하거나 선언 위치를 바꿀 때 적용합니다. 현재 버전의 기준은 각 `package.json`과 `pnpm-workspace.yaml`, 실제 해석 결과의 기준은 `pnpm-lock.yaml`입니다. 현재 workspace 런타임 의존 방향은 [저장소 구조](../architecture/repository-structure.md), 변경 유형별 검증은 [테스트와 검증](./testing-and-validation.md)을 따릅니다.

## 버전 선택 원칙

- [로컬 개발 환경](./local-development.md)의 Node.js·pnpm 정책과 공개 패키지의 런타임·peer 계약에 호환되는 안정 버전을 우선합니다.
- 업데이트는 의존성 하나 또는 함께 움직여야 하는 작은 그룹으로 제한하고, 관련 없는 기능 변경과 섞지 않습니다.
- 새 의존성은 표준 API나 이미 설치한 의존성으로 책임을 해결할 수 없는지, 패키지의 유지 상태와 배포 크기가 감당 가능한지 먼저 확인합니다.
- 프리릴리스나 canary는 필요한 기능, 허용할 위험과 안정 버전으로 돌아갈 조건이 분명할 때만 사용합니다.
- 보안 수정은 일반 최신화보다 우선하지만 영향 조사와 호환성 검증을 생략하지 않습니다.
- 최신 버전을 선택할 수 없다면 현재 제약과 재검토 조건을 작업 결과에 남깁니다.

## 선언 위치 결정

| 용도 | 선언 위치 |
| --- | --- |
| 공개 패키지가 실행 중 직접 사용하는 외부 패키지 | 대상 패키지의 `dependencies` |
| 소비자가 설치하고 호환 범위를 충족해야 하는 도구나 라이브러리 | 대상 패키지의 `peerDependencies` |
| 빌드, 테스트와 문서 생성에만 필요한 패키지 | 가장 가까운 패키지 또는 루트의 `devDependencies` |
| 없어도 정의된 대체 동작으로 실행할 수 있는 런타임 기능 | 대상 패키지의 `optionalDependencies` |
| 저장소 전체에서만 사용하는 개발 도구 | 루트 `devDependencies` |

- 같은 외부 의존성을 여러 곳에서 **같은 버전 정책으로 유지할 의도**가 있을 때만 `pnpm-workspace.yaml#catalog`에 선언하고 소비 manifest에서 `catalog:`으로 참조합니다. 사용 위치가 여러 곳이라는 사실만으로 catalog에 합치지 않습니다.
- 같은 이름의 의존성도 저장소 개발 환경과 공개 peer 계약처럼 책임과 지원 범위가 다르면 별도 범위를 유지할 수 있습니다.
- workspace는 `autoInstallPeers: false`로 누락된 peer dependency를 자동 설치하지 않습니다. 직접 사용하는 peer는 해당 소비 위치에 명시적으로 선언하고, optional peer는 실제 기능에 필요할 때만 추가합니다.
- 내부 패키지는 실제 용도에 맞는 dependency 종류에 선언하고 버전은 `workspace:*`를 사용합니다. 독립 배포를 위해 저장소 안에서 외부 버전 범위를 미리 적지 않습니다.
- `catalog:`은 catalog의 실제 범위로, `workspace:*`는 대상 workspace 패키지의 정확한 버전으로 pack·publish 시 변환됩니다. 공개 패키지는 [공개 API 변경](./changing-a-public-api.md)의 pnpm pack 절차로 파일 목록과 생성된 `package.json`을 검토합니다.
- `pnpm-lock.yaml`은 manifest와 workspace 설정에서 생성하는 추적 대상이며 직접 편집하지 않습니다.

`peerDependencies` 범위와 공개 패키지의 설치·런타임 조건은 소비자 계약에 영향을 줄 수 있습니다. 이런 변경은 [공개 API 정책](../architecture/public-api-policy.md)으로 호환성을 판단하고 [공개 API 변경](./changing-a-public-api.md) 절차로 연결합니다.

## 변경 전 영향 조사

전체 workspace 또는 특정 외부 의존성의 상태와 사용처를 확인합니다.

```sh
pnpm outdated -r --long
pnpm outdated -r <dependency-name>
pnpm why -r <dependency-name>
```

`pnpm outdated`는 갱신 가능한 항목이 있으면 종료 코드 `1`을 반환합니다. 이는 조회 결과가 있다는 뜻이며 명령 실행 실패로 해석하지 않습니다. `pnpm why`는 일치하는 항목이 없어도 성공할 수 있으므로 출력도 함께 확인합니다.

대상의 공식 변경 로그와 마이그레이션 가이드에서 다음 항목을 확인합니다.

- 지원하는 Node.js와 TypeScript 버전
- peer dependency 범위와 함께 갱신해야 하는 패키지
- 제거된 API, 새 기본값, 모듈 형식과 생명주기 변경
- 영향받는 workspace 패키지와 공개·private 경계

workspace 의존성을 추가하거나 제거한다면 [저장소 구조의 런타임 의존 방향](../architecture/repository-structure.md#런타임-의존-방향)과 실제 import 사용처를 함께 확인합니다.

## 범위를 정한 변경

### 추가와 제거

대상 패키지의 실제 용도에 맞는 옵션으로 추가합니다.

```sh
pnpm --filter <package-name> add <dependency-name>
pnpm --filter <package-name> add --save-dev <dependency-name>
pnpm --filter <package-name> add --save-peer <dependency-name>
pnpm --filter <package-name> remove <dependency-name>
```

내부 패키지는 registry로 대체되지 않도록 `--workspace`로 추가합니다. 개발 전용이면 `--save-dev`도 함께 사용합니다.

```sh
pnpm --filter <consumer-package> add --workspace <workspace-package>
```

루트 개발 도구에는 `--workspace-root`를 사용합니다. catalog에서 버전을 소유해야 한다면 추가 명령에 `--save-catalog`를 함께 사용하고, 내부 패키지는 `workspace:*`가 유지되는지 확인합니다. 마지막 소비자를 제거했다면 사용하지 않는 catalog 항목도 제거합니다.

새 의존성이 설치 스크립트를 요구하면 스크립트의 역할과 출처를 검토한 뒤 필요한 패키지만 승인합니다.

```sh
pnpm ignored-builds
pnpm approve-builds <dependency-name>
```

승인 결과는 `pnpm-workspace.yaml#allowBuilds`에 기록됩니다. 단순히 설치 경고를 없애기 위해 승인하지 않으며, 의존성을 제거한 뒤 더는 필요 없는 승인 항목도 정리합니다.

### 갱신

패키지 하나, 루트 또는 같은 의존성을 사용하는 workspace 전체 중 필요한 범위만 선택합니다.

```sh
pnpm --filter <package-name> up <dependency-name>@latest
pnpm --workspace-root up <dependency-name>@latest
pnpm up -r <dependency-name>@latest
```

`catalog:`을 참조하는 의존성은 패키지 하나를 `--filter`해도 중앙 catalog 범위가 바뀌어 모든 참조 패키지에 영향을 줄 수 있습니다. 갱신 전에 `pnpm why -r`로 소비자를 확인하고 실제 diff를 기준으로 검증 범위를 정합니다.

여러 항목을 직접 선택할 때는 대화형 모드를 사용할 수 있습니다.

```sh
pnpm up -r --interactive --latest
```

대화형 모드는 미리보기가 아니며 선택을 확정하면 파일을 변경합니다. `@latest`와 `--latest`는 기존 버전 범위를 무시하고 major 버전을 넘을 수 있으므로 변경 로그를 확인한 뒤 사용합니다.

manifest나 catalog를 직접 편집했다면 일반 `pnpm install`로 lockfile과 로컬 설치를 함께 동기화합니다. `pnpm install --lockfile-only`는 로컬 설치를 바꾸지 않으므로 이후 빌드와 테스트에서 새 버전을 검증해야 하는 작업의 대체 명령이 아닙니다.

변경 후 `package.json`, `pnpm-workspace.yaml`과 `pnpm-lock.yaml` diff에 선택한 직접 의존성과 예상한 전이 의존성만 포함됐는지 확인합니다.

## 검증 범위

가장 가까운 영향 패키지부터 [테스트와 검증](./testing-and-validation.md)의 build와 일회성 test를 실행합니다. 대상 패키지에 해당 스크립트가 없으면 패키지 README가 정의한 소비자 검증을 사용합니다.

- 루트 도구, catalog 또는 여러 패키지의 빌드 환경을 바꾸면 전체 검증으로 확장합니다.
- workspace 런타임 간선을 바꾸면 의존 대상과 직접 의존 패키지를 함께 검증하고 저장소 구조의 현재 그래프를 갱신합니다.
- 공개 패키지의 `dependencies`, `optionalDependencies`, `peerDependencies` 또는 지원 런타임 조건이 소비자에게 영향을 주면 공개 API 변경 절차에 따라 패키징과 문서를 확인합니다.
- 소비자에게 전달되는 변경은 [Changesets 관리](./managing-changesets.md)에 따라 changeset 필요 여부와 버전 수준을 판단합니다. 개발 전용 의존성이나 lockfile 해석만 바뀐 경우에는 소비자 영향이 있는지부터 확인합니다.
- 의존성을 제거했다면 import, 설정, 스크립트와 catalog 항목이 남아 있지 않은지 검색합니다.

## 완료 기록

작업 결과에는 추가·갱신·제거한 의존성과 선택한 범위, 중요한 호환성 변화, 실행한 검증을 남깁니다. 최신 버전을 보류했다면 현재 제약과 재검토 조건도 기록합니다. 미완료 후속 작업이 여러 변경에 걸치면 [실행 계획](../plans/README.md), 장기적인 구조 선택과 트레이드오프가 있으면 [ADR](../decisions/README.md)로 분리합니다.

## 공식 참고 문서

- [pnpm add](https://pnpm.io/11.x/cli/add)
- [pnpm remove](https://pnpm.io/11.x/cli/remove)
- [pnpm outdated](https://pnpm.io/11.x/cli/outdated)
- [pnpm update](https://pnpm.io/11.x/cli/update)
- [pnpm catalogs](https://pnpm.io/11.x/catalogs)
- [pnpm workspace protocol](https://pnpm.io/11.x/workspaces#workspace-protocol-workspace)
- [pnpm approve-builds](https://pnpm.io/11.x/cli/approve-builds)
- [pnpm pack](https://pnpm.io/11.x/cli/pack)
