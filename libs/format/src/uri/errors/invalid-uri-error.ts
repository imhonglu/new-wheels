export class InvalidURIError extends Error {
  constructor(text: string, options?: ErrorOptions) {
    super(`Invalid URI: expected valid URI, but received '${text}'`, options);
  }
}
