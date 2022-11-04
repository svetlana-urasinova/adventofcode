import { part2 } from './index.js';
import { input } from './input-example.js';

test("should work for example data", () => {
  expect(part2(input)).toBe(12);
})