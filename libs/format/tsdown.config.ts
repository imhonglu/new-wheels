import {
  baseConfig,
  declarationConfig,
} from "@imhonglu/configs/tsdown.config.js";
import { defineConfig, mergeConfig } from "tsdown";
import swc from "unplugin-swc";

export default defineConfig([
  mergeConfig(baseConfig, {
    plugins: [
      swc.rolldown({
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
  }),
  declarationConfig,
]);
