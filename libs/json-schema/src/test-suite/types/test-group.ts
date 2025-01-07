import type { OrAny } from "@imhonglu/toolkit";
import type { TestCase } from "./test-case.js";

export interface TestGroup<T = unknown> {
	description: string;
	schema: OrAny<T>;
	tests: TestCase[];
}
