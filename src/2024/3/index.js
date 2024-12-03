import { input } from './input.js';

export function main() {
  const data = getInputData(input);

  const part1Answer = part1(data);
  const part2Answer = part2(data);

  return `
        <p><span class="answer">Sum of all multiplications is ${part1Answer}</span>.</p>        
        <p><span class="answer">${part2Answer}</span></p>        
    `;
}

export function part1(data) {
  return data.reduce((sum, pair) => sum + pair[0] * pair[1], 0);
}

export function part2(data) {
  return '';
}

export function getInputData(data) {
  const instructions = data.match(/mul\(\d+,\d+\)/g);

  return instructions.map(instruction => instruction.match(/\d+/g).map(el => +el));
}
