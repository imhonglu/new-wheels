#!/usr/bin/env node
import { access } from "node:fs/promises";
import esbuild from "esbuild";

(async () => {
  try {
    await access("dist");
  } catch {
    return;
  }

  await esbuild.build({
    entryPoints: ["dist/**/*.js"],
    format: "cjs",
    outdir: "dist",
    outExtension: {
      ".js": ".cjs",
    },
  });
})();
