import { part1, part2, getInputData } from './index.js';
import { input } from './input-example.js';

describe('2022-5', () => {
  const data = getInputData(input);

  test("part 1: should find which crate ends up on top of every stack with CrateMover-9000", () => {
    expect(part1(data)).toBe('CMZ');
  });

  test("part 2:should find which crate ends up on top of every stack with CrateMover-9001", () => {
    expect(part2(data)).toBe('MCD');
  });
})