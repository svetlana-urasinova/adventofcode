import { part1, part2, getInputData } from './index.js';
import { input } from './input-example.js';

describe('2024-1', () => {
  const data = getInputData(input);

  test('part 1: should calculate total distance', () => {
    expect(part1(data)).toBe(11);
  });

  test('part 2: should calculate total similarity', () => {
    expect(part2(data)).toBe(10);
  });
});
