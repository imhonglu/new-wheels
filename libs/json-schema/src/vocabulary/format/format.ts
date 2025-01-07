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
	Mailbox,
	URI,
	URIReference,
	URITemplate,
} from "@imhonglu/format";
import { createSafeExecutor } from "@imhonglu/toolkit";
import type { Format } from "../../types/json-schema/format.js";
import { is } from "../../utils/is.js";
import { keywordHandler } from "../keyword-handler.js";

function isFormat(format: Format["format"]): (data: string) => boolean {
	switch (format) {
		case "date-time":
			return (data) => is.string(data) && DateTime.safeParse(data).ok;
		case "date":
			return (data) => is.string(data) && FullDate.safeParse(data).ok;
		case "time":
			return (data) => is.string(data) && FullTime.safeParse(data).ok;
		case "duration":
			return (data) => is.string(data) && Duration.safeParse(data).ok;

		case "email":
			return (data) => is.string(data) && Mailbox.safeParse(data).ok;
		case "hostname":
			return (data) => is.string(data) && Hostname.safeParse(data).ok;
		case "idn-email":
			return (data) => is.string(data) && IdnMailbox.safeParse(data).ok;
		case "idn-hostname":
			return (data) => is.string(data) && IdnHostname.safeParse(data).ok;

		case "ipv6":
			return (data) => is.string(data) && IPv6Address.safeParse(data).ok;
		case "ipv4":
			return (data) => is.string(data) && IPv4Address.safeParse(data).ok;

		case "iri":
			return (data) => is.string(data);
		case "iri-reference":
			return (data) => is.string(data);
		case "json-pointer":
			return (data) => is.string(data);
		case "json-pointer-uri-fragment":
			return (data) => is.string(data);
		case "regex": {
			const safeParse = createSafeExecutor(
				(string: string) => new RegExp(string),
			);

			return (data) => is.string(data) && safeParse(data).ok;
		}
		case "relative-json-pointer":
			return (data) => is.string(data);
		case "uri":
			return (data) => is.string(data) && URI.safeParse(data).ok;
		case "uri-reference":
			return (data) => is.string(data) && URIReference.safeParse(data).ok;
		case "uri-template":
			return (data) => is.string(data) && URITemplate.safeParse(data).ok;
		case "uuid":
			return (data) => is.string(data);
		default:
			return (data) => is.string(data);
	}
}

keywordHandler.register("format", (schema) => {
	const validate = isFormat(schema.format);

	return (data) => (is.string(data) ? validate(data) : true);
});
