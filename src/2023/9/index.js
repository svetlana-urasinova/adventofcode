import { input } from './input.js';

export function main() {
  const data = getInputData(input);

  const part1Answer = part1(data);
  const part2Answer = part2(data);

  return `
        <p>The sum of the extrapolated future values is <span class="answer">${part1Answer}</span>.</p>        
        <p>The sum of the extrapolated past values is <span class="answer">${part2Answer}</span>.</p>        
    `;
}

export function part1(data) {
  const copiedData = _.cloneDeep(data);

  let result = 0;

  for (const line of copiedData) {
    while (line.length > 0) {
      const lastNumber = line.pop();

      result += lastNumber;

      for (let i = 0; i < line.length - 1; i++) {
        line[i] = line[i + 1] - line[i];
      }

      line[line.length - 1] = lastNumber - line[line.length - 1];

      if (line.every(value => value === 0)) {
        break;
      }
    }
  }

  return result;
}

export function part2(data) {
  const copiedData = _.cloneDeep(data);

  let result = 0;

  for (const line of copiedData) {
    let counter = 0;

    while (line.length > 0) {
      for (let i = line.length - 1; i > 0; i--) {
        line[i] = line[i] - line[i - 1];
      }

      result += counter % 2 === 0 ? line.shift() : -1 * line.shift();

      counter++;

      if (line.every(value => value === 0)) {
        break;
      }
    }
  }

  return result;
}

export function getInputData(data) {
  return data.split('\n').map(line => line.split(' ').map(value => Number(value)));
}
