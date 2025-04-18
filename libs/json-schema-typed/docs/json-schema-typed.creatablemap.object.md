<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@imhonglu/json-schema-typed](./json-schema-typed.md) &gt; [CreatableMap](./json-schema-typed.creatablemap.md) &gt; [object](./json-schema-typed.creatablemap.object.md)

## CreatableMap.object property

**Signature:**

```typescript
object: T extends {
        properties: Record<infer K, unknown>;
    } ? T extends {
        required: Array<infer U extends K>;
    } ? [
        U
    ] extends [never] ? {
        [P in K]?: SchemaInstanceType<T["properties"][P]>;
    } : Exclude<U, keyof Properties<T, {
        hasDefault: true;
    }>> extends never ? {
        [P in U]?: SchemaInstanceType<T["properties"][P]>;
    } : Exclude<K, Exclude<U, keyof Properties<T, {
        hasDefault: true;
    }>>> extends never ? {
        [P in U]: SchemaInstanceType<T["properties"][P]>;
    } : // When there are both required and optional properties
    {
        [P in Exclude<U, keyof Properties<T, {
            hasDefault: true;
        }>>]: SchemaInstanceType<T["properties"][P]>;
    } & {
        [P in Exclude<K, Exclude<U, keyof Properties<T, {
            hasDefault: true;
        }>>>]?: SchemaInstanceType<T["properties"][P]>;
    } : {
        [P in K]?: SchemaInstanceType<T["properties"][P]>;
    } : Record<string, unknown>;
```
