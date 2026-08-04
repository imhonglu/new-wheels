# JSON Schema conformance tooling

[English](./README.md) | [한국어](./README_KR.md)

`@imhonglu/json-schema`의 JSON Schema Draft 2020-12 적합성 suite를 생성하고 실행하는 private 도구입니다.

생성기는 고정한 upstream JSON fixture를 수정하지 않고 복사한 뒤 최소한의 Vitest 모듈을 추가합니다. 이 도구를 공개 라이브러리에서 분리하고 TypeScript Compiler API를 사용하지 않은 이유는 [ADR 0002](../../docs/decisions/0002-separate-json-schema-conformance-tooling.md)에 기록되어 있습니다.

## 경계

- `suite-lock.json`은 upstream 저장소, commit, draft와 제외 파일을 고정합니다.
- `known-failures.json`은 예상 실패 case를 같은 upstream revision에 고정합니다.
- `.cache/JSON-Schema-Test-Suite`는 폐기 가능한 checkout이며 commit하지 않습니다.
- `generated`에는 결정적으로 생성한 JSON fixture와 테스트 모듈 쌍을 두며 검토를 위해 commit합니다.
- 생성 디렉터리는 저장소 formatting과 spelling 검사에서 제외합니다. 생성기 단위 테스트는 최소 모듈 형식을 정의하고, TypeScript 7은 모듈을 검사하며, JSON fixture는 upstream과 byte 단위로 동일하게 유지합니다.
- 이 도구는 private 패키지이며 공개 `@imhonglu/json-schema` 경계에 의존합니다.
- 도구는 ESM 전용이며 공개 패키지의 CommonJS 변환 단계에서 제외합니다.
- CLI 구현은 저장소의 [CLI 도구 작성 가이드](../../docs/guides/writing-cli-tools.md)를 따릅니다.
- 기본 workspace 테스트는 `src` 아래 도구와 CLI 테스트만 실행합니다. CI는 생성 테스트가 일반 테스트 탐색에 포함되지 않도록 전체 적합성 기준선을 별도로 실행합니다.

## 기준선 소유권

`suite-lock.json`은 upstream 저장소, revision, draft와 제외 항목의 기준입니다. `known-failures.json`은 예상 fixture, group과 test-case 수 및 case 단위 실패 ID를 소유합니다. 기준선 검사는 이 manifest, fixture와 test module의 일대일 대응, 생성 wrapper 내용을 확인합니다. 새로운 실패나 예상하지 않은 통과가 발생하면 `test:conformance`는 0이 아닌 종료 코드로 끝납니다.

예상 실패 항목은 정확한 예외 형태가 아니라 적합성 결과를 분류합니다. 목록에 있는 case와 관련된 코드를 변경할 때는 예상 실패 상태가 그대로여도 diagnostic을 확인합니다.

복사한 fixture의 upstream MIT license는 [`UPSTREAM_LICENSE`](./UPSTREAM_LICENSE)에 유지합니다.

## 명령

고정된 upstream checkout을 갱신하고 테스트를 다시 생성합니다.

```sh
pnpm --filter @imhonglu/json-schema-conformance refresh-tests
```

network 접근 없이 기존 checkout에서 생성합니다.

```sh
pnpm --filter @imhonglu/json-schema-conformance build
node tools/json-schema-conformance/dist/bin/generate-tests.cli.js \
  --suite-dir /path/to/JSON-Schema-Test-Suite/tests/draft2020-12
```

도구 테스트 또는 전체 적합성 suite를 실행합니다.

```sh
pnpm --filter @imhonglu/json-schema-conformance test -- --run
pnpm --filter @imhonglu/json-schema-conformance check:generated
pnpm --filter @imhonglu/json-schema-conformance check:baseline
pnpm --filter @imhonglu/json-schema-conformance test:conformance
```
