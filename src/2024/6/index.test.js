import { part1, part2, getInputData } from './index.js';
import { input } from './input-example.js';

describe('2024-6', () => {
  test('part 1: should calculate how many distinct positions the guard will visit', () => {
    expect(part1(input)).toBe(41);
  });

  test('part 2: should calculate the number of possible infinite loops', () => {
    expect(part2(input)).toBe(6);
  });
});
