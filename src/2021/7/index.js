import { input } from './input.js';

export function main() {
  const data = getInputData(input);

  const part1Answer = part1(data);
  const part2Answer = part2(data);

  return `
        <p>Crabs spend <span class="answer">${part1Answer}</span> fuel to align if fuel consumption is a constant rate.</p>        
        <p>Crabs spend <span class="answer">${part2Answer}</span> fuel to align if fuel consumption is not a constant rate.</p>        
    `;
}

function part1(data) {
  return calculateFuel(data);
}

function part2(data) {
  return calculateFuelPlus(data);
}

function getInputData(data) {
  return data.split(',').sort((a, b) => a - b);
}

function calculateSum(arr) {
  return arr.reduce((acc, el) => +acc + +el);
}

function getMedian(arr) {
  return Math.floor(arr.length / 2);
}

function calculateFuel(data) {
  const median = data[getMedian(data)];
  return calculateSum(data.map(el => Math.abs(median - el)));
}

function calculateFuelPlus(data) {
  const findFuelAmount = (point, arr) => {
    let res = 0;
    for (let i = 0; i < arr.length; i++) {
      const distance = Math.abs(arr[i] - point);
      res += distance * (distance + 1) / 2;
    }
    return res;
  }

  for (let i = data[0]; i <= data[data.length - 1]; i++) {
    findFuelAmount(i, data);
  }

  const median = getMedian(data);
  let current = findFuelAmount(median, data);
  let left = findFuelAmount(median - 1, data);
  let right = findFuelAmount(median + 1, data);

  if (current >= left) {
    let i = median;
    while (left !== undefined && left <= current) {
      i--;
      current = left;
      left = findFuelAmount(i, data);
    }
  }
  if (current >= right) {
    let i = median;
    while (right !== undefined && right <= current) {
      i++;
      current = right;
      right = findFuelAmount(i, data);
    }
  }

  return current;
}