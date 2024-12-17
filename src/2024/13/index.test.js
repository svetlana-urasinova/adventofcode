import { part1, part2, getInputData } from './index.js';
import { input } from './input-example.js';

describe('2024-13', () => {
  const data = getInputData(input);

  test('part 1: should calculate the fewest tokens you would have to spend to win all possible prizes', () => {
    expect(part1(data)).toBe(480);
  });
});
