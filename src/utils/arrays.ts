/**
 * Splits the Set or Array into chunks of given size.
 * Default size is 1000 per chunk.
 *
 * @param Array<T>|Set<T> data
 * @param [number] chunkSize
 * @returns Array<T>
 */
export function splitInChunks<T>(
  data: T[] | Set<T>,
  chunkSize: number = 1000,
): T[][] {
  const result: T[][] = [];
  const array = data instanceof Set ? Array.from(data.values()) : data;

  for (let i = 0; i < array.length; i += chunkSize) {
    result.push(array.slice(i, i + chunkSize));
  }

  return result;
}
