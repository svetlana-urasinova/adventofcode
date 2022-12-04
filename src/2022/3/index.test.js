import { part1, part2, getInputData } from './index.js';
import { input } from './input-example.js';

describe('2022-3', () => {
  const data = getInputData(input);

  test("part 1: should correctly count total priority of bad items", () => {
    expect(part1(data)).toBe(157);
  });

  test("part 2: should correctly count total priority of badges", () => {
    expect(part2(data)).toBe(70);
  });
})