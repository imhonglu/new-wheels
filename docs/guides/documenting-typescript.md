# TypeScript 문서화 가이드

- Last verified: 2026-08-04
- Verified against: `libs/*/package.json`, `libs/*/src`, `libs/*/docs`, `tools/*/package.json`, `tools/*/src`, `tools/configs/api-extractor-base.json`, `tools/configs/tsconfig.base.json`, `tools/configs/tsconfig.lib.json`

이 가이드는 TypeScript 소스의 공개 TSDoc과 내부 주석을 작성하는 기준입니다. 소비자 계약 변경은 [공개 API 변경](./changing-a-public-api.md), 라이브러리 API 레퍼런스 생성은 [API 문서 생성](./generating-api-docs.md)을 함께 따릅니다.

## 공개 경계 판단

`export` 키워드만으로 공개 API를 판단하지 않습니다. 공개 패키지의 `package.json#exports`에서 시작해 각 TypeScript 진입점으로 소비자가 접근할 수 있는 심볼이 문서화 대상입니다. 현재 라이브러리의 루트 진입점 소스는 `src/index.ts`이지만 향후 하위 진입점이 생기면 같은 기준을 적용합니다. 파일 간 재사용이나 테스트를 위해 export한 심볼과 private 도구의 export는 그 자체로 공개 계약이 아닙니다.

공개 심볼에서 도달할 수 있는 클래스의 public·protected member와 공개 interface·options 타입의 property도 소비자가 사용하는 계약에 포함합니다.

내부 심볼은 공개 진입점에서 export하지 않는 것을 기본으로 합니다. 현재 API Extractor 설정은 누락된 release tag를 강제하지 않고 public 전용으로 declaration을 잘라내지도 않으므로 `@public`이나 `@internal` 태그를 공개 경계 장치로 사용하지 않습니다.

## 공개 TSDoc

공개 심볼에는 소비자가 역할과 계약을 이해할 수 있는 요약을 작성합니다. 태그는 타입 시그니처만으로 의미가 충분하지 않을 때만 추가합니다.

| 설명할 내용 | 표현 |
| --- | --- |
| 심볼의 역할과 보장 | 첫 문장 요약 |
| 입력값의 의미, 단위와 제약 | `@param` |
| 반환값의 의미와 특별한 상태 | `@returns` |
| 소비자가 처리할 수 있는 오류 조건 | `@throws` |
| 공개 property나 field의 타입에서 드러나지 않는 기본값 | `@defaultValue` |
| 직관적이지 않은 대표 사용법 | `@example` |
| 긴 계약, 불변식이나 상호작용 | `@remarks` |
| 관련 공개 심볼 | `{@link symbol}` |
| 외부 표준이나 규격 근거 | `@see`와 `{@link URL}` |

- 모든 매개변수와 반환값에 태그를 기계적으로 채우지 않습니다.
- 함수 매개변수의 기본값은 해당 `@param` 설명에 기록합니다.
- 구현 순서, 내부 자료구조와 테스트 내용을 공개 계약처럼 설명하지 않습니다.
- 자명한 getter, 타입 별칭과 단순 전달 함수에 예제를 강제하지 않습니다.
- `{@link}`는 소비자가 접근할 수 있고 API Extractor가 해석할 수 있는 심볼에 사용합니다.
- 패키지 전체의 설치와 대표 흐름은 README, 심볼 하나의 계약과 예제는 TSDoc이 소유합니다.

## 내부 주석

내부 함수와 타입은 전수 TSDoc 대상이 아닙니다. 이름, 타입, 작은 함수 분리와 테스트로 의도를 드러내는 방법을 먼저 사용합니다.

여러 모듈이 호출하는 내부 export는 호출 전제, 반환 의미, 실패 조건이나 부수효과가 이름과 타입만으로 분명하지 않을 때 TSDoc 형식으로 계약을 설명합니다. 파일 안에서만 사용하는 helper는 아래와 같이 코드만으로 복원하기 어려운 사실만 가까운 주석으로 남깁니다.

- 선택한 구현의 이유와 버리면 안 되는 불변식
- 외부 표준, 파일 형식이나 도구가 요구하는 제약
- 예상하기 어려운 부수효과와 실패·원자성 경계
- 안전성이나 성능을 위해 유지해야 하는 조건

주석은 동작을 한 줄씩 재진술하거나 과거 구현 과정을 보관하는 장소가 아닙니다. 코드 변경으로 전제가 사라지면 같은 변경에서 수정하거나 삭제합니다.

## 생성 API 문서와의 경계

공개 API 레퍼런스는 소스 TSDoc에서 파생되며 생성 Markdown은 작성 대상이 아닙니다. 생성 대상, 입력, 명령과 diff 검토는 [API 문서 생성](./generating-api-docs.md)이 소유합니다.

현재 API report, 누락된 release tag 경고와 public 전용 declaration은 검증 게이트로 사용하지 않습니다. 문서 생성 성공이 공개 API 승인이나 TSDoc 완전성을 자동으로 보장하지 않으므로 생성 결과의 설명과 diff를 수동으로 검토합니다.

생성 파이프라인 유무와 관계없이 공개 계약 설명의 기준은 소스 TSDoc입니다.

## 완료 확인

- 공개 여부를 실제 package 진입점에서 확인했는가?
- 요약이 구현이 아니라 소비자 계약을 설명하는가?
- 선택한 태그가 타입에서 알 수 없는 정보를 추가하는가?
- 내부 주석이 이유와 제약을 남기고 동작을 반복하지 않는가?
- 생성 대상 라이브러리라면 API 문서를 재생성하고 diff를 검토했는가?
