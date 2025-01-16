const pattern = {
  ipv4: /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,
  ipv6: /^\[.+\]$/,
  ipvFuture: /^\[v[0-9]\..+\]$/,
};

export interface AuthorityComponents {
  userinfo?: string;
  host: string;
  port?: number;
  type: "ipv4-address" | "ipv6-address" | "ipv-future" | "reg-name";
}

export function parseAuthorityComponents(
  text: string,
): AuthorityComponents | undefined {
  const atPos = text.indexOf("@");
  const userinfo = atPos !== -1 ? text.slice(0, atPos) : undefined;

  if (atPos !== -1 && !userinfo) {
    return undefined;
  }

  let host = text.slice(atPos + 1);
  let port: number | undefined;

  const colonPos = host.lastIndexOf(":");

  if (colonPos !== -1) {
    const portString = host.slice(colonPos + 1);

    if (!portString.endsWith("]")) {
      port = Number.parseInt(portString);
      host = host.slice(0, colonPos);
    }
  }

  if (!host || (port !== undefined && !Number.isInteger(port))) {
    return undefined;
  }

  return {
    userinfo,
    host,
    port,
    type: pattern.ipv4.test(host)
      ? "ipv4-address"
      : pattern.ipvFuture.test(host)
        ? "ipv-future"
        : pattern.ipv6.test(host)
          ? "ipv6-address"
          : "reg-name",
  };
}
