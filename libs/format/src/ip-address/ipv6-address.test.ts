import { expect, test } from "vitest";
import { InvalidIpAddressError } from "./errors/invalid-ip-address-error.js";
import { IPv6Address } from "./ipv6-address.js";

test("should parse a valid IPAddress string", () => {
  expect(
    IPv6Address.parse("2001:0db8:85a3:0000:0000:8a2e:0370:7334"),
  ).toMatchObject({
    segments: ["2001", "0db8", "85a3", "0000", "0000", "8a2e", "0370", "7334"],
  });

  expect(
    IPv6Address.parse("2001:0db8:85a3:0000:0000:8a2e:0370:7334").toString(),
  ).toBe("2001:0db8:85a3:0000:0000:8a2e:0370:7334");

  expect(
    JSON.stringify(
      IPv6Address.parse("2001:0db8:85a3:0000:0000:8a2e:0370:7334"),
    ),
  ).toBe('"2001:0db8:85a3:0000:0000:8a2e:0370:7334"');
});

test("should parse an address with no digits", () => {
  expect(IPv6Address.parse("::")).toMatchObject({
    segments: [],
  });
});

test("should parse an address with compression", () => {
  expect(IPv6Address.parse("1:d6::42")).toMatchObject({
    segments: ["1", "d6", "42"],
    compressIndex: 4,
  });
  expect(IPv6Address.parse("1:d6::42").toString()).toBe("1:d6::42");

  expect(IPv6Address.parse("::1").toString()).toBe("::1");

  expect(IPv6Address.parse("ffff::").toString()).toBe("ffff::");
});

test("should parse an address with embedded IPv4", () => {
  expect(IPv6Address.parse("::FFFF:129.144.52.38")).toMatchObject({
    segments: ["FFFF", "129.144.52.38"],
    embeddedIPv4: {
      segments: ["129", "144", "52", "38"],
    },
  });
  expect(IPv6Address.parse("1::d6:192.168.0.1")).toMatchObject({
    segments: ["1", "d6", "192.168.0.1"],
    embeddedIPv4: {
      segments: ["192", "168", "0", "1"],
    },
  });
  expect(
    IPv6Address.parse("1000:1000:1000:1000:1000:1000:255.255.255.255"),
  ).toMatchObject({
    segments: [
      "1000",
      "1000",
      "1000",
      "1000",
      "1000",
      "1000",
      "255.255.255.255",
    ],
    embeddedIPv4: {
      segments: ["255", "255", "255", "255"],
    },
  });
});

test("should throw error for invalid formats", () => {
  expect(() => IPv6Address.parse("1:::2")).toThrow(InvalidIpAddressError);
  expect(() => IPv6Address.parse("1::::2")).toThrow(InvalidIpAddressError);
  expect(() => IPv6Address.parse("1::2::3")).toThrow(InvalidIpAddressError);
  expect(() => IPv6Address.parse(":1::2:3")).toThrow(InvalidIpAddressError);
  expect(() => IPv6Address.parse("1:2::3:")).toThrow(InvalidIpAddressError);
});
