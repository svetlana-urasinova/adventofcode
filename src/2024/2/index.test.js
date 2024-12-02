import { part1, part2, getInputData } from './index.js';
import { input } from './input-example.js';

describe('2024-2', () => {
  const data = getInputData(input);

  test('part 1: should calculate number of safe reports', () => {
    expect(part1(data)).toBe(2);
  });

  test('part 2: should calculate number of safe reports with using the Problem Dampener', () => {
    expect(part2(data)).toBe(4);
  });
});
