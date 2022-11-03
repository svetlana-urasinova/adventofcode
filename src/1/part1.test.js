import { getFuelAmount } from './index.js';

test("should work for initial data", () => {
  expect(getFuelAmount(12)).toBe(2);
  expect(getFuelAmount(14)).toBe(2);
  expect(getFuelAmount(1969)).toBe(654);
  expect(getFuelAmount(100756)).toBe(33583);
})