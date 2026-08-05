# @imhonglu/build-tools

[English](./README.md) | [한국어](./README_KR.md)

코드 생성 도구를 위한 TypeScript 컴파일러 유틸리티입니다.

## 설치

```sh
pnpm add -D @imhonglu/build-tools typescript
```

`typescript`는 peer dependency입니다. 이 패키지의 `peerDependencies`가 허용하는 버전을 설치합니다.

## 예제

TypeScript 타입 노드를 만들고 출력합니다.

```ts
import { createTypeNode, printNode } from "@imhonglu/build-tools";

const node = createTypeNode({ id: Number, name: String });

console.log(printNode(node));
```

이 패키지는 선언 생성, `tsconfig.json` 로드, 외부 프로세스 실행과 TypeScript AST 출력을 위한 도구도 제공합니다.
