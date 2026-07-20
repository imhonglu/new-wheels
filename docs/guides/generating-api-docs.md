# API 문서 생성 가이드

- Status: Active
- Last verified: 2026-07-21
- Verified against: `libs/*/package.json`, `libs/*/api-extractor.json`, `tools/configs/api-extractor-base.json`

라이브러리 패키지는 API Extractor와 API Documenter로 Markdown API 문서를 생성합니다.

이 방식의 선택 배경은 [ADR 0001: API 문서를 소스에서 생성](../decisions/0001-generate-api-docs-from-source.md)에 기록되어 있습니다.

## 생성

먼저 TypeScript 선언 파일을 생성한 뒤 문서 명령을 실행합니다.

```sh
pnpm --filter <package-name> build
pnpm --filter <package-name> generate-docs
```

`generate-docs`는 다음 작업을 수행합니다.

1. `dist/index.d.ts`에서 API 모델 생성
2. 기존 `docs` 출력 삭제
3. 현재 공개 API 전체를 Markdown으로 생성

## 수정 원칙

- 생성 파일을 직접 수정하지 않습니다.
- 설명이 잘못되면 소스 TSDoc을 수정합니다.
- 심볼이 누락되면 `src/index.ts` export와 빌드 결과를 확인합니다.
- `{@link}` 경고가 발생하면 API Extractor가 해석할 수 있는 공개 심볼인지 확인합니다.

## diff 검토

생성 후 다음을 확인합니다.

- 삭제된 API 문서가 의도한 삭제인가?
- 새 공개 심볼의 문서가 생성됐는가?
- 패키지 인덱스의 설명 열이 비어 있지 않은가?
- README 링크가 새 파일명을 가리키는가?
- API와 관련 없는 줄바꿈 변경이 섞이지 않았는가?

## 문제 해결

### 소스 변경이 생성 문서에 반영되지 않음

API Extractor는 소스가 아니라 `dist/index.d.ts`를 입력으로 사용합니다. 대상 패키지를 빌드한 뒤 문서를 다시 생성합니다. 생성된 Markdown을 직접 수정하면 다음 생성 시 변경이 사라집니다.

### 관련 없는 줄바꿈 변경이 발생함

기존 파일과 API Documenter 출력의 줄바꿈 형식이 다를 수 있습니다. 생성 결과인지 확인하고 내용 변경과 구분해 검토합니다. 의미 없는 변경을 숨기기 위해 생성 파일 일부만 수동 편집하지 않습니다.
