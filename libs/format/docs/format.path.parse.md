<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@imhonglu/format](./format.md) &gt; [Path](./format.path.md) &gt; [parse](./format.path.parse.md)

## Path.parse() method

Converts a Path string to a [Path](./format.path.md) object.

**Signature:**

```typescript
static parse(text: string, options?: URIParseOptions): Path;
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

text


</td><td>

string


</td><td>

A valid Path string. e.g. "/path/to/resource"


</td></tr>
<tr><td>

options


</td><td>

[URIParseOptions](./format.uriparseoptions.md)


</td><td>

_(Optional)_


</td></tr>
</tbody></table>
**Returns:**

[Path](./format.path.md)

## Exceptions

- [InvalidPathError](./format.invalidpatherror.md)

