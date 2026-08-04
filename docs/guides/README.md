# 개발 가이드

이 디렉터리는 개발자가 변경을 안전하게 완료하는 데 필요한 공통 원칙, 작성·검증 기준과 반복 절차를 설명합니다. 각 문서는 적용 범위와 필요한 검증 또는 완료 조건을 명시합니다.

## 공통 원칙

- [개발 작업 원칙](./development-principles.md): 범위 설정부터 완료 확인까지의 공통 판단과 실행 기준
- [문서 작성 원칙](./documentation-principles.md): 독자, 근거, 단일 소유와 문서 생명주기

## 변경 절차

- [의존성 관리](./managing-dependencies.md): 외부·workspace 의존성의 선언, 갱신과 검증
- [공개 API 변경](./changing-a-public-api.md): 영향 조사부터 changeset까지의 절차
- [API 문서 생성](./generating-api-docs.md): TSDoc 기반 레퍼런스 생성과 문제 해결
- [Changesets 관리](./managing-changesets.md): 버전 영향 기록과 검증

## 작성과 검증 기준

- [CLI 도구 작성](./writing-cli-tools.md): TypeScript CLI의 빌드·실행 경계와 테스트
- [TypeScript 문서화](./documenting-typescript.md): 공개 TSDoc과 내부 주석의 기준
- [Markdown 작성](./writing-markdown.md): workspace README 언어 쌍, 메타데이터, 링크와 검증
- [테스트와 검증](./testing-and-validation.md): 로컬 검사, Git hook, CI 피드백

## 문서 규격

개별 Guide는 [문서 작성 원칙](./documentation-principles.md)과 [Markdown 작성](./writing-markdown.md)의 공통 규칙을 바탕으로 다음 최소 규격을 적용합니다.

- 분류 인덱스인 `README.md`를 제외한 파일명은 소문자 영문과 숫자의 kebab-case를 사용하고 `guide` 같은 디렉터리명 중복 표현은 생략합니다. 원칙은 `<topic>-principles.md`, 특정 작업은 검색할 행위와 대상을 드러내는 이름을 우선합니다.
- 본문에는 문서의 책임을 드러내는 `# 제목` 형식의 H1을 정확히 하나 두고, 분류 인덱스를 제외한 개별 문서에는 현재 문서 메타데이터를 둡니다.
- 도입부에서 적용 범위와 이 문서가 소유하는 질문을 설명하고, 인접 책임은 기준 문서로 연결합니다.
- 원칙 문서는 판단 기준과 적용 확인, 절차 문서는 실행 순서와 완료 조건, 작성·검증 기준은 적용 대상과 확인 방법을 설명합니다. 문서 유형이 다른데도 같은 절 제목을 기계적으로 강제하지 않습니다.
- 실행 사실은 근거 파일과 대조하고 다른 문서가 소유한 명령이나 정책은 필요한 맥락만 요약한 뒤 연결합니다.

권한이나 외부 서비스 상태를 변경하는 절차는 [운영 절차](../operations/README.md)에서 찾습니다.
