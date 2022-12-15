import { part1, part2, getInputData } from './index.js';
import { input } from './input-example.js';

describe('2022-14', () => {
  const data = getInputData(input);

  test("part 1: should count sand above abyss", () => {
    expect(part1(data)).toBe(24);
  });

  test("part 2: should count sand on the floor", () => {
    expect(part2(data)).toBe(93);
  });
})