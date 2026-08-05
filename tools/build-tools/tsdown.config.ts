import {
  baseConfig,
  declarationConfig,
} from "@imhonglu/configs/tsdown.config.js";
import { defineConfig, mergeConfig } from "tsdown";

export default defineConfig(
  [baseConfig, declarationConfig].map((config) =>
    mergeConfig(config, {
      platform: "node",
    }),
  ),
);
