import { input } from './input.js';

export function main() {
  const data = getInputData(input);

  const part1Answer = part1(data);
  const part2Answer = part2(data);

  return `
        <p><span class="answer">${part1Answer}</span></p>        
        <p><span class="answer">${part2Answer}</span></p>        
    `;
}

export function part1(data) {
  return '';
}

export function part2(data) {
  return '';
}

export function getInputData(data) {
  return data;
}