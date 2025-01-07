import type { Fn } from "../types/fn.js";

/**
 * Represents a call site in the stack trace.
 *
 * @see {@link https://github.com/DefinitelyTyped/DefinitelyTyped/blob/0cb820adf9389fbda935c850f58eb2c5e5973515/types/node/globals.d.ts#L125 | NodeJS.CallSite}
 */
export interface CallSite {
	getThis(): unknown;
	getTypeName(): string | null;
	getFunction(): Fn.Callable | undefined;
	getFunctionName(): string | null;
	getMethodName(): string | null;
	getFileName(): string | undefined;
	getLineNumber(): number | null;
	getColumnNumber(): number | null;
	getEvalOrigin(): string | undefined;
	isToplevel(): boolean;
	isEval(): boolean;
	isNative(): boolean;
	isConstructor(): boolean;
	isAsync(): boolean;
	isPromiseAll(): boolean;
	getPromiseIndex(): number | null;
	getScriptNameOrSourceURL(): string;
	getScriptHash(): string;
	getEnclosingColumnNumber(): number;
	getEnclosingLineNumber(): number;
	getPosition(): number;
	toString(): string;
}
/**
 * Get the call sites from the current stack trace.
 *
 * @param stackTraceLimit - The maximum number of call sites to return.
 * @returns An array of call sites from the current stack trace.
 */
export function getCallsites(stackTraceLimit = 10) {
	const _prepareStackTrace = Error.prepareStackTrace;
	const _stackTraceLimit = Error.stackTraceLimit;

	Error.stackTraceLimit = stackTraceLimit;
	Error.prepareStackTrace = (_, stack) => stack;

	const stack = new Error().stack as unknown as CallSite[];

	Error.prepareStackTrace = _prepareStackTrace;
	Error.stackTraceLimit = _stackTraceLimit;

	return stack.slice(1);
}
