import { type ViteUserConfig, defineConfig } from "vitest/config";

export const DEFAULT_VITEST_CONFIG: ViteUserConfig = {
	test: {
		setupFiles: ["node_modules/@imhonglu/configs/dist/setup.js"],
	},
};

export const vitestConfig: ViteUserConfig = defineConfig(DEFAULT_VITEST_CONFIG);
