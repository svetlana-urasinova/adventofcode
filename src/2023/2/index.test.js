import { part1, part2, getInputData } from './index.js';
import { input } from './input-example.js';

describe('2023-2', () => {
  const data = getInputData(input);

  test('part 1: should calculate the sum of the IDs of all possible games', () => {
    expect(part1(data)).toBe(8);
  });

  test('part 2: should calculate the sum of the power of the minimum sets of cubes', () => {
    expect(part2(data)).toBe(2286);
  });
});
