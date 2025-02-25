import { expect, test, vi } from "vitest";
import { getTestSuiteFilePaths } from "./get-test-suite-file-paths.js";

vi.mock("node:fs/promises", () => ({
  readdir: vi.fn().mockResolvedValue([
    {
      name: "test1.json",
      isFile: () => true,
      parentPath: "/test/path",
    },
    {
      name: "test2.txt",
      isFile: () => true,
      parentPath: "/test/path",
    },
    {
      name: "test3.json",
      isFile: () => false,
      parentPath: "/test/path",
    },
    {
      name: "test4.json",
      isFile: () => true,
      parentPath: "/test/path/subdir",
    },
  ]),
}));

test("should return all json files in the test suite", async () => {
  const paths = await getTestSuiteFilePaths("/test/path");

  expect(paths).toEqual([
    "/test/path/test1.json",
    "/test/path/subdir/test4.json",
  ]);
});

test("should return all json files in the test suite excluding the given files", async () => {
  const paths = await getTestSuiteFilePaths("/test/path", ["test1.json"]);

  expect(paths).toEqual(["/test/path/subdir/test4.json"]);
});
