import { part1, part2, getInputData } from './index.js';
import { input } from './input-example.js';

describe('2024-7', () => {
  const data = getInputData(input);

  test('part 1: should calculate the sum of test values for calibration equations', () => {
    expect(part1(data)).toBe(3749n);
  });

  test('part 2: should calculate the sum of test values for calibration equations', () => {
    expect(part2(data)).toBe(11387n);
  });
});
