export class InvalidEmailDomainError extends Error {
  constructor(text: string, options?: ErrorOptions) {
    super(
      `Invalid EmailDomain: expected 'Hostname' or 'Idn-hostname' or 'IPv4' or 'IPv6', but received '${text}'`,
      options,
    );
  }
}
