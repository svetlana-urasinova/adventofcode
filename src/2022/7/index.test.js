import { part1, part2, getInputData } from './index.js';
import { input } from './input-example.js';

describe('2022-7', () => {
  const data = getInputData(input);

  test("part 1: should count the sum of the total sizes of directories that are not larger than 100000", () => {
    expect(part1(data)).toBe(95437);
  });

  test("part 2: should find the total size of the smallest directory that could free enough space", () => {
    expect(part2(data)).toBe(24933642);
  });
})