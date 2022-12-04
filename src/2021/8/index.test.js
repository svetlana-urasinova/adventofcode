import { part1, part2, getInputData } from './index.js';
import { input } from './input-example.js';

describe('2021-8', () => {
  const data = getInputData(input);

  test("part 1: should correctly count the total number of digits 1, 4, 7 and 8", () => {
    expect(part1(data)).toBe(26);
  });

  test("part 2: should correctly count the sum of all the output values", () => {
    expect(part2(data)).toBe(61229);
  });
})