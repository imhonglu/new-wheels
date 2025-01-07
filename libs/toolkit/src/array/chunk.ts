/**
 * Creates an iterator that yields chunks of an array with the specified size.
 *
 * @remarks
 * - The chunks are generated lazily using an iterator
 * - The order of chunks is the same as the order of elements in the source array
 *
 * @typeParam T - The type of elements in the source array
 * @param source - The source array to be chunked
 * @param size - The size of each chunk
 * @returns An iterator yielding array chunks
 *
 * @example using spread operator
 * ```ts
 * const chunks = [...chunk([1, 2, 3, 4, 5], 2)];
 * // [[1, 2], [3, 4], [5]]
 * ```
 *
 * @example using for...of loop
 * ```ts
 * for (const chunk of chunk([1, 2, 3, 4, 5], 2)) {
 *   console.log(chunk);
 *   // First iteration: [1, 2]
 *   // Second iteration: [3, 4]
 *   // Third iteration: [5]
 * }
 * ```
 */
export function chunk<T>(source: T[], size: number): IterableIterator<T[]> {
	let index = 0;

	return {
		[Symbol.iterator]() {
			return this;
		},

		next() {
			if (index < source.length) {
				return {
					// biome-ignore lint/suspicious/noAssignInExpressions: <explanation>
					value: source.slice(index, (index += size)),
					done: false,
				};
			}
			return {
				value: undefined,
				done: true,
			};
		},
	};
}
