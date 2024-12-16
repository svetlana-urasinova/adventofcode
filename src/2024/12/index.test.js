import { part1, part2 } from './index.js';
import { input } from './input-example.js';
import { input as input2 } from './input-example2.js';
import { input as input3 } from './input-example3.js';
import { input as input4 } from './input-example4.js';
import { input as input5 } from './input-example5.js';

describe('2024-12', () => {
  test('part 1: should calculate the total price of fencing all regions', () => {
    expect(part1(input)).toBe(140);
    expect(part1(input2)).toBe(772);
    expect(part1(input3)).toBe(1930);
  });

  test('part 2: should calculate the total price of fencing all regions with a bulk discount', () => {
    expect(part2(input)).toBe(80);
    expect(part2(input2)).toBe(436);
    expect(part2(input3)).toBe(1206);
    expect(part2(input4)).toBe(236);
    expect(part2(input5)).toBe(368);
  });
});
