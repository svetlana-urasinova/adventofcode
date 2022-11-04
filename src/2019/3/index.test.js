import { part1, part2 } from './index.js';

describe('2019-3', () => {
  test("part1: should correctly count distance to closest intersection", () => {
    expect(part1("R8,U5,L5,D3\nU7,R6,D4,L4")).toBe(6);
    expect(part1("R98,U47,R26,D63,R33,U87,L62,D20,R33,U53,R51\nU98,R91,D20,R16,D67,R40,U7,R15,U6,R7")).toBe(135);
    expect(part1("R75,D30,R83,U83,L12,D49,R71,U7,L72\nU62,R66,U55,R34,D71,R55,D58,R83")).toBe(159);
  });

  test("part2: should correctly count minimal steps count", () => {
    expect(part2("R8,U5,L5,D3\nU7,R6,D4,L4")).toBe(30);
    expect(part2("R75,D30,R83,U83,L12,D49,R71,U7,L72\nU62,R66,U55,R34,D71,R55,D58,R83")).toBe(610);
    expect(part2("R98,U47,R26,D63,R33,U87,L62,D20,R33,U53,R51\nU98,R91,D20,R16,D67,R40,U7,R15,U6,R7")).toBe(410);
  });
})