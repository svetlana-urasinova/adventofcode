import { input } from "./input.js";

export function main() {
  const part1Answer = part1(input);
  const part2Answer = part2(input);

  return `
    <p><span class="answer">${part1Answer}</span> measurements are larger than the previous measurement.</p>
    <p><span class="answer">${part2Answer}</span> sums are larger than the previous sum.</p>
  `;
}

export function part1(input) {
  return countIncreases(input, 1);
}

export function part2(input) {
  return countIncreases(input, 3);
}

function countIncreases(input, offset) {
  const inputData = input.trim().split("\n").map(str => Number(str));

  return inputData.reduce((sums, depth, i) => (i > offset - 1 && depth > inputData[i - offset]) ? sums + 1 : sums, 0);
}