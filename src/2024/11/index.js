import { input } from './input.js';

const hashmap = {
  0: [1n],
};

export function main() {
  const data = getInputData(input);

  const part1Answer = part1(data);
  const part2Answer = part2(data);

  return `
        <p>After blinking 25 times there will be <span class="answer">${part1Answer}</span> stones.</p>        
        <p>After blinking 75 times there will be <span class="answer">${part2Answer}</span> stones.</p>        
    `;
}

export function part1(data) {
  return calculate(data, 25);
}

export function part2(data) {
  return calculate(data, 75);
}

export function getInputData(input) {
  return input.split(' ').map(el => +el);
}

function calculate(stones, n) {
  let currentStones = {};

  for (const stone of stones) {
    increaseValue(currentStones, stone);
  }

  let i = 0;

  while (i < n) {
    currentStones = blink(currentStones);

    i++;
  }

  return Object.values(currentStones).reduce((sum, stone) => sum + stone, 0);
}

function blink(stones) {
  const result = {};

  for (const key in stones) {
    const stone = Number(key);

    if (stone === 0) {
      increaseValue(result, 1, stones[stone]);

      continue;
    }

    const numberOfDigits = Math.floor(Math.log10(stone)) + 1;

    if (numberOfDigits % 2 === 0) {
      const div = Math.pow(10, numberOfDigits / 2);

      increaseValue(result, Math.floor(stone / div), stones[stone]);
      increaseValue(result, stone % div, stones[stone]);
    } else {
      increaseValue(result, stone * 2024, stones[stone]);
    }
  }

  return result;
}

function increaseValue(map, index, diff = 1) {
  map[index] = (map[index] || 0) + diff;
}
