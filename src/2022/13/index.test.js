import { part1, part2, getInputData } from './index.js';
import { input } from './input-example.js';

describe('2022-13', () => {
  const data = getInputData(input);

  test("part 1: should count the sum of the indices of the parts that already are in the right order", () => {
    expect(part1(data)).toBe(13);
  });

  test("part 2: should find the decoder key", () => {
    expect(part2(data)).toBe(140);
  });
})