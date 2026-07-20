# 개발 가이드

이 디렉터리는 개발자가 특정 변경을 안전하게 완료하기 위한 단계별 절차를 설명합니다. 각 가이드는 필요한 경우 실행 명령을 포함하고, 항상 완료 조건을 설명해야 합니다.

## 문서

- [개발 작업 원칙](./development-workflow.md): 범위 설정부터 완료 확인까지의 공통 기준
- [공개 API 변경](./changing-a-public-api.md): 영향 조사부터 changeset까지의 절차
- [문서 작성](./writing-documentation.md): README, TSDoc, 생성 문서의 책임
- [API 문서 생성](./generating-api-docs.md): TSDoc 기반 레퍼런스 생성과 문제 해결
- [Changesets 관리](./managing-changesets.md): 버전 영향 기록과 검증
- [테스트와 검증](./testing-and-validation.md): 로컬 검사, Git hook, CI 피드백

## 문서 추가 기준

- 저장소에서 반복되는 개발 작업
- 순서가 중요하거나 누락하기 쉬운 작업
- 여러 도구 또는 문서를 함께 갱신해야 하는 작업

권한이나 외부 서비스가 관련되고 실패 시 재시도 또는 복구가 필요한 절차는 [운영 절차](../operations/README.md)에 둡니다.
