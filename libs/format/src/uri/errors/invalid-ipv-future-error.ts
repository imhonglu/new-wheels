export class InvalidIPvFutureError extends Error {
  constructor(text: string, options?: ErrorOptions) {
    super(
      `Invalid IPvFuture: expected valid IPvFuture string, but received '${text}'`,
      options,
    );
  }
}
