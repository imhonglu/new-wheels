import swc from "unplugin-swc";
import { defineProject } from "vitest/config";

export default defineProject({
  plugins: [
    swc.vite({
      jsc: {
        parser: {
          syntax: "typescript",
          decorators: true,
        },
        transform: {
          decoratorVersion: "2022-03",
        },
      },
    }),
  ],
  test: {
    include: ["src/**/*.test.ts"],
    typecheck: {
      enabled: true,
      include: ["src/**/*.test-d.ts"],
    },
  },
});
