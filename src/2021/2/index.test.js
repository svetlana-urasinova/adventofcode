import { part1, part2 } from './index.js';
import { input } from './input-example.js';

describe('2021-2', () => {
  test("should get position without aiming", () => {
    expect(part1(input)).toBe(150);
  });

  test("should get position with aiming", () => {
    expect(part2(input)).toBe(900);
  });
})