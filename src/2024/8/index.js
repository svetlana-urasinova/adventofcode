import { input } from './input-example.js';

export function main() {
  const data = getInputData(input);

  const part1Answer = part1(data);
  const part2Answer = part2(data);

  return `
        <p>Answer to part 1: <span class="answer">${part1Answer}</span>.</p>        
        <p>Answer to part 2: <span class="answer">${part2Answer}</span>.</p>        
    `;
}

export function part1(data) {
  return '(answer)';
}

export function part2(data) {
  return '(answer)';
}

export function getInputData(input) {
  return input;
}
