import { part1, part2, getInputData } from './index.js';
import { input } from './input-example.js';

describe('2022-12', () => {
  const data = getInputData(input);

  test("part 1: should find the shortest way from S to E", () => {
    expect(part1(data)).toBe(31);
  });

  test("part 2: should find the shortest way from S or a to E", () => {
    expect(part2(data)).toBe(29);
  });
})