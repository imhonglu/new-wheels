<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@imhonglu/type-object](./type-object.md) &gt; [fromEntries](./type-object.fromentries.md)

## fromEntries() function

Type-safe wrapper around `Object.fromEntries()` that enhances TypeScript's type inference.

**Signature:**

```typescript
export declare function fromEntries<const T extends [unknown, unknown][]>(source: T): ObjectFromEntries<T>;
```

## Parameters

<table><thead><tr><th>

Parameter


</th><th>

Type


</th><th>

Description


</th></tr></thead>
<tbody><tr><td>

source


</td><td>

T


</td><td>


</td></tr>
</tbody></table>
**Returns:**

[ObjectFromEntries](./type-object.objectfromentries.md)<!-- -->&lt;T&gt;

Strongly-typed object created from entries

## Example


```ts
const entries = [["name", "John"], ["age", 30]] as const;
const obj = fromEntries(entries); // { name: string; age: number }

// With explicit typing
interface User {
  name: string;
  age: number;
}
const typedObj = fromEntries<keyof User, User[keyof User]>(entries);
```

