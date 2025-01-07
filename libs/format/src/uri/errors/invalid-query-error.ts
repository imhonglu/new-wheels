export class InvalidQueryError extends Error {
	constructor(text: string, options?: ErrorOptions) {
		super(
			`Invalid Query: expected valid query, but received '${text}'`,
			options,
		);
	}
}
