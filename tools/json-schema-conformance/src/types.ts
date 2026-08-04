export interface TestCase {
  data: unknown;
  description: string;
  valid: boolean;
}

export interface TestGroup {
  description: string;
  schema: unknown;
  tests: TestCase[];
}

export interface SuiteLock {
  repository: string;
  revision: string;
  draft: string;
  exclude: string[];
}

export interface FailureBaseline {
  revision: string;
  fixtureCount: number;
  groupCount: number;
  testCaseCount: number;
  failures: string[];
}
