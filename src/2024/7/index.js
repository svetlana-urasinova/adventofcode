import { input } from './input-example.js';

export function main() {
  const data = getInputData(input);

  const part1Answer = part1(data);
  const part2Answer = part2(data);

  return `
        <p>Total calibration result with sum and multiplication is <span class="answer">${part1Answer}</span>.</p>        
        <p>Total calibration result with sum, multiplication, and concatenation is <span class="answer">${part2Answer}</span>.</p>        
    `;
}

export function part1(data) {
  let total = 0n;

  for (let i = 0; i < data.length; i++) {
    const { result, numbers } = data[i];

    if (isValidEquation(numbers, result)) {
      total += result;
    }
  }

  return total;
}

export function part2(data) {
  let total = 0n;

  for (let i = 0; i < data.length; i++) {
    const { result, numbers } = data[i];

    if (isValidEquation(numbers, result, true)) {
      total += result;
    }
  }

  return total;
}

export function getInputData(input) {
  return input.split('\n').map(line => {
    const [resultStr, numbersStr] = line.split(': ');

    return { result: BigInt(resultStr), numbers: numbersStr.split(' ').map(number => BigInt(number)) };
  });
}

function isValidEquation(numbers, result, enableConcatenation = false) {
  let queue = [result];

  for (let i = numbers.length - 1; i >= 0; i--) {
    const queueLength = queue.length;

    for (let j = 0; j < queueLength; j++) {
      const rest = queue.shift();

      if (rest === numbers[i]) {
        return true;
      }

      if (rest % numbers[i] === 0n) {
        queue.push(rest / numbers[i]);
      }

      if (rest - numbers[i] >= 0n) {
        queue.push(rest - numbers[i]);
      }

      if (enableConcatenation && rest.toString().endsWith(numbers[i].toString())) {
        queue.push(BigInt(rest.toString().slice(0, rest.toString().length - numbers[i].toString().length)));
      }
    }
  }

  return false;
}
