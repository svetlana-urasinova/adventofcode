import { part1, part2 } from './index.js';
import { input } from './input-example.js';

describe('2021-4', () => {
  test("should count final score when you win", () => {
    expect(part1(input)).toBe(4512);
  });

  test("should count final score when giant squid wins", () => {
    expect(part2(input)).toBe(1924);
  });
})