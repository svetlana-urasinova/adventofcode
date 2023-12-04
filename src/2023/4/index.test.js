import { part1, part2, getInputData, calculatePoints } from './index.js';
import { input } from './input-example.js';

describe('2023-4', () => {
  const data = getInputData(input);

  test('part 1: should calculate how many points the pile of the scratchcards is worth', () => {
    expect(part1(data)).toBe(13);
  });

  test('part 2: should calculate the total number of cards in the end', () => {
    expect(part2(data)).toBe(30);
  });
});
