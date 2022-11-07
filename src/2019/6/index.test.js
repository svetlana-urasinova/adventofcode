import { getInputData, part1, part2 } from './index.js';
import { input as inputPart1 } from './input-example.js';
import { input as inputPart2 } from './input-example2.js';

describe('2019-6', () => {
  test("part 1: should correctly count amount of orbits", () => {
    const data = getInputData(inputPart1);
    expect(part1(data)).toBe(42);
  });

  test("part 2: should correctly count path length", () => {
    const data = getInputData(inputPart2);
    expect(part2(data)).toBe(4);
  });
})