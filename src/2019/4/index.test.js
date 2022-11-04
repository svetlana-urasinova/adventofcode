import { getMinMaxValues, isValidPassword, isValidPasswordExtended } from './index.js';
import { input } from './input.js';

describe('2019-4', () => {
  const { min, max } = getMinMaxValues(input);

  test("should recognize valid passwords", () => {
    expect(isValidPassword(111111, min, max)).toBeFalsy();
    expect(isValidPassword(555555, min, max)).toBeTruthy();
    expect(isValidPassword(523400, min, max)).toBeFalsy();
    expect(isValidPassword(123789, min, max)).toBeFalsy();
  });


  test("should recognize valid passwords", () => {
    expect(isValidPasswordExtended(111111, min, max)).toBeFalsy();
    expect(isValidPasswordExtended(556677, min, max)).toBeTruthy();
    expect(isValidPasswordExtended(567888, min, max)).toBeFalsy();
    expect(isValidPasswordExtended(556666, min, max)).toBeTruthy();
    expect(isValidPasswordExtended(555555, min, max)).toBeFalsy();
    expect(isValidPasswordExtended(523400, min, max)).toBeFalsy();
    expect(isValidPasswordExtended(123789, min, max)).toBeFalsy();
  });
})