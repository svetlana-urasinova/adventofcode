import { part1, part2, getInputData } from './index.js';
import { input } from './input-example.js';

describe('2022-11', () => {

  test("part 1: should count monkey business with relief after 20 rounds", () => {
    expect(part1(input)).toBe(10605);
  });

  test("part 2: should count monkey business without relief after 10000 rounds", () => {
    expect(part2(input)).toBe(2713310158);
  });
})