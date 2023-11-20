import { getZeroPositionElement, parseInput } from './index.js';

describe('2019-2', () => {
  test("part 1: should get an element at position 0", () => {
    expect(getZeroPositionElement(parseInput(`1,9,10,3,2,3,11,0,99,30,40,50`))).toBe(3500);
    expect(getZeroPositionElement(parseInput(`1,0,0,0,99`))).toBe(2);
    expect(getZeroPositionElement(parseInput(`2,3,0,3,99`))).toBe(2);
    expect(getZeroPositionElement(parseInput(`2,4,4,5,99,0`))).toBe(2);
    expect(getZeroPositionElement(parseInput(`1,1,1,4,99,5,6,0,99`))).toBe(30);
  });
})