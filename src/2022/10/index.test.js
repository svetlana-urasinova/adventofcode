import { part1, part2, getInputData } from './index.js';
import { input } from './input-example.js';

describe('2022-10', () => {
  const data = getInputData(input);

  test("part 1: should count the sum of signal strengths during the 20th, 60th, 100th, 140th, 180th and 220th cycles", () => {
    expect(part1(data)).toBe(13140);
  });

  test("part 2: %TEST_NAME%", () => {
    const img = part2(data).replace(/\<br\s\/\>/gm, "\n")
    expect(img).toBe(`##..##..##..##..##..##..##..##..##..##..
###...###...###...###...###...###...###.
####....####....####....####....####....
#####.....#####.....#####.....#####.....
######......######......######......####
#######.......#######.......#######.....`);
  });
})