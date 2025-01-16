export class InvalidLocalPartError extends Error {
  constructor(text: string, options?: ErrorOptions) {
    super(
      `Invalid LocalPart: expected 'Dot-string' or 'Quoted-string', but received '${text}'`,
      options,
    );
  }
}
