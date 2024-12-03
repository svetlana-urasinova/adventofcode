import { part1, part2, getInputData } from './index.js';
import { input } from './input-example.js';

describe('2024-3', () => {
  const data = getInputData(input);

  test('part 1: should calculate the sum of all multiplications', () => {
    expect(part1(data)).toBe(161);
  });

  test('part 2: %TEST_NAME%', () => {
    // expect(part2(data)).toBe();
  });
});
