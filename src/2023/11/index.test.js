import { part1, solution } from './index.js';
import { input } from './input-example.js';

describe('2023-11', () => {
  test('part 1: should calculate the sum of the lengths of the shortest path between every pair of galaxies', () => {
    expect(part1(input)).toBe(374);
  });

  test('part 2: should calculate the sum of the lengths of the shortest path between every pair of quickly expanding galaxies', () => {
    expect(solution(input, 10)).toBe(1030);
    expect(solution(input, 100)).toBe(8410);
  });
});
