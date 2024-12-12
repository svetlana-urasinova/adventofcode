import { part1, part2, getInputData } from './index.js';
import { input } from './input-example.js';
import { input as input2 } from './input-example2.js';
import { input as input3 } from './input-example3.js';

describe('2024-12', () => {
  test('part 1: should calculate the total price of fencing all regions', () => {
    expect(part1(getInputData(input))).toBe(140);
    expect(part1(getInputData(input2))).toBe(772);
    expect(part1(getInputData(input3))).toBe(1930);
  });

  test('part 2: %TEST_NAME%', () => {
    // expect(part2(data)).toBe();
  });
});
