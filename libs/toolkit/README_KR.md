# @imhonglu/toolkit

[English](./README.md) | [한국어](./README_KR.md)

## Introduction

자주 사용되는 유틸리티 함수와 타입들을 모아놓은 라이브러리로, 다음과 같은 특징을 가지고 있습니다:

- 불필요한 의존성 없이 독립적으로 사용 가능
- 배열, 객체, 함수, 타입 등 다양한 카테고리의 유틸리티 제공
- 타입스크립트 기반의 강력한 타입 추론 지원
- 모든 유틸리티는 상세한 문서화와 예제 제공

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Reference](#api-reference)

## Installation

```bash
npm install @imhonglu/toolkit
```

## Usage

유틸리티 타입 `Fn.Callable`의 기본적인 사용법을 살펴보겠습니다.

더 자세한 사용 예시는 [API Reference](#api-reference)를 참고해 주세요.

```ts
import type { Fn } from '@imhonglu/toolkit';

// 함수 타입 '(...args: any[]) => any' 에 대한 타입 별칭을 제공합니다.
Fn.Callable // (...args: any[]) => any

// 제네릭을 통해 인자 유형만 정의할 수 있습니다.
Fn.Callable<{ args: [number, number] }> // (...args: [number, number]) => any

// 제네릭을 통해 반환 유형만 정의할 수 있습니다.
Fn.Callable<{ return: string }> // (...args: any[]) => string

// 제네릭을 통해 인자 유형과 반환 유형을 모두 정의할 수 있습니다.
Fn.Callable<{ args: [number, number], return: string }> // (...args: [number, number]) => string
```

## API Reference

### 배열 유틸리티
- [combinations](./docs/toolkit.combinations.md) - 주어진 배열의 모든 가능한 조합을 생성합니다
- [chunk](./docs/toolkit.chunk.md) - 큰 배열을 지정된 크기의 작은 배열들로 분할합니다

### 객체 유틸리티
- [clone-prototype](./docs/toolkit.cloneprototype.md) - 객체를 복제할 때 프로토타입 체인까지 함께 복제합니다
- [invert](./docs/toolkit.invert.md) - 객체의 키와 값의 위치를 서로 바꿉니다
- [pick](./docs/toolkit.pick.md) - 객체에서 원하는 속성들만 선택하여 새로운 객체를 만듭니다
- [omit](./docs/toolkit.omit.md) - 객체에서 특정 속성들을 제외한 새로운 객체를 만듭니다

### 함수 유틸리티
- [memoize](./docs/toolkit.memoize.md) - 함수의 결과를 캐시하여 동일한 입력에 대한 재계산을 방지합니다
- [get-callsites](./docs/toolkit.getcallsites.md) - 현재 실행 중인 코드의 호출 스택 정보를 조회합니다
- [create-safe-executor](./docs/toolkit.createsafeexecutor.md) - 예외 처리가 포함된 안전한 함수 실행기를 생성합니다
- [is-async-function](./docs/toolkit.isasyncfunction.md) - 주어진 함수가 비동기 함수인지 확인합니다
- [unwrap](./docs/toolkit.unwrap.md) - Optional 값의 래핑을 해제하고 실제 값을 반환합니다
- [unwrap-or](./docs/toolkit.unwrapor.md) - Optional 값이 없을 경우 기본값을 반환합니다

### 타입 유틸리티
- [literal-union](./docs/toolkit.literalunion.md) - 문자열 리터럴 유니온 타입을 생성합니다
- [array-element](./docs/toolkit.arrayelement.md) - 배열의 요소 타입을 추출합니다
- [fn](./docs/toolkit.fn.md) - 함수 타입 관련 유틸리티를 제공합니다
- [or](./docs/toolkit.or.md) - 유니온 타입 관련 유틸리티를 제공합니다
- [primitive](./docs/toolkit.primitive.md) - 원시 타입 관련 유틸리티를 제공합니다
- [mutable](./docs/toolkit.mutable.md) - 읽기 전용 타입을 수정 가능한 타입으로 변환합니다
- [nullish-value](./docs/toolkit.nullishvalue.md) - null과 undefined를 포함하는 Nullish 타입을 제공합니다

### 문자열 유틸리티
- [string-case](./docs/toolkit.stringcase.md) - 문자열의 대소문자 변환 및 케이스 스타일 변환 기능을 제공합니다
