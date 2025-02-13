# @imhonglu/toolkit

[English](./README.md) | [한국어](./README_KR.md)

## Introduction

A utility library containing frequently used functions and types with the following features:

- Can be used independently without unnecessary dependencies
- Provides utilities across various categories including arrays, objects, functions, and types
- Strong type inference support based on TypeScript
- All utilities come with detailed documentation and examples

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Reference](#api-reference)

## Installation

```bash
npm install @imhonglu/toolkit
```

## Usage

Let's look at the basic usage of the utility type `Fn.Callable`.

For more detailed examples, please refer to the [API Reference](#api-reference).

```ts
import type { Fn } from '@imhonglu/toolkit';

// Provides a type alias for the function type '(...args: any[]) => any'
Fn.Callable // (...args: any[]) => any

// Can define argument types only through generics
Fn.Callable<{ args: [number, number] }> // (...args: [number, number]) => any

// Can define return type only through generics
Fn.Callable<{ return: string }> // (...args: any[]) => string

// Can define both argument and return types through generics
Fn.Callable<{ args: [number, number], return: string }> // (...args: [number, number]) => string
```

## API Reference

### Array Utilities
- [combinations](./docs/toolkit.combinations.md) - Generates all possible combinations from a given array
- [chunk](./docs/toolkit.chunk.md) - Splits a large array into smaller arrays of specified size

### Object Utilities
- [clone-prototype](./docs/toolkit.cloneprototype.md) - Clones an object including its prototype chain
- [invert](./docs/toolkit.invert.md) - Swaps the keys and values of an object
- [pick](./docs/toolkit.pick.md) - Creates a new object with selected properties from an object
- [omit](./docs/toolkit.omit.md) - Creates a new object excluding specified properties from an object

### Function Utilities
- [memoize](./docs/toolkit.memoize.md) - Caches function results to prevent recalculation for identical inputs
- [get-callsites](./docs/toolkit.getcallsites.md) - Retrieves call stack information of currently executing code
- [create-safe-executor](./docs/toolkit.createsafeexecutor.md) - Creates a safe function executor with exception handling
- [is-async-function](./docs/toolkit.isasyncfunction.md) - Checks if a given function is asynchronous
- [unwrap](./docs/toolkit.unwrap.md) - Unwraps an Optional value and returns the actual value
- [unwrap-or](./docs/toolkit.unwrapor.md) - Returns a default value if the Optional value is empty

### Type Utilities
- [literal-union](./docs/toolkit.literalunion.md) - Creates a string literal union type
- [array-element](./docs/toolkit.arrayelement.md) - Extracts the element type of an array
- [fn](./docs/toolkit.fn.md) - Provides function type utilities
- [or](./docs/toolkit.or.md) - Provides union type utilities
- [primitive](./docs/toolkit.primitive.md) - Provides primitive type utilities
- [mutable](./docs/toolkit.mutable.md) - Converts readonly types to mutable types
- [nullish-value](./docs/toolkit.nullishvalue.md) - Provides Nullish type including null and undefined

### String Utilities
- [string-case](./docs/toolkit.stringcase.md) - Provides string case conversion and case style transformation functionality
