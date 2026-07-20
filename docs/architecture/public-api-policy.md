# 공개 API 정책

- Status: Active
- Last verified: 2026-07-21
- Verified against: `libs/*/package.json`, `libs/*/src/index.ts`, `tools/*/package.json`, `.changeset/config.json`

## 공개 API의 범위

다음 항목은 소비자와의 계약으로 취급합니다.

- 패키지 `exports`로 접근 가능한 진입점
- `src/index.ts`에서 export하는 값과 타입
- 함수와 클래스의 시그니처 및 런타임 동작
- 공개 오류 타입
- 공개 패키지의 `bin` 명령 이름, 입력, 출력, 종료 동작
- 공유 설정 패키지가 `exports`로 노출하는 설정 경로와 내용
- README와 TSDoc에 명시한 지원 동작

`libs/*`, `@imhonglu/build-tools`, `@imhonglu/configs`는 공개 패키지입니다. `@imhonglu/cli-tools`는 저장소 전용 private 패키지이므로 외부 호환성 정책의 대상이 아닙니다.

## 호환성 판단

- **patch**: 호환되는 버그 수정, 내부 구현 변경, 문서 보완
- **minor**: 기존 사용법을 유지하는 새 기능과 새 공개 API
- **major**: export 제거, 이름 변경, 시그니처 축소, 런타임 의미 변경

`1.x` 패키지의 호환되지 않는 변경은 major로 기록합니다. 판단이 애매하면 소비자 코드가 수정 없이 빌드되고 같은 의미로 동작하는지 확인합니다.

구체적인 변경 순서와 완료 조건은 [공개 API 변경 가이드](../guides/changing-a-public-api.md)를 따릅니다.
