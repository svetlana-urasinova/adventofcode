import { part1, part2 } from './index.js';
import { input } from './input-example.js';

describe('2021-1', () => {
  test("should count measurements for offset=1", () => {
    expect(part1(input)).toBe(7);
  });

  test("should count measurements for offset=3", () => {
    expect(part2(input)).toBe(5);
  });
})