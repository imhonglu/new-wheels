# 공개 API 정책

- Last verified: 2026-08-04
- Verified against: `libs/*/package.json`, `libs/*/src/index.ts`, `tools/*/package.json`, `.changeset/config.json`

이 문서는 공개 패키지에서 소비자 계약으로 취급하는 범위와 호환성에 따른 버전 수준을 정의합니다. 구체적인 변경 절차는 [공개 API 변경 가이드](../guides/changing-a-public-api.md)가 소유합니다.

## 공개 API의 범위

다음 항목은 소비자와의 계약으로 취급합니다.

- 패키지 `exports`로 접근 가능한 진입점
- `src/index.ts`에서 export하는 값과 타입
- 함수와 클래스의 시그니처 및 런타임 동작
- 공개 오류 타입
- 공개 패키지의 설치·실행 조건인 `dependencies`, `optionalDependencies`, `peerDependencies`와 `engines`
- 공개 패키지의 `bin` 명령 이름, 입력, 출력, 종료 동작
- 공유 설정 패키지가 `exports`로 노출하는 설정 경로와 내용
- README와 TSDoc에 명시한 지원 동작

`libs/*`와 `tools/*` 중 `package.json`에서 `private: true`로 선언하지 않은 배포 패키지가 이 정책의 대상입니다. 현재 공개·private 패키지 경계는 [저장소 구조](./repository-structure.md)를 따릅니다.

## 호환성 판단

- **patch**: 호환되는 버그 수정, 내부 구현 변경, 문서 보완
- **minor**: 기존 사용법을 유지하는 새 기능과 새 공개 API
- **major**: export 제거, 이름 변경, 시그니처 축소, 런타임 의미 변경, 지원 런타임이나 peer 범위 축소

`1.x` 패키지의 호환되지 않는 변경은 major로 기록합니다. 판단이 애매하면 소비자 코드가 수정 없이 빌드되고 같은 의미로 동작하는지 확인합니다.

구체적인 변경 순서와 완료 조건은 [공개 API 변경 가이드](../guides/changing-a-public-api.md)를 따릅니다.
