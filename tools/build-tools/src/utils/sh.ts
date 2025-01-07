import { type ExecException, exec } from "node:child_process";
import { promisify } from "node:util";
import { createSafeExecutor } from "@imhonglu/toolkit";

const execute = promisify(exec);

export function isExecException(err: unknown): err is ExecException {
	return (
		err instanceof Error &&
		"code" in err &&
		"stdout" in err &&
		"stderr" in err &&
		"cmd" in err
	);
}

export async function sh(...args: string[]) {
	const command = args.join(" ");

	const result = await execute(command);

	return result.stdout;
}

export const safeSh = createSafeExecutor<typeof sh, ExecException>(sh);
