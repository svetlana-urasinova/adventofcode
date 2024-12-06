import { part1, part2, getInputData } from './index.js';
import { input } from './input-example.js';

describe('2024-6', () => {
  const data = getInputData(input);

  test('part 1: should calculate how many distinct positions the guard will visit', () => {
    expect(part1(data)).toBe(41);
  });

  test('part 2: %TEST_NAME%', () => {
    // expect(part2(data)).toBe();
  });
});
