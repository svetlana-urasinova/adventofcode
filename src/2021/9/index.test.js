import { part1, part2, getInputData } from './index.js';
import { input } from './input-example.js';

describe('2022-9', () => {
  const data = getInputData(input);

  test("part 1: should find low points", () => {
    expect(part1(data)).toBe(15);
  });

  test("part 2: should find the three largest basins and multiply their sizes together", () => {
    expect(part2(data)).toBe(1134);
  });
})