import type { SafeExecutor } from "@imhonglu/toolkit";
import { Hostname } from "../hostname/hostname.js";
import { Serializable } from "../utils/serializable/serializable.js";
import { AddressLiteral } from "./address-literal.js";
import { InvalidEmailDomainError } from "./errors/invalid-email-domain-error.js";
import type { InvalidLocalPartError } from "./errors/invalid-local-part-error.js";
import { InvalidMailboxError } from "./errors/invalid-mailbox-error.js";
import { LocalPart } from "./local-part.js";
import { hasValidMailboxLength } from "./utils/has-valid-mailbox-length.js";

/**
 * The Mailbox formatter based on RFC 5321.
 *
 * @example
 * ```ts
 * Mailbox.parse("john.doe\@example.com");
 * // {
 * //   localPart: { text: "john.doe", type: "dotString" },
 * //   domain: { labels: ["example", "com"], tld: ".com", type: "hostname" }
 * // }
 * ```
 *
 * @see {@link https://datatracker.ietf.org/doc/html/rfc5321#page-42 | RFC 5321#page-42}
 */
@Serializable
export class Mailbox {
	public readonly localPart: LocalPart;
	public readonly domain: AddressLiteral | Hostname;

	constructor({ localPart, domain }: Mailbox) {
		this.localPart = localPart;
		this.domain = domain;
	}

	public static readonly safeParse: SafeExecutor<typeof Mailbox.parse>;

	/**
	 * Converts a Mailbox string to a {@link Mailbox} object.
	 *
	 * @param text - A valid Mailbox string. e.g. "john.doe\@example.com".
	 * @throws - {@link InvalidMailboxError}
	 * @throws - {@link InvalidLocalPartError}
	 * @throws - {@link InvalidEmailDomainError}
	 */
	public static parse(text: string): Mailbox {
		if (!hasValidMailboxLength(text)) {
			throw new InvalidMailboxError(text);
		}

		const atPos = text.lastIndexOf("@");

		if (atPos === -1) {
			throw new InvalidMailboxError(text);
		}

		const localPart = LocalPart.parse(text.slice(0, atPos));
		const domainText = text.slice(atPos + 1);

		if (domainText.startsWith("[") && domainText.endsWith("]")) {
			return new Mailbox({
				localPart,
				domain: AddressLiteral.parse(domainText),
			});
		}

		const result = Hostname.safeParse(domainText);
		if (!result.ok) {
			throw new InvalidEmailDomainError(text);
		}

		return new Mailbox({
			localPart,
			domain: result.data,
		});
	}

	public static stringify({ localPart, domain }: Mailbox) {
		return `${localPart}@${domain}`;
	}
}
