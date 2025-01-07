#!/usr/bin/env node
import esbuild from "esbuild";

(async () => {
	await esbuild.build({
		entryPoints: ["dist/**/*.js"],
		format: "cjs",
		outdir: "dist",
		outExtension: {
			".js": ".cjs",
		},
	});
})();
