import { part1, part2, getInputData } from './index.js';
import { input } from './input-example.js';
import { input as input2 } from './input-example2.js';
import { input as input3 } from './input-example3.js';

describe('2023-8', () => {
  const data = getInputData(input);
  const data2 = getInputData(input2);
  const data3 = getInputData(input3);

  test('part 1: should calculate amount of steps to reach ZZZ', () => {
    expect(part1(data)).toBe(2);
    expect(part1(data2)).toBe(6);
  });

  test('part 2: should calculate amount of steps to end up entirely on nodes that end in Z', () => {
    expect(part2(data3)).toBe(6);
  });
});
