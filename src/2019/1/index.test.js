import { getFuelAmount, getUpdatedFuelAmount } from './index.js';

describe('2019-1', () => {
  test("part1: should correctly count fuel amount", () => {
    expect(getFuelAmount(12)).toBe(2);
    expect(getFuelAmount(14)).toBe(2);
    expect(getFuelAmount(1969)).toBe(654);
    expect(getFuelAmount(100756)).toBe(33583);
  });

  test("part2: should correctly count fuel amount with taking into account the mass of the added fuel", () => {
    expect(getUpdatedFuelAmount(12)).toBe(2);
    expect(getUpdatedFuelAmount(14)).toBe(2);
    expect(getUpdatedFuelAmount(1969)).toBe(966);
    expect(getUpdatedFuelAmount(100756)).toBe(50346);
  })
})