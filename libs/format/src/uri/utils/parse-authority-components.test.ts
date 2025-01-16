import { expect, test } from "vitest";
import { parseAuthorityComponents } from "./parse-authority-components.js";

test("parseAuthorityComponents", () => {
  expect(parseAuthorityComponents("example.com")).toMatchObject({
    host: "example.com",
  });

  expect(parseAuthorityComponents("사용자@한글.com")).toMatchObject({
    userinfo: "사용자",
    host: "한글.com",
  });

  expect(parseAuthorityComponents("example.com:8080")).toMatchObject({
    host: "example.com",
    port: 8080,
  });

  expect(parseAuthorityComponents("user@example.com:8080")).toMatchObject({
    userinfo: "user",
    host: "example.com",
    port: 8080,
  });

  expect(parseAuthorityComponents("192.168.1.1")).toMatchObject({
    host: "192.168.1.1",
    type: "ipv4-address",
  });

  expect(parseAuthorityComponents("user@192.168.1.1:8080")).toMatchObject({
    userinfo: "user",
    host: "192.168.1.1",
    port: 8080,
    type: "ipv4-address",
  });

  expect(parseAuthorityComponents("[2001:db8::1]")).toMatchObject({
    host: "[2001:db8::1]",
    type: "ipv6-address",
  });

  expect(parseAuthorityComponents("user@[2001:db8::1]:8080")).toMatchObject({
    userinfo: "user",
    host: "[2001:db8::1]",
    port: 8080,
    type: "ipv6-address",
  });

  expect(parseAuthorityComponents("[v1.text]")).toMatchObject({
    host: "[v1.text]",
    type: "ipv-future",
  });

  expect(parseAuthorityComponents("user@[v1.text]:8080")).toMatchObject({
    userinfo: "user",
    host: "[v1.text]",
    port: 8080,
    type: "ipv-future",
  });

  expect(parseAuthorityComponents("@host")).toBeUndefined();
  expect(parseAuthorityComponents("host@")).toBeUndefined();
  expect(parseAuthorityComponents(":80")).toBeUndefined();
});
