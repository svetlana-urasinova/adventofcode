import { part1, part2, getInputData } from './index.js';
import { input } from './input-example.js';

describe('2022-11', () => {
  const data = getInputData(input);

  test("part 1: should count total flashes after 100 steps", () => {
    expect(part1(data)).toBe(1656);
  });

  test("part 2: should find the fist step during which all octopuses flash", () => {
    expect(part2(data)).toBe(195);
  });
})