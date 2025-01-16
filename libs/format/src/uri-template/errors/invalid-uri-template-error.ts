export class InvalidURITemplateError extends Error {
  constructor(string: string, options?: ErrorOptions) {
    super(`Invalid URI Template: ${string}`, options);
  }
}
