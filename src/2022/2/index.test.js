import { part1, part2, getInputData } from './index.js';
import { input } from './input-example.js';

describe('2022-2', () => {
  const data = getInputData(input);

  test("part 1: should correctly count total score", () => {
    expect(part1(data)).toBe(15);
  });

  test("part 2: should correctly count total score", () => {
    expect(part2(data)).toBe(12);
  });
})