export class InvalidDateTimeError extends Error {
  constructor(text: string, options?: ErrorOptions) {
    super(
      `Invalid DateTime: expected 'yyyy-MM-ddTHH:mm:ss.sssZ', but received '${text}'`,
      options,
    );
  }
}
