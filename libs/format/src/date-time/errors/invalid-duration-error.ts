export class InvalidDurationError extends Error {
	constructor(text: string, options?: ErrorOptions) {
		super(
			`Invalid Duration: expected 'P--Y--M--DT--H--M--S', but received '${text}'`,
			options,
		);
	}
}
