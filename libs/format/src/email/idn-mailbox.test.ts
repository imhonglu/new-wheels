import { expect, test } from "vitest";
import { IdnMailbox } from "./idn-mailbox.js";

test("should parse a valid IdnMailboxString", () => {
  expect(IdnMailbox.parse("test@한국.com")).toMatchObject({
    localPart: expect.objectContaining({
      unicode: "test",
      ascii: "test",
    }),

    domain: expect.objectContaining({
      unicode: expect.objectContaining({
        labels: ["한국", "com"],
        tld: ".com",
      }),
      ascii: expect.objectContaining({
        labels: ["xn--3e0b707e", "com"],
        tld: ".com",
      }),
    }),
  });

  expect(IdnMailbox.parse("test@한국.com").toString()).toBe(
    "test@xn--3e0b707e.com",
  );
  expect(JSON.stringify(IdnMailbox.parse("test@한국.com"))).toBe(
    '"test@xn--3e0b707e.com"',
  );

  expect(IdnMailbox.parse("한국@한국.com").toString()).toBe(
    "xn--3e0b707e@xn--3e0b707e.com",
  );
});

test("should correctly parse IP address domains", () => {
  expect(IdnMailbox.parse("한국@[192.168.1.1]").toString()).toBe(
    "xn--3e0b707e@[192.168.1.1]",
  );
  expect(IdnMailbox.parse("한국@[IPv6:2001:db8::1]").toString()).toBe(
    "xn--3e0b707e@[IPv6:2001:db8::1]",
  );
});
