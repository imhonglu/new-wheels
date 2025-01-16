export class InvalidTypeError extends Error {
  constructor(data: unknown, options?: ErrorOptions) {
    super(`Invalid type: ${data}`, options);
  }
}
