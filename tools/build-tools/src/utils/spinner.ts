import type { Fn } from "@imhonglu/toolkit";

const REFRESH_LATE = 100;
const MILLISECOND = 1;
const SECOND = 1000;
const SYMBOLS = ["\u25dc ", " \u25dd", " \u25de", "\u25df "];

function clearLines(lines: number) {
  for (let i = 0; i < lines; i++) {
    process.stdout.moveCursor(0, i === 0 ? 0 : -1);
    process.stdout.clearLine(1);
  }
  process.stdout.cursorTo(0);
}

/**
 * A spinner that logs the progress of a long-running task.
 *
 * @param label - The label to display for the task.
 * @param fn - The function to execute
 *
 * @returns The result of the function.
 *
 * @example
 * ```ts
 * await spinner("Task", async () => sh("echo 'Hello, World!'"));
 * ```
 */
export async function spinner<T extends Fn.Callable>(
  label: string,
  fn: T,
): Promise<ReturnType<T>> {
  let elapsedTime = 0;
  let interval: NodeJS.Timeout | null = null;

  const format = (elapsedTime: number) => {
    if (elapsedTime < SECOND) {
      return `+${elapsedTime}ms`;
    }

    return `+${Math.round(elapsedTime / SECOND)}s`;
  };

  const log = (...args: Parameters<typeof console.log>) => {
    clearLines(2);
    console.info(...args, format(elapsedTime));
  };

  const tick = () => {
    elapsedTime += MILLISECOND;

    if (elapsedTime % REFRESH_LATE === 0) {
      const symbolIndex = (elapsedTime / REFRESH_LATE) % SYMBOLS.length;
      log(SYMBOLS[symbolIndex], "In Progress");
    }
  };

  console.group(label);
  // NOTE: Add an offset for the first line to ensure the spinner starts on a new line
  process.stdout.write("\n");
  interval = setInterval(tick, MILLISECOND);

  try {
    const result = await fn();
    log("Done");
    return result;
  } catch (error) {
    log("Failed:", error);
    throw error;
  } finally {
    clearInterval(interval);
    console.groupEnd();
  }
}
