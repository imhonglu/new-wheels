# 테스트와 검증 가이드

- Status: Active
- Last verified: 2026-07-21
- Verified against: `package.json`, `.git-hooks/*`, `.github/workflows/ci.yaml`, `vitest.config.ts`

## 빠른 피드백

작업 중에는 변경한 패키지만 검증합니다.

```sh
pnpm --filter <package-name> build
pnpm --filter <package-name> test -- --run
```

대상 패키지에 `build` 또는 `test` 스크립트가 없으면 패키지 README에 정의된 소비자 검증을 실행합니다. `@imhonglu/configs`는 자체 빌드 출력이 없으므로 저장소 전체 build와 package dry-run으로 확인합니다.

특정 테스트만 실행할 수도 있습니다.

```sh
pnpm --filter <package-name> exec vitest run <test-file>
```

## 저장소 피드백 장치

### 커밋 전

pre-commit hook은 스테이지된 파일에 CSpell과 Biome을 실행합니다. Markdown 파일이 포함되면 저장소 내부 파일 링크도 확인합니다. commit-msg hook은 Conventional Commits 형식을 검사합니다.

### 푸시 전

pre-push hook은 Git이 전달한 로컬 및 원격 commit 범위에서 코드 파일을 찾고 관련 Vitest 테스트를 실행합니다. 문서나 changeset만 변경된 경우 테스트를 생략하며, 새 브랜치는 remote HEAD와의 공통 조상을 기준으로 계산합니다.

### Pull Request

CI는 다음을 실행합니다.

- 전체 패키지 빌드
- CSpell
- Biome
- 저장소 내부 Markdown 파일 링크 검사
- 자동 생성 테스트를 제외한 Vitest 테스트

Git hook은 빠른 피드백을 위한 장치입니다. 작업 중에는 hook만 기다리지 않고 대상 패키지 테스트를 명시적으로 실행합니다.

## 실패 처리

변경과 무관해 보이는 실패도 재실행만으로 무시하지 않습니다.

1. 대상 테스트를 단독 실행합니다.
2. 변경 전에도 재현되는지 확인합니다.
3. 관련성이 없으면 결과와 근거를 작업 기록에 남깁니다.
4. 재현 조건과 해결 방법이 확인된 반복 문제는 가장 가까운 가이드의 문제 해결 절에 기록합니다.
