# 공개 API 변경 가이드

- Status: Active
- Last verified: 2026-07-21
- Verified against: `libs/*/src/index.ts`, `libs/*/package.json`, `.changeset/config.json`

## 1. 영향 범위 확인

공개 export와 저장소 내부 사용처를 검색합니다.

```sh
rg "<symbol>" libs tools
```

삭제하거나 변경하는 API를 의존 패키지가 사용하는지 확인합니다. 버전 수준은 [공개 API 정책](../architecture/public-api-policy.md)을 기준으로 정합니다.

## 2. 구현과 테스트

- 정상 동작과 실패 동작을 테스트합니다.
- 타입 추론이 계약의 일부라면 `expectTypeOf` 또는 타입 테스트를 추가합니다.
- 요청과 관련 없는 리팩터링을 섞지 않습니다.

```sh
pnpm --filter <package-name> build
pnpm --filter <package-name> test -- --run
```

## 3. 문서

- 라이브러리 공개 심볼의 TSDoc을 수정합니다.
- 패키지 README의 예제와 API 링크를 검토합니다.
- 라이브러리는 소스 빌드 후 API 문서를 생성합니다.
- 공개 CLI나 설정 진입점은 명령 동작, export 경로, package dry-run 결과를 검토합니다.

[API 문서 생성 가이드](./generating-api-docs.md)의 순서에 따라 빌드와 문서 생성을 실행합니다.

## 4. 버전 영향

[Changesets 관리 가이드](./managing-changesets.md)에 따라 대상 패키지의 버전 영향을 기록하고 내부 의존성 전파 결과를 확인합니다.

## 5. 완료 확인

- 제거한 API 이름이 README와 생성 문서에 남아 있지 않은가?
- 새 문서 링크가 실제 파일을 가리키는가?
- 직접 의존 패키지가 빌드되는가?
- 구현과 생성 문서를 필요에 따라 분리해 검토할 수 있는가?
