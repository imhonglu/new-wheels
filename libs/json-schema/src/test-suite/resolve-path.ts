import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { GIT_OPTIONS } from "./constants.js";

const PATHNAME_MAP = {
	repository: GIT_OPTIONS.repo,
	"repository/tests": `${GIT_OPTIONS.repo}/tests`,
	generated: "generated",
};

type Subpath = keyof typeof PATHNAME_MAP;
type Pathname = "root" | `root/${Subpath}`;

const __dirname = dirname(fileURLToPath(import.meta.url));
const packageRoot = join(__dirname, "..", "..");

export function resolvePath(pathname: Pathname, ...paths: string[]) {
	const root = join(packageRoot, "src", "test-suite");

	const subpath = pathname.split("/").slice(1).join("/");

	return join(
		subpath in PATHNAME_MAP
			? join(root, PATHNAME_MAP[subpath as Subpath])
			: root,
		...paths,
	);
}
