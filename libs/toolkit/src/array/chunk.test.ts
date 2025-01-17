import { faker } from "@faker-js/faker";
import { expect, test } from "vitest";
import { chunk } from "./chunk.js";

test("chunk should split array into groups of specified size", () => {
  const source = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const chunkSize = 3;

  const result = [...chunk(source, chunkSize)];

  expect(result).toEqual([[1, 2, 3], [4, 5, 6], [7, 8, 9], [10]]);

  for (const chunk of result.slice(0, -1)) {
    expect(chunk).toHaveLength(chunkSize);
  }

  expect(result[result.length - 1]).toHaveLength(
    source.length % chunkSize || chunkSize,
  );
});

test("chunk should handle random array sizes and chunk sizes correctly", () => {
  const length = faker.number.int({ min: 1, max: 1000 });
  const source = Array.from({ length }, (_, i) => i);
  const chunkSize = faker.number.int({
    min: 1,
    max: Math.max(1, source.length),
  });

  const result = [...chunk(source, chunkSize)];
  const expectedChunks = Math.ceil(source.length / chunkSize);

  expect(result).toHaveLength(expectedChunks);

  expect(result.flat()).toEqual(source);

  for (const [index, chunk] of result.entries()) {
    const isLastChunk = index === result.length - 1;
    const expectedSize = isLastChunk
      ? source.length % chunkSize || chunkSize
      : chunkSize;

    expect(chunk).toHaveLength(expectedSize);
  }
});
