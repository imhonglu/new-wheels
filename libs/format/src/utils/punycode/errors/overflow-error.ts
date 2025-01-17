export class OverflowError extends RangeError {
  constructor(options?: ErrorOptions) {
    super("input needs wider integers to process", options);
  }
}
