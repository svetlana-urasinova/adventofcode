import { part1, part2, getInputData } from './index.js';
import { input } from './input-example.js';

describe('2024-8', () => {
  const data = getInputData(input);

  test('part 1: should calculate how many unique locations contain the antinode', () => {
    expect(part1(data)).toBe(14);
  });

  test('part 2: %TEST_NAME%', () => {
    // expect(part2(data)).toBe();
  });
});
