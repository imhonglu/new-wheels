# 공개 API 변경 가이드

- Last verified: 2026-08-04
- Verified against: `libs/*/src/index.ts`, `libs/*/package.json`, `tools/*/src/index.ts`, `tools/*/package.json`, `pnpm-workspace.yaml`, `.changeset/config.json`

이 가이드는 공개 export뿐 아니라 런타임 동작, 설치 조건, 공개 CLI, 설정과 패키징처럼 [공개 API 정책](../architecture/public-api-policy.md)이 소비자 계약으로 정의한 변경에 적용합니다.

## 1. 영향 범위 확인

공개 export와 저장소 내부 사용처를 검색합니다.

```sh
rg "<symbol>" libs tools
```

삭제하거나 변경하는 API를 의존 패키지가 사용하는지 확인하고 소비자 코드가 수정 없이 같은 의미로 동작하는지 판단합니다.

## 2. 구현과 테스트

- 정상 동작과 실패 동작을 테스트합니다.
- 타입 추론이 계약의 일부라면 `expectTypeOf` 또는 타입 테스트를 추가합니다.
- 요청과 관련 없는 리팩터링을 섞지 않습니다.

[테스트와 검증](./testing-and-validation.md)에 따라 대상 패키지에서 시작해 직접 의존 패키지까지 검증 범위를 확장합니다.

## 3. 문서

- [TypeScript 문서화](./documenting-typescript.md)에 따라 공개 TypeScript 심볼의 TSDoc을 수정합니다.
- [Markdown 작성](./writing-markdown.md)에 따라 패키지 `README.md`와 `README_KR.md`의 예제와 API 링크를 함께 검토합니다.
- 라이브러리는 소스 빌드 후 API 문서를 생성합니다.
- 공개 CLI나 설정 진입점은 명령 동작과 export 경로를 검토합니다.
- 공개 패키지의 파일 목록을 확인합니다.

```sh
pnpm --filter <package-name> pack --dry-run
```

`catalog:`이나 `workspace:*` 의존성을 바꿨다면 dry-run 출력만으로 변환 결과를 추정하지 않고 실제 pnpm 패키지의 manifest를 확인합니다.

<!-- cspell:ignore mktemp -->

```sh
package_artifact_dir=$(mktemp -d)
pnpm --filter <package-name> pack --pack-destination "$package_artifact_dir"
tar -xOf "$package_artifact_dir"/*.tgz package/package.json
rm -r "$package_artifact_dir"
```

[API 문서 생성 가이드](./generating-api-docs.md)의 순서에 따라 빌드와 문서 생성을 실행합니다.

## 4. 버전 영향

[Changesets 관리 가이드](./managing-changesets.md)에 따라 대상 패키지의 버전 영향을 기록하고 내부 의존성 전파 결과를 확인합니다.

## 5. 완료 확인

- 제거한 API 이름이 README에 남아 있지 않고, 생성 대상 라이브러리라면 생성 문서에서도 제거되었는가?
- 새 문서 링크가 실제 파일을 가리키는가?
- 대상 패키지와 직접 의존 패키지의 관련 build·test가 통과했는가?
- 배포 파일 목록과 진입점이 의도와 일치하는가?
- changeset의 대상 패키지, 버전 수준과 workspace 전파 결과가 의도와 일치하는가?
- 구현과 생성 문서를 필요에 따라 분리해 검토할 수 있는가?
