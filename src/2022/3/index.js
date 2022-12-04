import { input } from './input.js';

export function main() {
  const data = getInputData(input);

  const part1Answer = part1(data);
  const part2Answer = part2(data);

  return `
        <p>Total priority of bad items is <span class="answer">${part1Answer}</span>.</p>        
        <p>Total priority of badges is <span class="answer">${part2Answer}</span>.</p>        
    `;
}

export function part1(data) {
  return data.reduce((total, rucksack) => {
    const firstHalf = rucksack.slice(0, rucksack.length / 2);
    const secondHalf = rucksack.slice(rucksack.length / 2);

    const badItem = firstHalf.split('').find(char => secondHalf.includes(char));

    return total + countPriority(badItem);
  }, 0);
}

export function part2(data) {
  return data.reduce((acc, rucksack, index) => {
    acc.currentGroup.push(rucksack);

    if (index % 3 === 2) {
      const badge = acc.currentGroup[0].split('').find(char => acc.currentGroup[1].includes(char) && acc.currentGroup[2].includes(char));
      acc.total += countPriority(badge);

      acc.currentGroup = [];
    }

    return acc;
  }, { currentGroup: [], total: 0 }).total;
}

export function getInputData(data) {
  return data.split('\n');
}

function countPriority(item) {
  const UPPERCASE_CODE_SHIFT = 38;
  const LOWERCASE_CODE_SHIFT = 96;

  const UPPERCAZE_A_CODE = 65;
  const UPPERCAZE_Z_CODE = 90;
  const LOWERCASE_A_CODE = 97;
  const LOWERCASE_Z_CODE = 122;

  const code = item.charCodeAt();

  switch (true) {
    case code >= UPPERCAZE_A_CODE && code <= UPPERCAZE_Z_CODE:
      return code - UPPERCASE_CODE_SHIFT;
    case code >= LOWERCASE_A_CODE && code <= LOWERCASE_Z_CODE:
      return code - LOWERCASE_CODE_SHIFT;
    default:
      return;
  }
}