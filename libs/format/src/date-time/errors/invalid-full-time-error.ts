export class InvalidFullTimeError extends Error {
	constructor(text: string, options?: ErrorOptions) {
		super(
			`Invalid FullTime: expected 'HH:mm:ss.SSSXXX', but received '${text}'`,
			options,
		);
	}
}
