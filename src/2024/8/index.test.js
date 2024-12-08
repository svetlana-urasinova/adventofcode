import { part1, part2 } from './index.js';
import { input } from './input-example.js';

describe('2024-8', () => {
  test('part 1: should calculate how many unique locations contain the antinode', () => {
    expect(part1(input)).toBe(14);
  });

  test('part 2: should calculate how many unique locations contain the antinode with considering the effects of resonant harmonics', () => {
    expect(part2(input)).toBe(34);
  });
});
