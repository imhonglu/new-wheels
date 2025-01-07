# @imhonglu/toolkit

[English](./README.md) | [한국어](./README_KR.md)

## Introduction

프로젝트에서 자주 사용되는 유틸리티 함수와 타입들을 모아놓은 라이브러리입니다.

## Table of Contents

- [Installation](#installation)
- [API Reference](#api-reference)

## Installation

```bash
npm install @imhonglu/toolkit
```

## API Reference

### Array Utilities
- [combinations](./docs/toolkit.combinations.md) - 배열의 모든 조합을 생성
- [chunk](./docs/toolkit.chunk.md) - 배열을 지정된 크기의 청크로 분할

### Object Utilities
- [clone-prototype](./docs/toolkit.cloneprototype.md) - 프로토타입을 포함한 객체 복제
- [invert](./docs/toolkit.invert.md) - 객체의 키와 값을 반전
- [pick](./docs/toolkit.pick.md) - 객체에서 지정된 속성만 선택
- [omit](./docs/toolkit.omit.md) - 객체에서 지정된 속성을 제외

### Function Utilities
- [memoize](./docs/toolkit.memoize.md) - 함수 결과 메모이제이션
- [get-callsites](./docs/toolkit.getcallsites.md) - 호출 스택 정보 조회
- [create-safe-executor](./docs/toolkit.createsafeexecutor.md) - 안전한 함수 실행기 생성
- [is-async-function](./docs/toolkit.isasyncfunction.md) - 비동기 함수 여부 확인

### Type Utilities
- [literal-union](./docs/toolkit.literalunion.md) - 리터럴 유니온 타입
- [fn](./docs/toolkit.fn.md) - 함수 타입 유틸리티
- [or](./docs/toolkit.or.md) - 유니온 타입 유틸리티
- [primitive](./docs/toolkit.primitive.md) - 원시 타입 유틸리티
- [mutable](./docs/toolkit.mutable.md) - 변경 가능한 타입 유틸리티
- [nullish-value](./docs/toolkit.nullishvalue.md) - Nullish 타입

### String Utilities
- [string-case](./docs/toolkit.stringcase.md) - 문자열 케이스 변환
