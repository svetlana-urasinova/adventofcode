import { calculateFuel, calculateFuelPlus, getInputData } from './index.js';
import { input } from './input-example.js';

describe('2019-7', () => {
  const data = getInputData(input);

  test("part 1: should correctly count fuel amount", () => {
    expect(calculateFuel(data)).toBe(37)
  });

  test("part 2: should correctly count fuel amount", () => {
    expect(calculateFuelPlus(data)).toBe(168)
  });
})