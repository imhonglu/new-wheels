# @imhonglu/format

[English](./README.md) | [한국어](./README_KR.md)

## Introduction

- A strongly-typed string formatting library that complies with RFC standards
- Provides an interface similar to the native [JSON API](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON)
- All Formatters consistently provide `parse`, `stringify`, and `safeParse` methods
- Parsed objects are automatically serialized to strings when using JSON.stringify()

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Reference](#api-reference)

## Installation

```bash
npm install @imhonglu/format
```

## Usage

For detailed examples, please refer to the [API Reference](#api-reference).

```ts
import { FullTime } from '@imhonglu/format';
// Parse time string
const time = FullTime.parse('00:00:00.000Z');
// { hour: 0, minute: 0, second: 0, secfrac: '.000', offset: undefined }

// Using parsed results
console.log(time.hour); // 0
console.log(time.toString()); // '00:00:00.000Z'
console.log(JSON.stringify(time)); // '"00:00:00.000Z"'

// Safe parsing with validation
const result = FullTime.safeParse('invalid');
if (result.ok) {
  console.log(result.data);
  // result.data returns parsed FullTime instance
} else {
  console.error(result.error);
  // result.error returns InvalidFullTimeError with error information
}
```

## API Reference

### Date Time Formatter(RFC 3339)

- [DateTime](./docs/format.datetime.md) - Date and time based on RFC 3339
- [FullDate](./docs/format.fulldate.md) - Date based on RFC 3339
- [FullTime](./docs/format.fulltime.md) - Time based on RFC 3339
- [Duration](./docs/format.duration.md) - Duration based on RFC 3339

### IP Address Formatter(RFC 2673, RFC 4291, RFC 5954)

- [IPv4Address](./docs/format.ipv4address.md) - IPv4 address based on RFC 2673, RFC 5954
- [IPv6Address](./docs/format.ipv6address.md) - IPv6 address based on RFC 4291, RFC 5954

### Hostname Formatter(RFC 1034, RFC 5890)

- [Hostname](./docs/format.hostname.md) - Hostname based on RFC 1034
- [IdnHostname](./docs/format.idnhostname.md) - Hostname(IDN) based on RFC 1034, RFC 5890

### Email Formatter(RFC 5321, RFC 5322)

- [Mailbox](./docs/format.mailbox.md) - Mailbox based on RFC 5321
- [IdnMailbox](./docs/format.idnmailbox.md) - Mailbox(IDN) based on RFC 5321
- [AddressLiteral](./docs/format.addressliteral.md) - Address literal based on RFC 5321
- [LocalPart](./docs/format.localpart.md) - Local part based on RFC 5321, RFC 5322

### URI Formatter(RFC 3986, RFC 3987)

APIs that support IRI commonly provide the `{ isIri: boolean }` option.

- [URI](./docs/format.uri.md) - URI / IRI based on RFC 3986, RFC 3987
- [URIReference](./docs/format.urireference.md) - URI Reference / IRI Reference based on RFC 3986, RFC 3987
- [Authority](./docs/format.authority.md) - Authority / IRI Authority based on RFC 3986, RFC 3987
- [Path](./docs/format.path.md) - Path / IRI Path based on RFC 3986, RFC 3987
- [Query](./docs/format.query.md) - Query / IRI Query based on RFC 3986, RFC 3987
- [Fragment](./docs/format.fragment.md) - Fragment / IRI Fragment based on RFC 3986, RFC 3987
- [Scheme](./docs/format.scheme.md) - Scheme based on RFC 3986
- [IPvFuture](./docs/format.ipvfuture.md) - IPvFuture based on RFC 3986

### URI Template Formatter(RFC 6570)

- [URITemplate](./docs/format.uritemplate.md) - URI template based on RFC 6570

### UUID Formatter(RFC 4122)

- [UUID](./docs/format.uuid.md) - UUID based on RFC 4122

### JSON Pointer Formatter(RFC 6901)

- [JsonPointer](./docs/format.jsonpointer.md) - JSON Pointer based on RFC 6901
