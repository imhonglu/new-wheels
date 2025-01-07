import { expect, test } from "vitest";
import { prepare } from "./prepare.js";

test(prepare.name, async () => {
	const prepared = await prepare();

	expect(prepared).toMatchObject({
		alias: {
			latest: "draft2020-12",
		},
		vocabulary: {
			draft4: expect.toBeArray(),
			draft6: expect.toBeArray(),
			draft7: expect.toBeArray(),
			"draft2019-09": expect.toBeArray(),
			"draft2020-12": expect.toBeArray(),
			latest: expect.toBeArray(),
		},
	});
});
