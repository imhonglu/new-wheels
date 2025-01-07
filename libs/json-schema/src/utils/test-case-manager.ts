import { memoize } from "@imhonglu/toolkit";
import {
	type TestCase,
	type TestGroup,
	type Vocabulary,
	testSuite,
} from "../test-suite/index.js";

export class TestCaseManager<T extends keyof Vocabulary = keyof Vocabulary> {
	constructor(public readonly version: T) {}

	load = memoize(
		async <K extends Vocabulary[T]>(
			keyword: K,
			options?: { skip?: string[] },
		) => {
			const testGroups = await testSuite.read(this.version, keyword);

			return testGroups.flatMap((testGroup) =>
				testGroup.tests.reduce(
					(acc, test) => {
						if (options?.skip?.includes(test.description)) {
							return acc;
						}

						acc.push({
							name: test.description,
							schema: testGroup.schema,
							data: test.data,
							expected: test.valid,
						});

						return acc;
					},
					[] as {
						name: string;
						schema: TestGroup["schema"];
						data: TestCase["data"];
						expected: boolean;
					}[],
				),
			);
		},
	);

	static format = "$name";
}

export const latestTestCase = new TestCaseManager("latest");
