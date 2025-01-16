import {
	DateTime,
	Duration,
	FullDate,
	FullTime,
	Hostname,
	IPv4Address,
	IPv6Address,
	IdnHostname,
	IdnMailbox,
	JsonPointer,
	Mailbox,
	URI,
	URIReference,
	URITemplate,
	UUID,
} from "@imhonglu/format";
import { createSafeExecutor } from "@imhonglu/toolkit";
import { InvalidFormatError } from "../../errors/invalid-format-error.js";
import type { Format } from "../../types/json-schema/format.js";
import { is } from "../../utils/is.js";
import { keywordHandler } from "../keyword-handler.js";

function createFormatValidator(
	format: Format["format"],
): (data: string) => boolean {
	switch (format) {
		case "date-time":
			return (data) => DateTime.safeParse(data).ok;
		case "date":
			return (data) => FullDate.safeParse(data).ok;
		case "time":
			return (data) => FullTime.safeParse(data).ok;
		case "duration":
			return (data) => Duration.safeParse(data).ok;

		case "email":
			return (data) => Mailbox.safeParse(data).ok;
		case "hostname":
			return (data) => Hostname.safeParse(data).ok;
		case "idn-email":
			return (data) => IdnMailbox.safeParse(data).ok;
		case "idn-hostname":
			return (data) => IdnHostname.safeParse(data).ok;

		case "ipv6":
			return (data) => IPv6Address.safeParse(data).ok;
		case "ipv4":
			return (data) => IPv4Address.safeParse(data).ok;

		case "iri":
			return (data) => URI.safeParse(data, { isIri: true }).ok;
		case "iri-reference":
			return (data) => URIReference.safeParse(data, { isIri: true }).ok;
		case "json-pointer":
			return (data) => JsonPointer.safeParse(data).ok;
		case "regex": {
			const safeRegexParse = createSafeExecutor(
				(string: string) => new RegExp(string),
			);

			return (data) => safeRegexParse(data).ok;
		}
		case "relative-json-pointer":
			// No plans to implement as draft specification
			return () => true;
		case "uri":
			return (data) => URI.safeParse(data).ok;
		case "uri-reference":
			return (data) => URIReference.safeParse(data).ok;
		case "uri-template":
			return (data) => URITemplate.safeParse(data).ok;
		case "uuid":
			return (data) => UUID.safeParse(data).ok;
		default: {
			if (format === undefined) {
				return () => true;
			}

			throw new InvalidFormatError(format);
		}
	}
}

keywordHandler.register("format", (schema) => {
	const validate = createFormatValidator(schema.format);

	return (data) => (is.string(data) ? validate(data) : true);
});
