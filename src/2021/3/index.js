import { input } from "./input.js";

export function main() {
  const part1Answer = part1(input);
  const part2Answer = part2(input);

  return `
    <p>The power consumption of the submarine is <span class="answer">${part1Answer}</span>.</p>
    <p>The life support rating of the submarine is <span class="answer">${part2Answer}</span>.</p>    
  `;
}

export function part1(input) {
  const data = getInputData(input);
  const { gamma, epsilon } = generatePower(data);

  return binToDec(gamma) * binToDec(epsilon);
}

export function part2(input) {
  const data = getInputData(input);
  const { gamma, epsilon } = generateLifeSupport(data);

  return binToDec(gamma) * binToDec(epsilon);
}

function getInputData(input) {
  return input.trim().split("\n").map(str => str.trim());
}

function invert(str) {
  return str.split('').map(el => 1 - el).join('');
}

function binToDec(str) {
  return parseInt(str, 2);
}

function findMostCommonBit(data, pos) {
  const rates = data.reduce((acc, item) => {
    acc[+item[pos]]++;
    return acc;
  }, [0, 0]);
  return rates[0] > rates[1] ? 0 : 1;
}

function findRating(data, mode) {
  let i = 0;
  while (data.length > 1) {
    const bit = findMostCommonBit(data, i);
    const modifier = mode === 'max' ? bit : 1 - bit;
    data = data.filter(el => +el[i] === modifier);
    i++;
  }
  return data[0];
}

function generatePower(data) {
  const gamma = data[0].split('').map((_, i) => findMostCommonBit(data, i)).join('');
  const epsilon = invert(gamma);
  return { gamma, epsilon };
}

function generateLifeSupport(data) {
  const gamma = findRating(data, 'max');
  const epsilon = findRating(data, 'min');
  return { gamma, epsilon };
}
