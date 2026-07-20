# 문서 작성 가이드

- Status: Active
- Last verified: 2026-07-21
- Verified against: `package.json`, `tools/cli-tools`, `libs/*/package.json`

## 독자별 문서

- 사용자: 패키지 README와 생성 API 문서
- 기여자: `CONTRIBUTING.md`와 작업 가이드
- 유지보수자: 아키텍처 문서와 ADR
- 코딩 에이전트: `AGENTS.md`를 시작점으로 위 문서를 탐색

## TSDoc

공개 심볼에는 사용자가 계약을 이해하는 데 필요한 내용을 작성합니다.

- 한 문장으로 역할 설명
- 의미가 드러나지 않는 매개변수와 반환값
- 실패할 수 있는 경우 `@throws`
- 사용법이 직관적이지 않은 경우 `@example`
- 관련 공개 API는 `{@link symbol}`로 연결

구현을 그대로 읽어주는 설명이나 타입 시그니처의 반복은 피합니다.

## README

README는 다음 순서를 권장합니다.

1. 패키지가 해결하는 문제
2. 설치
3. 대표 사용 예제
4. API 문서 링크

영문과 한글 README는 API 이름, 코드 예제, 링크가 서로 일치해야 합니다.

## 생성 문서

`libs/*/docs`의 첫 줄에 자동 생성 안내가 있는 파일은 직접 수정하지 않습니다. 변경이 필요하면 소스 TSDoc을 수정하고 [API 문서 생성 가이드](./generating-api-docs.md)를 따릅니다.

저장소 유지보수 문서를 추가하면 가장 가까운 하위 디렉터리의 README에 링크합니다. 루트 `docs/README.md`에는 개별 문서 대신 하위 인덱스만 등록합니다. 독립된 분류가 필요한 경우에만 디렉터리를 만들고, 디렉터리를 만들었다면 진입점 `README.md`를 함께 작성합니다.

## 메타데이터

현재 상태를 설명하는 개별 Architecture, Guide, Operation, Harness 문서에는 다음 메타데이터를 둡니다. 분류 인덱스인 `README.md`에는 추가하지 않습니다.

```md
- Status: Active
- Last verified: YYYY-MM-DD
- Verified against: `관련 소스 또는 설정 경로`
```

문서 내용을 근거 파일과 다시 대조했을 때 `Last verified`를 갱신합니다. 단순한 표현 수정만으로 날짜를 바꾸지 않습니다. ADR과 Plan은 각 인덱스에 정의된 별도 상태 형식을 사용합니다.

Architecture, Guide, Operation, Harness처럼 현재 상태를 설명하는 문서가 더 이상 유효하지 않으면 관련 내용을 기준 문서에 통합하고 링크와 인덱스를 갱신한 뒤 삭제합니다. 선택의 역사적 배경을 보존해야 할 때만 ADR로 남깁니다.

## 검증

```sh
pnpm run check:docs
git diff --check
```

`check:docs`는 수동 문서와 패키지 README의 저장소 내부 상대 경로를 확인하고, 유지보수 문서의 인덱스 등록, 메타데이터, ADR과 Plan 형식을 검사합니다. Markdown 앵커와 외부 URL의 가용성, 문서 내용의 정확성은 별도로 검토합니다.
