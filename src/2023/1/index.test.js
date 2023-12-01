import { part1, part2, getInputData } from './index.js';
import { input, input2 } from './input-example.js';

describe('2023-1', () => {
  test('part 1: %TEST_NAME%', () => {
    expect(part1(getInputData(input))).toBe(142);
  });

  test('part 2: %TEST_NAME%', () => {
    expect(part2(getInputData(input2))).toBe(281);
  });
});
