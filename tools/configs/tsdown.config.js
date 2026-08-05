const sharedConfig = {
  entry: [
    "src/**/*.ts",
    "!src/**/*.test.ts",
    "!src/**/*.test-d.ts",
    "!src/run-test-groups.ts",
  ],
  unbundle: true,
  treeshake: false,
  root: "src",
  target: "es2024",
  platform: "neutral",
  hash: false,
};

/** @satisfies {import("tsdown").UserConfig} */
export const baseConfig = {
  ...sharedConfig,
  format: {
    esm: {
      dts: false,
      sourcemap: "inline",
    },
    cjs: {
      dts: false,
      sourcemap: false,
    },
  },
  outExtensions({ format }) {
    return {
      js: format === "es" ? ".js" : ".cjs",
      dts: ".d.ts",
    };
  },
  clean: true,
};

/** @satisfies {import("tsdown").UserConfig} */
export const declarationConfig = {
  ...sharedConfig,
  format: "esm",
  dts: {
    emitDtsOnly: true,
    sourcemap: true,
  },
  sourcemap: true,
  outExtensions() {
    return {
      dts: ".d.ts",
    };
  },
  clean: false,
};

export default [baseConfig, declarationConfig];
