import { part1, part2 } from './index.js';

describe('2022-6', () => {
  test("part 1: should find the first start-of-packet marker", () => {
    expect(part1('mjqjpqmgbljsphdztnvjfqwrcgsmlb')).toBe(7);
    expect(part1('bvwbjplbgvbhsrlpgdmjqwftvncz')).toBe(5);
    expect(part1('nppdvjthqldpwncqszvftbrmjlhg')).toBe(6);
    expect(part1('nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg')).toBe(10);
    expect(part1('zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw')).toBe(11);
  });

  test("part 2: should find the first start-of-message marker", () => {
    expect(part2('mjqjpqmgbljsphdztnvjfqwrcgsmlb')).toBe(19);
    expect(part2('bvwbjplbgvbhsrlpgdmjqwftvncz')).toBe(23);
    expect(part2('nppdvjthqldpwncqszvftbrmjlhg')).toBe(23);
    expect(part2('nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg')).toBe(29);
    expect(part2('zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw')).toBe(26);
  });
})