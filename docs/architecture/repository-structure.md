# 저장소 구조

- Status: Active
- Last verified: 2026-07-21
- Verified against: `pnpm-workspace.yaml`, `libs/*/package.json`, `tools/*/package.json`

`new-wheels`는 TypeScript 라이브러리와 이를 지원하는 도구를 관리하는 pnpm workspace입니다. `libs/*`와 일부 `tools/*`는 공개 npm 패키지이며, `@imhonglu/cli-tools`는 저장소 전용 private 패키지입니다.

## 영역

### `libs/*`

독립적으로 배포되는 공개 npm 패키지입니다. 각 패키지는 가능한 한 동일한 구조를 따릅니다.

```text
libs/<package>/
├── src/                 # 구현과 테스트
├── docs/                # API Documenter 생성 결과
├── README.md            # 영문 사용자 문서
├── README_KR.md         # 한글 사용자 문서
├── CHANGELOG.md         # Changesets가 관리하는 변경 기록
└── package.json
```

### `tools/*`

저장소의 빌드와 설정을 지원합니다.

- [`@imhonglu/build-tools`](../../tools/build-tools/README.md): 빌드 후 ESM 출력을 CommonJS로 변환하는 공개 패키지입니다.
- [`@imhonglu/cli-tools`](../../tools/cli-tools/README.md): 저장소 검증에 사용하는 private CLI 패키지입니다.
- [`@imhonglu/configs`](../../tools/configs/README.md): TypeScript와 API Extractor의 공유 설정을 제공하는 공개 패키지입니다.

## 설계 원칙

- 라이브러리와 코드 API는 패키지의 `src/index.ts`에서 명시적으로 노출합니다.
- 공개 도구의 CLI 명령과 설정 진입점은 `package.json`의 `bin`과 `exports`에서 명시적으로 노출합니다.
- 패키지는 불필요한 런타임 의존성을 추가하지 않습니다.
- 타입 안전성과 표준 동작과의 일관성을 우선합니다.
- 공개 API 문서는 소스 TSDoc에서 생성합니다.
- 배포 가능한 변경은 Changesets로 버전 영향을 기록합니다.

## 변경 위치 선택

- 소비자가 알아야 하는 내용은 패키지 README에 둡니다.
- 심볼 단위 계약은 해당 소스의 TSDoc에 둡니다.
- 여러 패키지에 적용되는 규칙은 이 디렉터리에 둡니다.
- 특정 선택의 이유가 중요하면 ADR을 작성합니다.
