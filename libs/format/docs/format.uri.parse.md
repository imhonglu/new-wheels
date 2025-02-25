<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@imhonglu/format](./format.md) &gt; [URI](./format.uri.md) &gt; [parse](./format.uri.parse.md)

## URI.parse() method

Converts a URI string to a [URI](./format.uri.md) object.

**Signature:**

```typescript
static parse(text: string, options?: URIParseOptions): URI;
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

A valid URI string. e.g. "https://example.com/path?query\#fragment"


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

[URI](./format.uri.md)

## Exceptions

- [InvalidURIError](./format.invalidurierror.md) - [InvalidSchemeError](./format.invalidschemeerror.md) - [InvalidAuthorityError](./format.invalidauthorityerror.md) - [InvalidPathError](./format.invalidpatherror.md) - [InvalidQueryError](./format.invalidqueryerror.md) - [InvalidFragmentError](./format.invalidfragmenterror.md)

