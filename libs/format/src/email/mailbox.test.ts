import { expect, test } from "vitest";
import { Mailbox } from "./mailbox.js";

test("should parse a valid MailboxString", () => {
  expect(Mailbox.parse("test@example.com")).toMatchObject({
    localPart: expect.objectContaining({
      text: "test",
    }),
    domain: expect.objectContaining({
      labels: ["example", "com"],
      tld: ".com",
    }),
  });

  expect(Mailbox.parse("test@example.com").toString()).toBe("test@example.com");
  expect(JSON.stringify(Mailbox.parse("test@example.com"))).toBe(
    '"test@example.com"',
  );
});

test("should correctly parse IP address domains", () => {
  expect(Mailbox.parse("test@[192.168.1.1]").toString()).toBe(
    "test@[192.168.1.1]",
  );
  expect(Mailbox.parse("test@[IPv6:2001:db8::1]").toString()).toBe(
    "test@[IPv6:2001:db8::1]",
  );
});
