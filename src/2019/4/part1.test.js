import { getMinMaxValues, isValidPassword } from './index.js';
import { input } from './input.js';

const { min, max } = getMinMaxValues(input);

test("should recognize valid passwords", () => {
  expect(isValidPassword(111111, min, max)).toBeFalsy();
  expect(isValidPassword(555555, min, max)).toBeTruthy();
  expect(isValidPassword(523400, min, max)).toBeFalsy();
  expect(isValidPassword(123789, min, max)).toBeFalsy();

})