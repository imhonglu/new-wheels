import { resolve } from "node:path";
import ts from "typescript";

const DEFAULT_FILE_NAME = "tsconfig.json";
const DEFAULT_OUT_DIR = "dist";

export function loadTsConfig(
  fileName = DEFAULT_FILE_NAME,
  basePath = process.cwd(),
) {
  const configPath = ts.findConfigFile(basePath, ts.sys.fileExists, fileName);

  if (!configPath) {
    console.error(
      `설정 파일을 찾을 수 없습니다: '${resolve(basePath, fileName)}'`,
    );
    process.exit(1);
  }

  const commandLine = ts.parseJsonConfigFileContent(
    ts.readConfigFile(configPath, ts.sys.readFile).config,
    ts.sys,
    basePath,
  );

  if (!commandLine.options.outDir) {
    commandLine.options.outDir = resolve(basePath, DEFAULT_OUT_DIR);
  }
  commandLine.options.configFilePath = configPath;

  return commandLine as ts.ParsedCommandLine & {
    options: ts.CompilerOptions & { outDir: string; configFilePath: string };
  };
}

loadTsConfig.DEFAULT_FILE_NAME = DEFAULT_FILE_NAME;
loadTsConfig.DEFAULT_OUT_DIR = DEFAULT_OUT_DIR;
