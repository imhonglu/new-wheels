<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@imhonglu/json-schema-typed](./json-schema-typed.md) &gt; [SchemaInstanceTypeMap](./json-schema-typed.schemainstancetypemap.md) &gt; [object](./json-schema-typed.schemainstancetypemap.object.md)

## SchemaInstanceTypeMap.object property

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
    } : Exclude<K, U> extends never ? {
        [P in U]: SchemaInstanceType<T["properties"][P]>;
    } : // When there are both required and optional properties
    {
        [P in U]: SchemaInstanceType<T["properties"][P]>;
    } & {
        [P in Exclude<K, U>]?: SchemaInstanceType<T["properties"][P]>;
    } : {
        [P in K]?: SchemaInstanceType<T["properties"][P]>;
    } : Record<string, unknown>;
```
