# @imhonglu/format

[English](./README.md) | [한국어](./README_KR.md)

## Introduction

- A strongly-typed string formatting library that complies with RFC standard specifications.
- Provides an interface similar to the native [JSON API](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON).
- All Formatters consistently provide `parse`, `stringify`, and `safeParse` methods.
- Parsed objects are automatically serialized to strings when using JSON.stringify().

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Reference](#api-reference)

## Installation

```bash
npm install @imhonglu/format
```

## Usage

For detailed examples, see the [API Reference](#api-reference).

```ts
import { FullTime } from '@imhonglu/format';
// Parse time string
const time = FullTime.parse('00:00:00.000Z');
// { hour: 0, minute: 0, second: 0, secfrac: '.000', offset: undefined }

// Use parsing results
console.log(time.hour); // 0
console.log(time.toString()); // '00:00:00.000Z'
console.log(JSON.stringify(time)); // '"00:00:00.000Z"'

// Safe parsing
const result = FullTime.safeParse('invalid');
if (!result.ok) {
  console.error(result.error);
}
```

## API Reference

### Date Time Formatter(RFC 3339)

- [DateTime](./docs/format.datetime.md) - Date and time based on RFC 3339
- [FullDate](./docs/format.fulldate.md) - Date based on RFC 3339
- [FullTime](./docs/format.fulltime.md) - Time based on RFC 3339
- [Duration](./docs/format.duration.md) - Duration based on RFC 3339

### IP Address Formatter(RFC 2673, RFC 4291, RFC 5954)

- [Ipv4Address](./docs/format.ipv4address.md) - IPv4 address based on RFC 2673, RFC 5954
- [Ipv6Address](./docs/format.ipv6address.md) - IPv6 address based on RFC 4291, RFC 5954

### Hostname Formatter(RFC 1034, RFC 5890)

- [Hostname](./docs/format.hostname.md) - Hostname based on RFC 1034
- [IdnHostname](./docs/format.idnhostname.md) - Hostname(IDN) based on RFC 1034, RFC 5890

### Email Formatter(RFC 5321, RFC 5322)

- [Mailbox](./docs/format.mailbox.md) - Mailbox based on RFC 5321
- [IdnMailbox](./docs/format.idnmailbox.md) - Mailbox(IDN) based on RFC 5321
- [AddressLiteral](./docs/format.addressliteral.md) - Address literal based on RFC 5321
- [LocalPart](./docs/format.localpart.md) - Local part based on RFC 5321, RFC 5322

### URI Formatter(RFC 3986)

- [Uri](./docs/format.uri.md) - URI based on RFC 3986
- [UriReference](./docs/format.urireference.md) - URI reference based on RFC 3986
- [Authority](./docs/format.authority.md) - Authority based on RFC 3986
- [Path](./docs/format.path.md) - Path based on RFC 3986
- [Query](./docs/format.query.md) - Query based on RFC 3986

### URI Template Formatter(RFC 6570)

- [UriTemplate](./docs/format.uritemplate.md) - URI template based on RFC 6570
