import { part1, part2, getInputData } from './index.js';
import { input } from './input-example.js';

describe('2023-3', () => {
  const data = getInputData(input);

  test('part 1: should calculate the sum of all of the part numbers in the engine schematic', () => {
    expect(part1(data)).toBe(4361);
  });

  test('part 2: should calculate the sum of all of the gear ratios in the engine schematic', () => {
    expect(part2(data)).toBe(467835);
  });
});
