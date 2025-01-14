/* This file is automatically generated. Do not edit this file. */
import { describe, expect, test } from "vitest";
import { Schema } from "../schema.js";
describe("email format", () => {
	const schema = {
		$schema: "https://json-schema.org/draft/2020-12/schema",
		format: "email",
	};
	test("all string formats ignore integers", () => {
		const instance = new Schema(schema);
		expect(instance.validate(12)).toBeTruthy();
	});
	test("all string formats ignore floats", () => {
		const instance = new Schema(schema);
		expect(instance.validate(13.7)).toBeTruthy();
	});
	test("all string formats ignore objects", () => {
		const instance = new Schema(schema);
		expect(instance.validate({})).toBeTruthy();
	});
	test("all string formats ignore arrays", () => {
		const instance = new Schema(schema);
		expect(instance.validate([])).toBeTruthy();
	});
	test("all string formats ignore booleans", () => {
		const instance = new Schema(schema);
		expect(instance.validate(false)).toBeTruthy();
	});
	test("all string formats ignore nulls", () => {
		const instance = new Schema(schema);
		expect(instance.validate(null)).toBeTruthy();
	});
	test("invalid email string is only an annotation by default", () => {
		const instance = new Schema(schema);
		expect(instance.validate("2962")).toBeTruthy();
	});
});
describe("idn-email format", () => {
	const schema = {
		$schema: "https://json-schema.org/draft/2020-12/schema",
		format: "idn-email",
	};
	test("all string formats ignore integers", () => {
		const instance = new Schema(schema);
		expect(instance.validate(12)).toBeTruthy();
	});
	test("all string formats ignore floats", () => {
		const instance = new Schema(schema);
		expect(instance.validate(13.7)).toBeTruthy();
	});
	test("all string formats ignore objects", () => {
		const instance = new Schema(schema);
		expect(instance.validate({})).toBeTruthy();
	});
	test("all string formats ignore arrays", () => {
		const instance = new Schema(schema);
		expect(instance.validate([])).toBeTruthy();
	});
	test("all string formats ignore booleans", () => {
		const instance = new Schema(schema);
		expect(instance.validate(false)).toBeTruthy();
	});
	test("all string formats ignore nulls", () => {
		const instance = new Schema(schema);
		expect(instance.validate(null)).toBeTruthy();
	});
	test("invalid idn-email string is only an annotation by default", () => {
		const instance = new Schema(schema);
		expect(instance.validate("2962")).toBeTruthy();
	});
});
describe("regex format", () => {
	const schema = {
		$schema: "https://json-schema.org/draft/2020-12/schema",
		format: "regex",
	};
	test("all string formats ignore integers", () => {
		const instance = new Schema(schema);
		expect(instance.validate(12)).toBeTruthy();
	});
	test("all string formats ignore floats", () => {
		const instance = new Schema(schema);
		expect(instance.validate(13.7)).toBeTruthy();
	});
	test("all string formats ignore objects", () => {
		const instance = new Schema(schema);
		expect(instance.validate({})).toBeTruthy();
	});
	test("all string formats ignore arrays", () => {
		const instance = new Schema(schema);
		expect(instance.validate([])).toBeTruthy();
	});
	test("all string formats ignore booleans", () => {
		const instance = new Schema(schema);
		expect(instance.validate(false)).toBeTruthy();
	});
	test("all string formats ignore nulls", () => {
		const instance = new Schema(schema);
		expect(instance.validate(null)).toBeTruthy();
	});
	test("invalid regex string is only an annotation by default", () => {
		const instance = new Schema(schema);
		expect(instance.validate("^(abc]")).toBeTruthy();
	});
});
describe("ipv4 format", () => {
	const schema = {
		$schema: "https://json-schema.org/draft/2020-12/schema",
		format: "ipv4",
	};
	test("all string formats ignore integers", () => {
		const instance = new Schema(schema);
		expect(instance.validate(12)).toBeTruthy();
	});
	test("all string formats ignore floats", () => {
		const instance = new Schema(schema);
		expect(instance.validate(13.7)).toBeTruthy();
	});
	test("all string formats ignore objects", () => {
		const instance = new Schema(schema);
		expect(instance.validate({})).toBeTruthy();
	});
	test("all string formats ignore arrays", () => {
		const instance = new Schema(schema);
		expect(instance.validate([])).toBeTruthy();
	});
	test("all string formats ignore booleans", () => {
		const instance = new Schema(schema);
		expect(instance.validate(false)).toBeTruthy();
	});
	test("all string formats ignore nulls", () => {
		const instance = new Schema(schema);
		expect(instance.validate(null)).toBeTruthy();
	});
	test("invalid ipv4 string is only an annotation by default", () => {
		const instance = new Schema(schema);
		expect(instance.validate("127.0.0.0.1")).toBeTruthy();
	});
});
describe("ipv6 format", () => {
	const schema = {
		$schema: "https://json-schema.org/draft/2020-12/schema",
		format: "ipv6",
	};
	test("all string formats ignore integers", () => {
		const instance = new Schema(schema);
		expect(instance.validate(12)).toBeTruthy();
	});
	test("all string formats ignore floats", () => {
		const instance = new Schema(schema);
		expect(instance.validate(13.7)).toBeTruthy();
	});
	test("all string formats ignore objects", () => {
		const instance = new Schema(schema);
		expect(instance.validate({})).toBeTruthy();
	});
	test("all string formats ignore arrays", () => {
		const instance = new Schema(schema);
		expect(instance.validate([])).toBeTruthy();
	});
	test("all string formats ignore booleans", () => {
		const instance = new Schema(schema);
		expect(instance.validate(false)).toBeTruthy();
	});
	test("all string formats ignore nulls", () => {
		const instance = new Schema(schema);
		expect(instance.validate(null)).toBeTruthy();
	});
	test("invalid ipv6 string is only an annotation by default", () => {
		const instance = new Schema(schema);
		expect(instance.validate("12345::")).toBeTruthy();
	});
});
describe("idn-hostname format", () => {
	const schema = {
		$schema: "https://json-schema.org/draft/2020-12/schema",
		format: "idn-hostname",
	};
	test("all string formats ignore integers", () => {
		const instance = new Schema(schema);
		expect(instance.validate(12)).toBeTruthy();
	});
	test("all string formats ignore floats", () => {
		const instance = new Schema(schema);
		expect(instance.validate(13.7)).toBeTruthy();
	});
	test("all string formats ignore objects", () => {
		const instance = new Schema(schema);
		expect(instance.validate({})).toBeTruthy();
	});
	test("all string formats ignore arrays", () => {
		const instance = new Schema(schema);
		expect(instance.validate([])).toBeTruthy();
	});
	test("all string formats ignore booleans", () => {
		const instance = new Schema(schema);
		expect(instance.validate(false)).toBeTruthy();
	});
	test("all string formats ignore nulls", () => {
		const instance = new Schema(schema);
		expect(instance.validate(null)).toBeTruthy();
	});
	test("invalid idn-hostname string is only an annotation by default", () => {
		const instance = new Schema(schema);
		expect(
			instance.validate("\u302E\uC2E4\uB840.\uD14C\uC2A4\uD2B8"),
		).toBeTruthy();
	});
});
describe("hostname format", () => {
	const schema = {
		$schema: "https://json-schema.org/draft/2020-12/schema",
		format: "hostname",
	};
	test("all string formats ignore integers", () => {
		const instance = new Schema(schema);
		expect(instance.validate(12)).toBeTruthy();
	});
	test("all string formats ignore floats", () => {
		const instance = new Schema(schema);
		expect(instance.validate(13.7)).toBeTruthy();
	});
	test("all string formats ignore objects", () => {
		const instance = new Schema(schema);
		expect(instance.validate({})).toBeTruthy();
	});
	test("all string formats ignore arrays", () => {
		const instance = new Schema(schema);
		expect(instance.validate([])).toBeTruthy();
	});
	test("all string formats ignore booleans", () => {
		const instance = new Schema(schema);
		expect(instance.validate(false)).toBeTruthy();
	});
	test("all string formats ignore nulls", () => {
		const instance = new Schema(schema);
		expect(instance.validate(null)).toBeTruthy();
	});
	test("invalid hostname string is only an annotation by default", () => {
		const instance = new Schema(schema);
		expect(instance.validate("-a-host-name-that-starts-with--")).toBeTruthy();
	});
});
describe("date format", () => {
	const schema = {
		$schema: "https://json-schema.org/draft/2020-12/schema",
		format: "date",
	};
	test("all string formats ignore integers", () => {
		const instance = new Schema(schema);
		expect(instance.validate(12)).toBeTruthy();
	});
	test("all string formats ignore floats", () => {
		const instance = new Schema(schema);
		expect(instance.validate(13.7)).toBeTruthy();
	});
	test("all string formats ignore objects", () => {
		const instance = new Schema(schema);
		expect(instance.validate({})).toBeTruthy();
	});
	test("all string formats ignore arrays", () => {
		const instance = new Schema(schema);
		expect(instance.validate([])).toBeTruthy();
	});
	test("all string formats ignore booleans", () => {
		const instance = new Schema(schema);
		expect(instance.validate(false)).toBeTruthy();
	});
	test("all string formats ignore nulls", () => {
		const instance = new Schema(schema);
		expect(instance.validate(null)).toBeTruthy();
	});
	test("invalid date string is only an annotation by default", () => {
		const instance = new Schema(schema);
		expect(instance.validate("06/19/1963")).toBeTruthy();
	});
});
describe("date-time format", () => {
	const schema = {
		$schema: "https://json-schema.org/draft/2020-12/schema",
		format: "date-time",
	};
	test("all string formats ignore integers", () => {
		const instance = new Schema(schema);
		expect(instance.validate(12)).toBeTruthy();
	});
	test("all string formats ignore floats", () => {
		const instance = new Schema(schema);
		expect(instance.validate(13.7)).toBeTruthy();
	});
	test("all string formats ignore objects", () => {
		const instance = new Schema(schema);
		expect(instance.validate({})).toBeTruthy();
	});
	test("all string formats ignore arrays", () => {
		const instance = new Schema(schema);
		expect(instance.validate([])).toBeTruthy();
	});
	test("all string formats ignore booleans", () => {
		const instance = new Schema(schema);
		expect(instance.validate(false)).toBeTruthy();
	});
	test("all string formats ignore nulls", () => {
		const instance = new Schema(schema);
		expect(instance.validate(null)).toBeTruthy();
	});
	test("invalid date-time string is only an annotation by default", () => {
		const instance = new Schema(schema);
		expect(instance.validate("1990-02-31T15:59:60.123-08:00")).toBeTruthy();
	});
});
describe("time format", () => {
	const schema = {
		$schema: "https://json-schema.org/draft/2020-12/schema",
		format: "time",
	};
	test("all string formats ignore integers", () => {
		const instance = new Schema(schema);
		expect(instance.validate(12)).toBeTruthy();
	});
	test("all string formats ignore floats", () => {
		const instance = new Schema(schema);
		expect(instance.validate(13.7)).toBeTruthy();
	});
	test("all string formats ignore objects", () => {
		const instance = new Schema(schema);
		expect(instance.validate({})).toBeTruthy();
	});
	test("all string formats ignore arrays", () => {
		const instance = new Schema(schema);
		expect(instance.validate([])).toBeTruthy();
	});
	test("all string formats ignore booleans", () => {
		const instance = new Schema(schema);
		expect(instance.validate(false)).toBeTruthy();
	});
	test("all string formats ignore nulls", () => {
		const instance = new Schema(schema);
		expect(instance.validate(null)).toBeTruthy();
	});
	test("invalid time string is only an annotation by default", () => {
		const instance = new Schema(schema);
		expect(instance.validate("08:30:06 PST")).toBeTruthy();
	});
});
describe("json-pointer format", () => {
	const schema = {
		$schema: "https://json-schema.org/draft/2020-12/schema",
		format: "json-pointer",
	};
	test("all string formats ignore integers", () => {
		const instance = new Schema(schema);
		expect(instance.validate(12)).toBeTruthy();
	});
	test("all string formats ignore floats", () => {
		const instance = new Schema(schema);
		expect(instance.validate(13.7)).toBeTruthy();
	});
	test("all string formats ignore objects", () => {
		const instance = new Schema(schema);
		expect(instance.validate({})).toBeTruthy();
	});
	test("all string formats ignore arrays", () => {
		const instance = new Schema(schema);
		expect(instance.validate([])).toBeTruthy();
	});
	test("all string formats ignore booleans", () => {
		const instance = new Schema(schema);
		expect(instance.validate(false)).toBeTruthy();
	});
	test("all string formats ignore nulls", () => {
		const instance = new Schema(schema);
		expect(instance.validate(null)).toBeTruthy();
	});
	test("invalid json-pointer string is only an annotation by default", () => {
		const instance = new Schema(schema);
		expect(instance.validate("/foo/bar~")).toBeTruthy();
	});
});
describe("relative-json-pointer format", () => {
	const schema = {
		$schema: "https://json-schema.org/draft/2020-12/schema",
		format: "relative-json-pointer",
	};
	test("all string formats ignore integers", () => {
		const instance = new Schema(schema);
		expect(instance.validate(12)).toBeTruthy();
	});
	test("all string formats ignore floats", () => {
		const instance = new Schema(schema);
		expect(instance.validate(13.7)).toBeTruthy();
	});
	test("all string formats ignore objects", () => {
		const instance = new Schema(schema);
		expect(instance.validate({})).toBeTruthy();
	});
	test("all string formats ignore arrays", () => {
		const instance = new Schema(schema);
		expect(instance.validate([])).toBeTruthy();
	});
	test("all string formats ignore booleans", () => {
		const instance = new Schema(schema);
		expect(instance.validate(false)).toBeTruthy();
	});
	test("all string formats ignore nulls", () => {
		const instance = new Schema(schema);
		expect(instance.validate(null)).toBeTruthy();
	});
	test("invalid relative-json-pointer string is only an annotation by default", () => {
		const instance = new Schema(schema);
		expect(instance.validate("/foo/bar")).toBeTruthy();
	});
});
describe("iri format", () => {
	const schema = {
		$schema: "https://json-schema.org/draft/2020-12/schema",
		format: "iri",
	};
	test("all string formats ignore integers", () => {
		const instance = new Schema(schema);
		expect(instance.validate(12)).toBeTruthy();
	});
	test("all string formats ignore floats", () => {
		const instance = new Schema(schema);
		expect(instance.validate(13.7)).toBeTruthy();
	});
	test("all string formats ignore objects", () => {
		const instance = new Schema(schema);
		expect(instance.validate({})).toBeTruthy();
	});
	test("all string formats ignore arrays", () => {
		const instance = new Schema(schema);
		expect(instance.validate([])).toBeTruthy();
	});
	test("all string formats ignore booleans", () => {
		const instance = new Schema(schema);
		expect(instance.validate(false)).toBeTruthy();
	});
	test("all string formats ignore nulls", () => {
		const instance = new Schema(schema);
		expect(instance.validate(null)).toBeTruthy();
	});
	test("invalid iri string is only an annotation by default", () => {
		const instance = new Schema(schema);
		expect(
			instance.validate("http://2001:0db8:85a3:0000:0000:8a2e:0370:7334"),
		).toBeTruthy();
	});
});
describe("iri-reference format", () => {
	const schema = {
		$schema: "https://json-schema.org/draft/2020-12/schema",
		format: "iri-reference",
	};
	test("all string formats ignore integers", () => {
		const instance = new Schema(schema);
		expect(instance.validate(12)).toBeTruthy();
	});
	test("all string formats ignore floats", () => {
		const instance = new Schema(schema);
		expect(instance.validate(13.7)).toBeTruthy();
	});
	test("all string formats ignore objects", () => {
		const instance = new Schema(schema);
		expect(instance.validate({})).toBeTruthy();
	});
	test("all string formats ignore arrays", () => {
		const instance = new Schema(schema);
		expect(instance.validate([])).toBeTruthy();
	});
	test("all string formats ignore booleans", () => {
		const instance = new Schema(schema);
		expect(instance.validate(false)).toBeTruthy();
	});
	test("all string formats ignore nulls", () => {
		const instance = new Schema(schema);
		expect(instance.validate(null)).toBeTruthy();
	});
	test("invalid iri-reference string is only an annotation by default", () => {
		const instance = new Schema(schema);
		expect(
			instance.validate("\\\\WINDOWS\\fil\u00EB\u00DF\u00E5r\u00E9"),
		).toBeTruthy();
	});
});
describe("uri format", () => {
	const schema = {
		$schema: "https://json-schema.org/draft/2020-12/schema",
		format: "uri",
	};
	test("all string formats ignore integers", () => {
		const instance = new Schema(schema);
		expect(instance.validate(12)).toBeTruthy();
	});
	test("all string formats ignore floats", () => {
		const instance = new Schema(schema);
		expect(instance.validate(13.7)).toBeTruthy();
	});
	test("all string formats ignore objects", () => {
		const instance = new Schema(schema);
		expect(instance.validate({})).toBeTruthy();
	});
	test("all string formats ignore arrays", () => {
		const instance = new Schema(schema);
		expect(instance.validate([])).toBeTruthy();
	});
	test("all string formats ignore booleans", () => {
		const instance = new Schema(schema);
		expect(instance.validate(false)).toBeTruthy();
	});
	test("all string formats ignore nulls", () => {
		const instance = new Schema(schema);
		expect(instance.validate(null)).toBeTruthy();
	});
	test("invalid uri string is only an annotation by default", () => {
		const instance = new Schema(schema);
		expect(instance.validate("//foo.bar/?baz=qux#quux")).toBeTruthy();
	});
});
describe("uri-reference format", () => {
	const schema = {
		$schema: "https://json-schema.org/draft/2020-12/schema",
		format: "uri-reference",
	};
	test("all string formats ignore integers", () => {
		const instance = new Schema(schema);
		expect(instance.validate(12)).toBeTruthy();
	});
	test("all string formats ignore floats", () => {
		const instance = new Schema(schema);
		expect(instance.validate(13.7)).toBeTruthy();
	});
	test("all string formats ignore objects", () => {
		const instance = new Schema(schema);
		expect(instance.validate({})).toBeTruthy();
	});
	test("all string formats ignore arrays", () => {
		const instance = new Schema(schema);
		expect(instance.validate([])).toBeTruthy();
	});
	test("all string formats ignore booleans", () => {
		const instance = new Schema(schema);
		expect(instance.validate(false)).toBeTruthy();
	});
	test("all string formats ignore nulls", () => {
		const instance = new Schema(schema);
		expect(instance.validate(null)).toBeTruthy();
	});
	test("invalid uri-reference string is only an annotation by default", () => {
		const instance = new Schema(schema);
		expect(instance.validate("\\\\WINDOWS\\fileshare")).toBeTruthy();
	});
});
describe("uri-template format", () => {
	const schema = {
		$schema: "https://json-schema.org/draft/2020-12/schema",
		format: "uri-template",
	};
	test("all string formats ignore integers", () => {
		const instance = new Schema(schema);
		expect(instance.validate(12)).toBeTruthy();
	});
	test("all string formats ignore floats", () => {
		const instance = new Schema(schema);
		expect(instance.validate(13.7)).toBeTruthy();
	});
	test("all string formats ignore objects", () => {
		const instance = new Schema(schema);
		expect(instance.validate({})).toBeTruthy();
	});
	test("all string formats ignore arrays", () => {
		const instance = new Schema(schema);
		expect(instance.validate([])).toBeTruthy();
	});
	test("all string formats ignore booleans", () => {
		const instance = new Schema(schema);
		expect(instance.validate(false)).toBeTruthy();
	});
	test("all string formats ignore nulls", () => {
		const instance = new Schema(schema);
		expect(instance.validate(null)).toBeTruthy();
	});
	test("invalid uri-template string is only an annotation by default", () => {
		const instance = new Schema(schema);
		expect(
			instance.validate("http://example.com/dictionary/{term:1}/{term"),
		).toBeTruthy();
	});
});
describe("uuid format", () => {
	const schema = {
		$schema: "https://json-schema.org/draft/2020-12/schema",
		format: "uuid",
	};
	test("all string formats ignore integers", () => {
		const instance = new Schema(schema);
		expect(instance.validate(12)).toBeTruthy();
	});
	test("all string formats ignore floats", () => {
		const instance = new Schema(schema);
		expect(instance.validate(13.7)).toBeTruthy();
	});
	test("all string formats ignore objects", () => {
		const instance = new Schema(schema);
		expect(instance.validate({})).toBeTruthy();
	});
	test("all string formats ignore arrays", () => {
		const instance = new Schema(schema);
		expect(instance.validate([])).toBeTruthy();
	});
	test("all string formats ignore booleans", () => {
		const instance = new Schema(schema);
		expect(instance.validate(false)).toBeTruthy();
	});
	test("all string formats ignore nulls", () => {
		const instance = new Schema(schema);
		expect(instance.validate(null)).toBeTruthy();
	});
	test("invalid uuid string is only an annotation by default", () => {
		const instance = new Schema(schema);
		expect(
			instance.validate("2eb8aa08-aa98-11ea-b4aa-73b441d1638"),
		).toBeTruthy();
	});
});
describe("duration format", () => {
	const schema = {
		$schema: "https://json-schema.org/draft/2020-12/schema",
		format: "duration",
	};
	test("all string formats ignore integers", () => {
		const instance = new Schema(schema);
		expect(instance.validate(12)).toBeTruthy();
	});
	test("all string formats ignore floats", () => {
		const instance = new Schema(schema);
		expect(instance.validate(13.7)).toBeTruthy();
	});
	test("all string formats ignore objects", () => {
		const instance = new Schema(schema);
		expect(instance.validate({})).toBeTruthy();
	});
	test("all string formats ignore arrays", () => {
		const instance = new Schema(schema);
		expect(instance.validate([])).toBeTruthy();
	});
	test("all string formats ignore booleans", () => {
		const instance = new Schema(schema);
		expect(instance.validate(false)).toBeTruthy();
	});
	test("all string formats ignore nulls", () => {
		const instance = new Schema(schema);
		expect(instance.validate(null)).toBeTruthy();
	});
	test("invalid duration string is only an annotation by default", () => {
		const instance = new Schema(schema);
		expect(instance.validate("PT1D")).toBeTruthy();
	});
});