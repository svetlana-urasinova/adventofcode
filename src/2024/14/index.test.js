import { part1, part2, getInputData } from './index.js';
import { input } from './input-example.js';

describe('2024-14', () => {
  const data = getInputData(input);

  test('part 1: should calculatethe safety factor be after exactly 100 seconds have elapsed', () => {
    expect(part1(data)).toBe(12);
  });
});
