import { expect, test } from "vitest";
import { AddressLiteral } from "./address-literal.js";

test("should parse a valid AddressLiteral string", () => {
  expect(
    AddressLiteral.parse("[IPv6:1234:5678:90AB:FFFF:1234:5678:90AB:FFFF]"),
  ).toMatchObject({
    address: {
      segments: [
        "1234",
        "5678",
        "90AB",
        "FFFF",
        "1234",
        "5678",
        "90AB",
        "FFFF",
      ],
    },
  });

  expect(AddressLiteral.parse("[192.168.1.1]")).toMatchObject({
    address: {
      segments: ["192", "168", "1", "1"],
    },
  });

  expect(AddressLiteral.parse("[192.168.1.1]").toString()).toBe(
    "[192.168.1.1]",
  );
});
