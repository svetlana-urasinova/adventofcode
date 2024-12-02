import { input } from './input.js';

const PART_1_MIN = 1;
const PART_1_MAX = 3;

export function main() {
  const data = getInputData(input);

  const part1Answer = part1(data);
  const part2Answer = part2(data);

  return `
        <p>Total amount of safe reports is <span class="answer">${part1Answer}</span>.</p>        
        <p><span class="answer">${part2Answer}</span></p>        
    `;
}

export function part1(data) {
  return data.reduce((total, report) => (isSafe(report) ? ++total : total), 0);
}

export function part2(data) {
  return '';
}

export function getInputData(data) {
  return data.split('\n').map(line => line.split(/\s+/).map(el => +el));
}

function isSafe(report) {
  const sign = Math.sign(report[1] - report[0]);

  for (let i = 1; i < report.length; i++) {
    const diff = report[i] - report[i - 1];

    if (Math.sign(diff) !== sign || Math.abs(diff) < PART_1_MIN || Math.abs(diff) > PART_1_MAX) {
      return false;
    }
  }

  return true;
}
