import { part1, part2, getInputData } from './index.js';
import { input } from './input-example.js';

describe('2022-10', () => {
  const data = getInputData(input);

  test("part 1: should count total syntax error score", () => {
    expect(part1(data)).toBe(26397);
  });

  test("part 2: should count the middle score", () => {
    expect(part2(data)).toBe(288957);
  });
})