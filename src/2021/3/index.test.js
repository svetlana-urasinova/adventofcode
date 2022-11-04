import { part1, part2 } from './index.js';
import { input } from './input-example.js';

describe('2021-3', () => {
  test("should count power consumption", () => {
    expect(part1(input)).toBe(198);
  });

  test("should count life support rating", () => {
    expect(part2(input)).toBe(230);
  });
})