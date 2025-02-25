<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@imhonglu/json-schema](./json-schema.md) &gt; [Schema](./json-schema.schema.md)

## Schema class

JSON Schema validator and parser implementation that provides type-safe validation and parsing of JSON data according to a schema definition.

**Signature:**

```typescript
export declare class Schema<T extends SchemaVariant = SchemaVariant> 
```

## Example 1

Basic usage with primitive types

```ts
const Name = new Schema({
  type: "string",
  minLength: 1,
});

const Age = new Schema({
  type: "number",
  minimum: 0,
});
```

## Example 2

Complex object schema with nested properties

```ts
const Person = new Schema({
  type: "object",
  properties: {
    name: Name,
    age: Age,
    address: {
      type: "object",
      properties: {
        street: { type: "string" },
        city: { type: "string" }
      }
    }
  },
  required: ["name", "age"]
});
```

## Example 3

Validation and parsing

```ts
// Validation
if (Person.validate(data)) {
  // data is type-safe here
}

// Safe parsing with error handling
const result = Person.safeParse(data);
if (result.success) {
  // result.data is type-safe
} else {
  console.error(result.error);
}
```

## Constructors

<table><thead><tr><th>

Constructor


</th><th>

Modifiers


</th><th>

Description


</th></tr></thead>
<tbody><tr><td>

[(constructor)(definition, parent, path)](./json-schema.schema._constructor_.md)


</td><td>


</td><td>

Constructs a new instance of the `Schema` class


</td></tr>
</tbody></table>

## Properties

<table><thead><tr><th>

Property


</th><th>

Modifiers


</th><th>

Type


</th><th>

Description


</th></tr></thead>
<tbody><tr><td>

[\[SchemaSymbol\]](./json-schema.schema._schemasymbol_.md)


</td><td>

`static`


</td><td>

symbol


</td><td>


</td></tr>
<tr><td>

[definition](./json-schema.schema.definition.md)


</td><td>

`readonly`


</td><td>

Exclude&lt;T, [Schema](./json-schema.schema.md)<!-- -->&gt;


</td><td>


</td></tr>
<tr><td>

[parent?](./json-schema.schema.parent.md)


</td><td>

`readonly`


</td><td>

[Schema](./json-schema.schema.md) \| undefined


</td><td>

_(Optional)_


</td></tr>
<tr><td>

[path](./json-schema.schema.path.md)


</td><td>

`readonly`


</td><td>

string


</td><td>


</td></tr>
<tr><td>

[refMap](./json-schema.schema.refmap.md)


</td><td>

`readonly`


</td><td>

Map&lt;string, [Schema](./json-schema.schema.md)<!-- -->&gt;


</td><td>


</td></tr>
<tr><td>

[root](./json-schema.schema.root.md)


</td><td>

`readonly`


</td><td>

[Schema](./json-schema.schema.md)<!-- -->&lt;[SchemaVariant](./json-schema.schemavariant.md)<!-- -->&gt;


</td><td>


</td></tr>
<tr><td>

[uri?](./json-schema.schema.uri.md)


</td><td>

`readonly`


</td><td>

string


</td><td>

_(Optional)_


</td></tr>
<tr><td>

[validates?](./json-schema.schema.validates.md)


</td><td>

`readonly`


</td><td>

Map&lt;keyof [ObjectSchema](./json-schema.objectschema.md)<!-- -->, [ValidationFunction](./json-schema.validationfunction.md)<!-- -->&gt;


</td><td>

_(Optional)_


</td></tr>
</tbody></table>

## Methods

<table><thead><tr><th>

Method


</th><th>

Modifiers


</th><th>

Description


</th></tr></thead>
<tbody><tr><td>

[\[Symbol.hasInstance\](obj)](./json-schema.schema._symbol.hasinstance_.md)


</td><td>

`static`


</td><td>


</td></tr>
<tr><td>

[parse(data)](./json-schema.schema.parse.md)


</td><td>


</td><td>


</td></tr>
<tr><td>

[safeParse(args)](./json-schema.schema.safeparse.md)


</td><td>


</td><td>


</td></tr>
<tr><td>

[stringify(data)](./json-schema.schema.stringify.md)


</td><td>


</td><td>


</td></tr>
<tr><td>

[validate(data, context)](./json-schema.schema.validate.md)


</td><td>


</td><td>


</td></tr>
</tbody></table>
