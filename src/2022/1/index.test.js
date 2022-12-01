import { part1, part2, getInputData } from './index.js';
import { input } from './input-example.js';

describe('2022-1', () => {
  const data = getInputData(input);

  test("part 1: should correctly count max total calories", () => {
    expect(part1(data)).toBe(24000);
  });

  test("part 2: should correctly cound sum of top three max calories", () => {
    expect(part2(data)).toBe(45000);
  });
})