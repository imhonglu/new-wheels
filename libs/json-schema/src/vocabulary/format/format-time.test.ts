import { expect, test } from "vitest";
import { Schema } from "../../schema.js";
import {
	TestCaseManager,
	latestTestCase,
} from "../../utils/test-case-manager.js";

test.concurrent.for(
	await latestTestCase.load("optional/format/time", {
		skip: [
			"a valid time string with leap second, Zulu",
			"valid leap second, zero time-offset",
			"valid leap second, positive time-offset",
			"valid leap second, large positive time-offset",
			"valid leap second, negative time-offset",
			"valid leap second, large negative time-offset",
		],
	}),
)(TestCaseManager.format, (testCase) => {
	const schema = new Schema(testCase.schema);

	expect(schema.validate(testCase.data)).toBe(testCase.expected);
});
