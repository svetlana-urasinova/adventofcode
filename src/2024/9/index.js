import { EMPTY } from '../../constants/empty.js';
import { input } from './input-example.js';

export function main() {
  const data = getInputData(input);

  const part1Answer = part1(data);
  // const part1Answer = part1(getInputData('12345'));
  const part2Answer = part2(data);

  return `
        <p>The resulting filesystem checksum is <span class="answer">${part1Answer}</span>.</p>        
        <p>Answer to part 2: <span class="answer">${part2Answer}</span>.</p>        
    `;
}

export function part1(data) {
  removeEmptyFromRight(data);

  let i = 0;

  while (i < data.length) {
    if (data[i].value === EMPTY) {
      const update = generateSplitFileUpdate(i, data);

      data.splice(i, 1, ...update);

      i += update.length;
    } else {
      i++;
    }
  }

  return calculateCheckSum(data);
}

export function part2(data) {
  return '(answer)';
}

export function getInputData(input) {
  return input
    .split('')
    .reduce((result, char, index) => [...result, { value: index % 2 === 0 ? index / 2 : EMPTY, length: +char }], []);
}

function calculateCheckSum(data) {
  let index = 0;

  return data.reduce((sum, el) => {
    const { value, length } = el;

    for (let i = 0; i < length; i++) {
      sum += value * index;
      index++;
    }

    return sum;
  }, 0);
}

function removeEmptyFromRight(data) {
  while (data[data.length - 1].value === EMPTY || data[data.length - 1].length === 0) {
    data.pop();
  }

  return data;
}

function generateSplitFileUpdate(index, data) {
  const update = [];

  let length = data[index].length;

  while (length > 0) {
    removeEmptyFromRight(data);

    const lastElement = data.at(-1);

    const currentUpdateLength = Math.min(length, lastElement.length);

    update.push({ value: lastElement.value, length: currentUpdateLength });

    length -= currentUpdateLength;

    data.at(-1).length -= currentUpdateLength;
  }

  return update;
}

function printData(data) {
  console.log(
    data.reduce((acc, el) => {
      const { value, length } = el;

      return acc + value.toString().repeat(length);
    }, '')
  );
}
