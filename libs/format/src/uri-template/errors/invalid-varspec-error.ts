export class InvalidVarspecError extends Error {
  constructor(string: string, options?: ErrorOptions) {
    super(`Invalid varspec: ${string}`, options);
  }
}
