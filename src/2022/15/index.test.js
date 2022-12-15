import { part1, part2, getInputData } from './index.js';
import { input } from './input-example.js';

describe('2022-15', () => {
  const data = getInputData(input);

  test("part 1: should count positions for row 20000", () => {
    expect(part1(data, 10)).toBe(26);
  });

  test("part 2: should find the only possible position for the distress beacon", () => {
    expect(part2(data, 20)).toBe(56000011);
  });
})