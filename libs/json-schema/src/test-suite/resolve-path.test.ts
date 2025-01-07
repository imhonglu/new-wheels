import { expect, test } from "vitest";
import { resolvePath } from "./resolve-path.js";

test(resolvePath.name, () => {
	expect(resolvePath("root")).toEndWith("/libs/json-schema/src/test-suite");

	expect(resolvePath("root/repository")).toEndWith(
		"/libs/json-schema/src/test-suite/JSON-Schema-Test-Suite",
	);

	expect(resolvePath("root/generated")).toEndWith(
		"/libs/json-schema/src/test-suite/generated",
	);

	expect(resolvePath("root/repository/tests")).toEndWith(
		"/libs/json-schema/src/test-suite/JSON-Schema-Test-Suite/tests",
	);
});
