import { part1, part2, getInputData } from './index.js';
import { input } from './input-example.js';

describe('2024-2', () => {
  const data = getInputData(input);

  test('part 1: number of safe reports', () => {
    expect(part1(data)).toBe(2);
  });

  test('part 2: %TEST_NAME%', () => {
    // expect(part2(data)).toBe();
  });
});
