import { getZeroPositionElement } from './index.js';

test("should work for initial data", () => {
  expect(getZeroPositionElement(`1,9,10,3,2,3,11,0,99,30,40,50`)).toBe(3500);
  expect(getZeroPositionElement(`1,0,0,0,99`)).toBe(2);
  expect(getZeroPositionElement(`2,3,0,3,99`)).toBe(2);
  expect(getZeroPositionElement(`2,4,4,5,99,0`)).toBe(2);
  expect(getZeroPositionElement(`1,1,1,4,99,5,6,0,99`)).toBe(30);
})