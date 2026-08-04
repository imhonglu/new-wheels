import { access } from "node:fs/promises";
import { join } from "node:path";
import esbuild from "esbuild";

/**
 * Converts emitted ESM JavaScript under a package's `dist` directory to
 * matching CommonJS files without replacing the ESM output.
 *
 * @returns Whether the package had a `dist` directory to convert.
 */
export async function convertEsmToCjs(
  packageDirectory = process.cwd(),
): Promise<boolean> {
  try {
    await access(join(packageDirectory, "dist"));
  } catch {
    return false;
  }

  await esbuild.build({
    absWorkingDir: packageDirectory,
    entryPoints: ["dist/**/*.js"],
    format: "cjs",
    outdir: "dist",
    outExtension: {
      ".js": ".cjs",
    },
  });

  return true;
}
