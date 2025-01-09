# @imhonglu/toolkit

[English](./README.md) | [한국어](./README_KR.md)

## Introduction

A library containing commonly used utility functions and types.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Reference](#api-reference)

## Installation

```bash
npm install @imhonglu/toolkit
```

## Usage

Let's introduce a simple example of the utility type `Fn.Callable`.

For detailed usage examples, please refer to the [API Reference](#api-reference).

```ts
import type { Fn } from '@imhonglu/toolkit';

// Provides a type alias for function type '(...args: any[]) => any'
Fn.Callable // (...args: any[]) => any

// Define argument types only through generics
Fn.Callable<{ args: [number, number] }> // (...args: [number, number]) => any

// Define return type only through generics
Fn.Callable<{ return: string }> // (...args: any[]) => string

// Define both argument and return types through generics
Fn.Callable<{ args: [number, number], return: string }> // (...args: [number, number]) => string
```

## API Reference

### Array Utilities
- [combinations](./docs/toolkit.combinations.md) - Generate all combinations of an array
- [chunk](./docs/toolkit.chunk.md) - Split array into chunks of specified size

### Object Utilities
- [clone-prototype](./docs/toolkit.cloneprototype.md) - Clone object including prototype
- [invert](./docs/toolkit.invert.md) - Invert object keys and values
- [pick](./docs/toolkit.pick.md) - Pick specified properties from object
- [omit](./docs/toolkit.omit.md) - Omit specified properties from object

### Function Utilities
- [memoize](./docs/toolkit.memoize.md) - Memoize function results
- [get-callsites](./docs/toolkit.getcallsites.md) - Get call stack information
- [create-safe-executor](./docs/toolkit.createsafeexecutor.md) - Create safe function executor
- [is-async-function](./docs/toolkit.isasyncfunction.md) - Check if function is async

### Type Utilities
- [literal-union](./docs/toolkit.literalunion.md) - Literal union type
- [array-element](./docs/toolkit.arrayelement.md) - Array element type
- [fn](./docs/toolkit.fn.md) - Function type utilities
- [or](./docs/toolkit.or.md) - Union type utilities
- [primitive](./docs/toolkit.primitive.md) - Primitive type utilities
- [mutable](./docs/toolkit.mutable.md) - Mutable type utilities
- [nullish-value](./docs/toolkit.nullishvalue.md) - Nullish type

### String Utilities
- [string-case](./docs/toolkit.stringcase.md) - String case conversion
