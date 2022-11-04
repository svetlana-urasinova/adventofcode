import { part1, part2 } from './index.js';
import { input } from './input-example.js';

describe('2021-5', () => {
  test("should count overlap points without diagonal lines", () => {
    expect(part1(input)).toBe(5);
  });

  test("should count overlap points with diagonal lines", () => {
    expect(part2(input)).toBe(12);
  });
})