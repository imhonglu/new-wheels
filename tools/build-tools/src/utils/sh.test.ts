import { describe, expect, test } from "vitest";
import { isExecException, safeSh, sh } from "./sh.js";

describe("sh", () => {
	test("sh should execute command and return stdout", async () => {
		const result = await sh('echo "This is a test"');
		expect(result).toBe("This is a test\n");
	});

	test("sh should handle errors correctly", async () => {
		try {
			await sh("exit 1");
		} catch (error) {
			expect(isExecException(error)).toBe(true);
			if (isExecException(error)) {
				expect(error.code).toBe(1);
			}
		}
	});
});

describe("safeSh", () => {
	test("safeSh should return result if no error", async () => {
		const result = await safeSh('echo "This is a test"');

		expect(result.ok && result.data).toBe("This is a test\n");
	});

	test("safeSh should return error if error", async () => {
		const result = await safeSh("exit 1");

		expect(!result.ok && isExecException(result.error)).toBe(true);
		expect(!result.ok && result.error.code).toBe(1);
	});
});
