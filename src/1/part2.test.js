import { getUpdatedFuelAmount } from './index.js';

test("should work for initial data", () => {
  expect(getUpdatedFuelAmount(12)).toBe(2);
  expect(getUpdatedFuelAmount(14)).toBe(2);
  expect(getUpdatedFuelAmount(1969)).toBe(966);
  expect(getUpdatedFuelAmount(100756)).toBe(50346);
})