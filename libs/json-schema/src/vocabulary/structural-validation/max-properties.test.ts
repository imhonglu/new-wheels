import { expect, test } from "vitest";
import { Schema } from "../../schema.js";
import {
	TestCaseManager,
	latestTestCase,
} from "../../utils/test-case-manager.js";

test.concurrent.for(await latestTestCase.load("maxProperties"))(
	TestCaseManager.format,
	(testCase) => {
		const schema = new Schema(testCase.schema);

		expect(schema.validate(testCase.data)).toBe(testCase.expected);
	},
);
