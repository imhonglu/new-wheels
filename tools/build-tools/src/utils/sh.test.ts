import { expect, test } from "vitest";
import { isExecException, safeSh, sh } from "./sh.js";

test.skipIf(process.platform === "win32")(
  "sh should execute command and return stdout",
  async () => {
    const result = await sh('echo "This is a test"');
    expect(result).toBe("This is a test\n");
  },
);

test.skipIf(process.platform === "win32")(
  "sh should handle errors correctly",
  async () => {
    try {
      await sh("exit 1");
    } catch (error) {
      expect(isExecException(error)).toBe(true);
      if (isExecException(error)) {
        expect(error.code).toBe(1);
      }
    }
  },
);

test.skipIf(process.platform === "win32")(
  "safeSh should return result if no error",
  async () => {
    const result = await safeSh('echo "This is a test"');

    expect(result.ok && result.data).toBe("This is a test\n");
  },
);

test.skipIf(process.platform === "win32")(
  "safeSh should return error if error",
  async () => {
    const result = await safeSh("exit 1");

    expect(!result.ok && isExecException(result.error)).toBe(true);
    expect(!result.ok && result.error.code).toBe(1);
  },
);
