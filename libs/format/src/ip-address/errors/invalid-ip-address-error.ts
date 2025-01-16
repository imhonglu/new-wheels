export class InvalidIpAddressError extends Error {
  constructor(text: string, options?: ErrorOptions) {
    super(`Invalid IpAddress: ${text}`, options);
  }
}
