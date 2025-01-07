export class InvalidFullDateError extends Error {
	constructor(text: string, options?: ErrorOptions) {
		super(
			`Invalid FullDate: expected 'yyyy-MM-dd', but received '${text}'`,
			options,
		);
	}
}
