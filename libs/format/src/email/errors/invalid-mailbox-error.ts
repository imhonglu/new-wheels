export class InvalidMailboxError extends Error {
	constructor(text: string, options?: ErrorOptions) {
		super(
			`Invalid Mailbox: expected 'Mailbox', but received '${text}'`,
			options,
		);
	}
}
