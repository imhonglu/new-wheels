/**
 * Generates all possible combinations of elements from the provided array.
 * The combinations are generated in binary counting order, starting from empty array
 * up to the full array.
 *
 * @remarks
 * - The total number of combinations will be 2^n, where n is the length of the input array
 * - The combinations are generated lazily using an iterator
 * - The order of combinations follows binary counting pattern
 *
 * @typeParam T - The type of elements in the input array
 * @param source - The input array from which to generate combinations.
 * @returns An iterator that yields arrays containing different combinations of the input elements.
 *
 * @example using spread operator
 * ```ts
 * const allCombinations = [...combinations([1, 2, 3])];
 * // [[1], [2], [1, 2], [3], [1, 3], [2, 3], [1, 2, 3]]
 * ```
 *
 * @example using for...of loop
 * ```ts
 * for (const combination of combinations([1, 2, 3])) {
 *   console.log(combination);
 *   // First iteration: [1]
 *   // Second iteration: [2]
 *   // Third iteration: [1, 2]
 *   // Fourth iteration: [3]
 *   // Fifth iteration: [1, 3]
 *   // Sixth iteration: [2, 3]
 *   // Seventh iteration: [1, 2, 3]
 * }
 * ```
 */
export function combinations<T>(source: T[]): IterableIterator<T[]> {
	let index = 0;

	return {
		[Symbol.iterator]() {
			return this;
		},

		next() {
			index += 1;

			if (index < 1 << source.length) {
				return {
					value: source.filter((_, j) => (1 << j) & index),
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
