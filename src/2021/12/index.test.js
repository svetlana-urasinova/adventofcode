import { part1, part2, getInputData } from './index.js';
import { input } from './input-example.js';
import { input as input2 } from './input-example2.js';
import { input as input3 } from './input-example3.js';

describe('2022-12', () => {
  const data = getInputData(input);
  const data2 = getInputData(input2);
  const data3 = getInputData(input3);

  test("part 1: should find paths", () => {
    expect(part1(data)).toBe(10);
    expect(part1(data2)).toBe(19);
    expect(part1(data3)).toBe(226);
  });

  test("part 2: should find paths with a single small cave visited twice", () => {
    expect(part2(data)).toBe(36);
    expect(part2(data2)).toBe(103);
    expect(part2(data3)).toBe(3509);
  });
})