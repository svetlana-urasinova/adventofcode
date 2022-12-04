import { part1, part2, getInputData } from './index.js';
import { input } from './input-example.js';

describe('2022-4', () => {
  const data = getInputData(input);

  test("part 1: should correctly count pairs in which one fully contains another", () => {
    expect(part1(data)).toBe(2);
  });

  test("part 2: should correctly count overlapping pairs", () => {
    expect(part2(data)).toBe(4);
  });
})