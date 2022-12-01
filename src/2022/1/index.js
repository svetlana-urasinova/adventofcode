import { input } from './input.js';

export function main() {
  const data = getInputData(input);

  const part1Answer = part1(data);
  const part2Answer = part2(data);

  return `
        <p>The Elf carrying the most Calories carries <span class="answer">${part1Answer}</span> calories.</p>        
        <p>Top three elves carrying the most Calories carry in total <span class="answer">${part2Answer}</span> calories.</p>        
    `;
}

export function part1(data) {
  return findSumOfFirstN(data, 1);
}

export function part2(data) {
  return findSumOfFirstN(data, 3);
}

export function getInputData(data) {
  return data.split('\n\n').map(lines => lines.split("\n").map(line => Number(line)).reduce((sum, num) => sum + num)).sort((a, b) => b - a);
}

function findSumOfFirstN(arr, n) {
  return arr.slice(0, n).reduce((sum, num) => sum + num);
}