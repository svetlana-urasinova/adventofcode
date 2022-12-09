import { part1, part2 } from './index.js';
import { input } from './input-example.js';

describe('2022-9', () => {
  test("part 1: should count visited positions for a 2 knots long rope", () => {
    expect(part1(input)).toBe(13);
  });

  test("part 2: should count visited positions for a 10 knots long rope", () => {
    expect(part2(input)).toBe(1);
  });
})