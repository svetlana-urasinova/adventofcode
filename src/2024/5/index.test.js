import { part1, part2, getInputData } from './index.js';
import { input } from './input-example.js';

describe('2024-5', () => {
  const data = getInputData(input);

  test('part 1: should calculate the sum of the middle page numbers from the correctly ordered updates', () => {
    expect(part1(data)).toBe(143);
  });

  test('part 2: should calculate the sum of the middle page numbers from the incorrectly ordered updates after ordering them correctly', () => {
    expect(part2(data)).toBe(123);
  });
});
