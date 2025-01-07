# @imhonglu/format

[English](./README.md) | [한국어](./README_KR.md)

## Introduction

- RFC 표준 사양을 준수하는 강타입 문자열 포맷팅 라이브러리입니다.
- 네이티브 [JSON API](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/JSON)와 같은 인터페이스를 제공합니다.
- 모든 Formatter는 `parse`, `stringify`, `safeParse` 메서드를 일관되게 제공합니다.
- 파싱된 객체는 JSON.stringify()를 사용할 경우 자동으로 문자열로 직렬화됩니다.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Reference](#api-reference)

## Installation

```bash
npm install @imhonglu/format
```

## Usage

자세한 용례는 [API Reference](#api-reference) 에서 확인할 수 있습니다.

```ts
import { FullTime } from '@imhonglu/format';
// 시간 문자열 파싱
const time = FullTime.parse('00:00:00.000Z');
// { hour: 0, minute: 0, second: 0, secfrac: '.000', offset: undefined }

// 파싱 결과 사용
console.log(time.hour); // 0
console.log(time.toString()); // '00:00:00.000Z'
console.log(JSON.stringify(time)); // '"00:00:00.000Z"'

// 안전한 파싱
const result = FullTime.safeParse('invalid');
if (!result.ok) {
  console.error(result.error);
}
```

## API Reference

### Date Time Formatter(RFC 3339)

- [DateTime](./docs/format.datetime.md) - RFC 3339 기반의 날짜와 시간
- [FullDate](./docs/format.fulldate.md) - RFC 3339 기반의 날짜
- [FullTime](./docs/format.fulltime.md) - RFC 3339 기반의 시간
- [Duration](./docs/format.duration.md) - RFC 3339 기반의 기간

### IP Address Formatter(RFC 2673, RFC 4291, RFC 5954)

- [Ipv4Address](./docs/format.ipv4address.md) - RFC 2673, RFC 5954 기반의 IPv4 주소
- [Ipv6Address](./docs/format.ipv6address.md) - RFC 4291, RFC 5954 기반의 IPv6 주소

### Hostname Formatter(RFC 1034, RFC 5890)

- [Hostname](./docs/format.hostname.md) - RFC 1034 기반의 호스트명
- [IdnHostname](./docs/format.idnhostname.md) - RFC 1034, RFC 5890 기반의 호스트명(IDN)

### Email Formatter(RFC 5321, RFC 5322)

- [Mailbox](./docs/format.mailbox.md) - RFC 5321 기반의 메일박스
- [IdnMailbox](./docs/format.idnmailbox.md) - RFC 5321 기반의 메일박스(IDN)
- [AddressLiteral](./docs/format.addressliteral.md) - RFC 5321 기반의 주소 리터럴
- [LocalPart](./docs/format.localpart.md) - RFC 5321, RFC 5322 기반의 로컬 파트

### URI Formatter(RFC 3986)

- [Uri](./docs/format.uri.md) - RFC 3986 기반의 URI
- [UriReference](./docs/format.urireference.md) - RFC 3986 기반의 URI 참조
- [Authority](./docs/format.authority.md) - RFC 3986 기반의 권한
- [Path](./docs/format.path.md) - RFC 3986 기반의 경로
- [Query](./docs/format.query.md) - RFC 3986 기반의 쿼리

### URI Template Formatter(RFC 6570)

- [UriTemplate](./docs/format.uritemplate.md) - RFC 6570 기반의 URI 템플릿
