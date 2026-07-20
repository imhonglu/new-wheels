import { digit, hexDigit } from "@imhonglu/pattern-builder";

const pattern = {
  ipv4: digit.repeat(1, 3).anchor().compile(),
  ipv6: hexDigit.repeat(1, 4).anchor().compile(),
};

export function isValidPart(type: "ipv4" | "ipv6") {
  const radix = type === "ipv4" ? 10 : 16;
  const max = 2 ** ((type === "ipv4" ? 1 : 2) * 8);

  const isInvalidFormat =
    type === "ipv4"
      ? (part: string) =>
          (part.length >= 2 && part.startsWith("0")) || !pattern.ipv4.test(part)
      : (part: string) => !pattern.ipv6.test(part);

  return (part: string) => {
    if (isInvalidFormat(part)) {
      return false;
    }

    const int = Number.parseInt(part, radix);

    if (Number.isNaN(int)) {
      return false;
    }

    return int >= 0 && int < max;
  };
}

export const isValidIPv4Part = isValidPart("ipv4");
export const isValidIPv6Part = isValidPart("ipv6");
