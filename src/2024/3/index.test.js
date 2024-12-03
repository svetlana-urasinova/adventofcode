import { part1, part2, getInputData } from './index.js';
import { input as input1 } from './input-example.js';
import { input as input2 } from './input-example2.js';

describe('2024-3', () => {
  test('part 1: should calculate the sum of all multiplications', () => {
    expect(part1(input1)).toBe(161);
  });

  test('part 2: should calculate the sum of only enabled multiplications', () => {
    expect(part2(input2)).toBe(48);
  });
});
