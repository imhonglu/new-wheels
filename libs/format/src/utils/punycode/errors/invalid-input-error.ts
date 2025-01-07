export class InvalidInputError extends RangeError {
	constructor(options?: ErrorOptions) {
		super("Invalid input", options);
	}
}
