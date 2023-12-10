import { part1, part2, getInputData } from './index.js';
import { input } from './input-example.js';
import { input as input2 } from './input-example2.js';
import { input as input3 } from './input-example3.js';
import { input as input4 } from './input-example4.js';
import { input as input5 } from './input-example5.js';

describe('2023-10', () => {
  const data = getInputData(input);
  const data2 = getInputData(input2);
  const data3 = getInputData(input3);
  const data4 = getInputData(input4);
  const data5 = getInputData(input5);

  test('part 1: should calculate the number of steps needed to get from the starting position to the point farthest from the starting position', () => {
    expect(part1(data)).toBe(4);
    expect(part1(data2)).toBe(8);
  });

  test('part 2: should calculate the numbers of tiles enclosed by the loop', () => {
    expect(part2(data3)).toBe(4);
    expect(part2(data4)).toBe(8);
    expect(part2(data5)).toBe(10);
  });
});
