import { input } from './input.js';

export function main() {
  const part1Answer = part1();
  const part2Answer = part2();

  return `
        <p>${part1Answer}.</p>
        <p>${part2Answer}.</p>
    `;
}

function part1() {
  return countLanternFish(input, 80);
}

function part2() {
  return countLanternFish(input, 256);
}

export function countLanternFish(data, days) {
  let fishList = data.split(',').map(str => Number(str)).reduce((acc, el) => {
    acc[el] = ++acc[el] || 1;
    return acc;
  }, {});

  for (let i = 1; i <= days; i++) { fishList = startNewDay(fishList); }

  return Object.values(fishList).reduce((acc, el) => acc + el);
}


function startNewDay(data) {
  const DEFAULT_INDEX = 6;
  const NEWBORN_INDEX = 8;

  let res = {};
  res[DEFAULT_INDEX] = 0;
  res[NEWBORN_INDEX] = 0;

  for (let i of Object.keys(data)) {
    if (+i !== 0) { res[i - 1] = data[i]; }
  }

  res[DEFAULT_INDEX] += data[0] ?? 0;
  res[NEWBORN_INDEX] += data[0] ?? 0;

  return res;
}