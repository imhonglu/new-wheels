import { expect, test, vi } from "vitest";
import { sh } from "./sh.js";
import { spinner } from "./spinner.js";

test("should display the progress of a task", async () => {
  process.stdout.moveCursor = vi.fn();
  process.stdout.clearLine = vi.fn();
  process.stdout.cursorTo = vi.fn();

  const groupMock = vi
    .spyOn(console, "group")
    .mockImplementation(() => undefined);
  const infoMock = vi
    .spyOn(console, "info")
    .mockImplementation(() => undefined);

  const label = "Test Task";

  const result = await spinner(label, () =>
    sh('sleep 0.1 && echo "This is a test"'),
  );

  expect(result.trim()).toBe("This is a test");
  expect(groupMock).toHaveBeenCalledOnce();
  expect(groupMock).toHaveBeenCalledWith(label);
  expect(infoMock).toHaveBeenLastCalledWith(
    "Done",
    expect.stringMatching(/\+\d+ms/),
  );
});
