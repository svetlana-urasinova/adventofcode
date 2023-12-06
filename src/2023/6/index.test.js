import { part1, part2 } from './index.js';
import { input } from './input-example.js';

describe('2023-6', () => {
  test('part 1: should calculate the product of numbers of the ways to beat the record', () => {
    expect(part1(input)).toBe(288);
  });

  test('part 2: should calculate the number of the ways to beat the record in a long race', () => {
    expect(part2(input)).toBe(71503);
  });
});
