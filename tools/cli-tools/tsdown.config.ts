import { baseConfig } from "@imhonglu/configs/tsdown.config.js";
import { defineConfig, mergeConfig } from "tsdown";

export default defineConfig(
  mergeConfig(baseConfig, {
    format: "esm",
    dts: false,
    sourcemap: "inline",
    platform: "node",
  }),
);
