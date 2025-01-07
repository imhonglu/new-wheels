export class InvalidIdnHostnameError extends Error {
	constructor(text: string, options?: ErrorOptions) {
		super(
			`Invalid Hostname: expected '127.0.0.1' or 'example.com' or '한글.com', but received '${text}'`,
			options,
		);
	}
}
