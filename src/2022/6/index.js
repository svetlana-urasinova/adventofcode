import { input } from './input.js';

export function main() {
  const part1Answer = part1(input);
  const part2Answer = part2(input);

  return `
        <p>Before the first start-of-packet marker <span class="answer">${part1Answer}</span> characters need to be processed.</p>        
        <p>Before the first start-of-message marker <span class="answer">${part2Answer}</span> characters need to be processed.</p>        
    `;
}

export function part1(input) {
  const PACKET_MARKER_LENGTH = 4;

  return findSubstringWithDistinctCharacters(input, PACKET_MARKER_LENGTH);
}

export function part2(input) {
  const MESSAGE_MARKER_LENGTH = 14;

  return findSubstringWithDistinctCharacters(input, MESSAGE_MARKER_LENGTH);
}

function findSubstringWithDistinctCharacters(input, length) {
  for (let i = 0; i < input.length - length; i++) {
    const substr = input.slice(i, i + length);

    if (new Set(substr).size === length) {
      return i + length;
    }
  }
}