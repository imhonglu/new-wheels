export class InvalidFragmentError extends Error {
  constructor(fragment: string, options?: ErrorOptions) {
    super(`Invalid fragment: ${fragment}`, options);
  }
}
