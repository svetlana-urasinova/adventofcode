import { part1, part2, getInputData } from './index.js';
import { input } from './input-example.js';

describe('2023-5', () => {
  const data = getInputData(input);

  test('part 1: should find the lowest location number', () => {
    expect(part1(data)).toBe(35);
  });

  test('part 2: should find the lowest location number for ranges', () => {
    expect(part2(data)).toBe(46);
  });
});
