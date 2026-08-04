# @imhonglu/cli-tools

[English](./README.md) | [한국어](./README_KR.md)

`@imhonglu/new-wheels`의 내부 문서 검사 명령입니다. 루트 `check:docs` 스크립트가 이 명령들을 조합합니다. 작성자 기준은 [Markdown 작성 가이드](../../docs/guides/writing-markdown.md), 구현과 테스트 구조는 저장소의 [CLI 도구 작성 가이드](../../docs/guides/writing-cli-tools.md)를 따릅니다.

개별 명령을 실행하기 전에 저장소 루트에서 private 패키지를 빌드합니다.

```sh
pnpm --filter @imhonglu/cli-tools build
```

## 명령

### `check-doc-structure`

인덱스가 아닌 Architecture, Guide와 Operation 문서의 파일명, 비어 있지 않은 단일 `#` H1, 인덱스와 메타데이터를 검사합니다. ADR의 파일명과 생명주기, 활성 Plan의 파일명·위치·구조는 별도 규칙으로 검사합니다.

```sh
node tools/cli-tools/dist/bin/check-doc-structure.cli.js docs
```

### `check-markdown-links`

Markdown 파일과 디렉터리의 로컬 링크 대상을 검사합니다.

```sh
node tools/cli-tools/dist/bin/check-markdown-links.cli.js README.md docs
```

로컬 대상 경로는 실제 파일명의 대소문자와 일치해야 합니다. 앵커 링크와 외부 URL은 검사하지 않습니다. 디렉터리 순회는 `.cache`, `assets`, `dist`, `docs`, `node_modules`, `src`, `temp`라는 생성 또는 의존성 디렉터리를 건너뜁니다. 제외된 디렉터리를 검사해야 한다면 해당 경로를 명시적으로 전달합니다.
