import { part1, part2, getInputData } from './index.js';
import { input } from './input-example.js';

describe('2024-11', () => {
  const data = getInputData(input);

  test('part 1: should calculate how many stones there will be after blinking 25 times', () => {
    expect(part1(data)).toBe(55312);
  });

  test('part 2: %TEST_NAME%', () => {
    // expect(part2(data)).toBe();
  });
});
