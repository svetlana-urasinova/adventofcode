import { countLanternFish } from './index.js';
import { input } from './input-example.js';

describe('2021-6', () => {
  test("should count lanternfish after 18 days", () => {
    expect(countLanternFish(input, 18)).toBe(26);
  });

  test("should count lanternfish after 80 days", () => {
    expect(countLanternFish(input, 80)).toBe(5934);
  });
})