export class ValidationFailedError extends Error {
  constructor(data: unknown, options?: ErrorOptions) {
    super(`Validation failed: ${data}`, options);
  }
}
