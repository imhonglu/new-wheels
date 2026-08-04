# JSON Schema 적합성 도구를 공개 라이브러리에서 분리

- Status: Accepted
- Date: 2026-08-03
- Supersedes: None
- Superseded by: None

## Context

`@imhonglu/json-schema` 내부의 기존 생성기는 TypeScript Compiler API와 저장소의 AST 도우미에 의존했습니다. 이 결합은 적합성 테스트 생성이라는 개발 도구의 관심사를 공개 라이브러리 소스 안으로 가져오고, 저장소를 TypeScript 7로 전환할 때 생성기를 함께 깨뜨렸습니다.

생성 데이터에도 별도 제약이 있습니다. JSON Schema Test Suite에는 JavaScript 객체 리터럴에서 특별하게 취급되는 `__proto__` 키와 JavaScript의 안전한 정수 범위를 넘는 숫자 리터럴이 있습니다. JSON을 TypeScript 객체 리터럴로 변환하거나 파싱 후 다시 직렬화하면 리뷰 대상 원문이나 런타임 의미가 달라질 수 있습니다.

적합성 입력은 특정 upstream revision에 대해 재현할 수 있어야 하고, 생성 결과는 upstream checkout 없이도 타입 검사하고 리뷰할 수 있어야 합니다.

## Decision

- 적합성 테스트 생성과 실행은 private workspace 패키지 [`@imhonglu/json-schema-conformance`](../../tools/json-schema-conformance/README.md)가 소유합니다.
- 선택한 upstream 입력과 revision은 기계가 검사할 수 있는 lock manifest에 고정합니다.
- 선택한 JSON fixture는 다시 직렬화하지 않고 원문 그대로 커밋하며, 생성 코드는 실행 동작이 없는 얇은 테스트 모듈만 추가합니다.
- 생성기는 TypeScript Compiler API나 TypeScript 객체 리터럴 변환에 의존하지 않습니다.
- 알려진 실패는 같은 revision의 case ID에 고정하고, 예상 밖 실패와 통과를 모두 기준선 변경으로 처리합니다.

## Alternatives considered

### 기존 AST 생성기를 TypeScript 7에 맞춰 유지

컴파일러 내부 표현에 계속 결합되고 공개 라이브러리가 저장소 전용 생성 도구를 소유하는 문제가 남습니다. TypeScript 7.0에서 프로그램 방식 Compiler API를 그대로 대체할 수도 없습니다.

### fixture를 TypeScript 객체 리터럴에 삽입

생성 결과가 한 파일에 모이지만 `__proto__` 같은 키에 별도 예외 처리가 필요합니다. 큰 JSON 숫자도 파싱과 재직렬화 과정에서 원문이 바뀌므로, 단순한 생성 코드가 입력 의미를 은밀하게 변경할 수 있습니다.

### 테스트 실행 시 upstream 파일을 직접 탐색

wrapper 생성이 필요 없지만 테스트 수집이 외부 checkout 상태에 의존합니다. 고정된 입력과 변경 diff를 저장소에서 바로 검토할 수 없게 됩니다.

### upstream 저장소 전체를 vendoring

오프라인 재현성은 높지만 사용하지 않는 draft, remotes, 프로젝트 파일까지 저장소가 소유하게 됩니다. 현재 필요한 draft의 선택된 fixture만 커밋하는 편이 경계가 작습니다.

## Consequences

- TypeScript compiler를 갱신해도 fixture 생성이 Compiler API 호환성에 묶이지 않습니다.
- 공개 라이브러리 패키징에는 generator와 fixture가 포함되지 않습니다.
- 고정한 입력을 upstream checkout 없이 재현하고 원문과 직접 비교할 수 있습니다.
- 선택한 fixture와 테스트 모듈을 커밋하므로 파일 수는 늘지만 upstream 변경을 코드 리뷰에서 확인할 수 있습니다.
- upstream 갱신과 새 지원 추가는 lock, 생성 결과와 알려진 실패 기준선을 의도적으로 함께 검토해야 합니다.

현재 갱신·검증 절차는 [적합성 도구 README](../../tools/json-schema-conformance/README.md)와 [테스트와 검증](../guides/testing-and-validation.md)을 따릅니다.
