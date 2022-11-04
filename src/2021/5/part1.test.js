import { part1 } from './index.js';
import { input } from './input-example.js';

test("should work for example data", () => {
  expect(part1(input)).toBe(5);
})