<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@imhonglu/toolkit](./toolkit.md) &gt; [Mutable](./toolkit.mutable.md)

## Mutable type

Makes all properties of type `T` mutable by removing readonly modifiers recursively. This utility type works with nested objects and arrays.

**Signature:**

```typescript
export type Mutable<T> = T extends object ? {
    -readonly [P in keyof T]: T[P] extends ReadonlyArray<infer U> ? [Mutable<U>] : Mutable<T[P]>;
} : T;
```
**References:** [Mutable](./toolkit.mutable.md)

## Example


```ts
const person = {
  name: "John",
  age: 20,
  hobbies: ["reading"] as const,
  address: {
    city: "Seoul"
  } as const
} as const;

type Person = typeof person;
// {
//   readonly name: "John";
//   readonly age: 20;
//   readonly hobbies: readonly ["reading"];
//   readonly address: { readonly city: "Seoul" };
// }

type MutablePerson = Mutable<Person>;
// {
//   name: "John";
//   age: 20;
//   hobbies: ["reading"];
//   address: { city: "Seoul" };
// }
```

