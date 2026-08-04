# CLI 도구 작성

- Last verified: 2026-08-04
- Verified against: `tools/*/package.json`, `tools/*/src/bin`, `package.json`

이 가이드는 저장소의 TypeScript CLI가 개발 환경과 패키지 설치 환경에서 같은 빌드 산출물을 실행하도록 만드는 공통 작성·검증 기준입니다. 선택 배경은 [ADR 0003](../decisions/0003-run-cli-from-build-output.md)에 기록되어 있습니다.

## 소스와 실행 경계

- CLI 소스는 대상 패키지의 `src/bin/*.cli.ts`에 둡니다.
- 다른 패키지나 사용자가 호출하는 명령은 `package.json#bin`, 패키지 내부 명령은 `package.json#scripts`에서 노출합니다.
- `bin`과 스크립트는 TypeScript 소스나 별도 JavaScript wrapper가 아니라 빌드된 `dist/bin/*.cli.js`를 실행합니다.
- 빌드는 이전 `dist`와 TypeScript build info를 제거한 뒤 CLI를 다시 생성해야 합니다.
- 공개 패키지의 CLI에는 해시뱅을 포함하고 package dry-run에서 실행 파일이 배포되는지 확인합니다.

## 구현 분리

`*.cli.ts`는 다음 process 경계만 소유합니다.

- `process.argv` 파싱
- 성공 결과와 오류 출력
- `process.exitCode` 설정

파일 탐색, 변환, 검증과 외부 프로세스 실행은 별도 소스 모듈로 분리합니다. 이 모듈은 process 전역에 의존하지 않는 입력과 반환값을 사용하고, 필요한 부수 효과 경계는 [TypeScript 문서화](./documenting-typescript.md)의 내부 주석 기준에 따라 설명합니다.

## 테스트

- 동작 모듈은 정상·실패·경계 조건을 직접 단위 테스트합니다.
- CLI 테스트는 빌드된 `dist/bin`의 실행 가능성과 대표 종료 코드만 확인합니다.
- 소스 CLI를 테스트 런타임으로 직접 실행해 빌드 단계를 우회하지 않습니다.
- clean build 뒤에도 필요한 CLI가 모두 다시 생성되는지 확인합니다.

일반 build·test 명령은 [테스트와 검증](./testing-and-validation.md), 공개 CLI의 호환성과 패키징은 [공개 API 변경](./changing-a-public-api.md)을 따릅니다.
