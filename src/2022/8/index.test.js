import { part1, part2, getInputData } from './index.js';
import { input } from './input-example.js';

describe('2022-8', () => {
  const data = getInputData(input);

  test("part 1: should count trees that are visible outside the grid", () => {
    expect(part1(data)).toBe(21);
  });

  test("part 2: should count scenic score", () => {
    expect(part2(data)).toBe(8);
  });
})