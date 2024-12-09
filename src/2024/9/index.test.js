import { part1, part2, getInputData } from './index.js';
import { input } from './input-example.js';

describe('2024-9', () => {
  test('part 1: should calculate the resulting filesystem checksum with splitting files', () => {
    expect(part1(input)).toBe(1928);
  });

  test('part 2: should calculate the resulting filesystem checksum without splitting files', () => {
    expect(part2(input)).toBe(2858);
  });
});
