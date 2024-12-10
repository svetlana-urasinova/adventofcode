import { EMPTY } from '../../constants/empty.js';
import { input } from './input.js';

export function main() {
  const part1Answer = part1(input);
  const part2Answer = part2(input);

  return `
        <p>The resulting filesystem checksum with splitting files is <span class="answer">${part1Answer}</span>.</p>        
        <p>The resulting filesystem checksum without splitting files is <span class="answer">${part2Answer}</span>.</p>        
    `;
}

export function part1(input) {
  const data = getInputData(input);

  let i = 0;
  let j = data.length - 1;

  while (i < j) {
    if (data[i].value === EMPTY) {
      while (data[i].freeSpace > 0) {
        while (data[j].value === EMPTY || data[j].length === 0) {
          j--;
        }

        if (i >= j) {
          break;
        }

        if (data[i].freeSpace < data[j].length) {
          data[i].children.push({ value: data[j].value, length: data[i].freeSpace });
          data[j].length -= data[i].freeSpace;
          data[i].freeSpace = 0;
        } else {
          data[i].children.push({ value: data[j].value, length: data[j].length });
          data[i].freeSpace -= data[j].length;
          removeElement(j, data);
        }
      }
    }

    i++;
  }

  return calculateCheckSum(data);
}

export function part2(input) {
  const data = getInputData(input);

  const files = data.map((el, index) => ({ ...el, index })).filter(data => data.value !== EMPTY);

  for (let i = files.length - 1; i >= 0; i--) {
    const { value, length, index } = files[i];

    for (let j = 0; j < index; j++) {
      if (data[j].value === EMPTY && data[j].freeSpace >= length) {
        data[j].children.push({ value, length });
        data[j].freeSpace -= length;

        removeElement(index, data);

        break;
      }
    }
  }

  return calculateCheckSum(data);
}

export function getInputData(input) {
  return input.split('').reduce((result, char, index) => {
    const isEven = index % 2 === 0;

    const element = isEven
      ? { value: index / 2, length: +char }
      : { value: EMPTY, length: +char, freeSpace: +char, children: [] };

    return [...result, element];
  }, []);
}

function calculateCheckSum(data) {
  let total = 0;
  let index = 0;

  for (let i = 0; i < data.length; i++) {
    if (data[i].value === EMPTY) {
      data[i].children.forEach(child => {
        total += calculateCheckSumForElement(child, index);

        index += child.length;
      });

      if (data[i].freeSpace > 0) {
        index += data[i].freeSpace;
      }
    } else {
      total += calculateCheckSumForElement(data[i], index);

      index += data[i].length;
    }
  }

  return total;
}

function calculateCheckSumForElement(element, index) {
  const { value, length } = element;

  return ((2 * index + length - 1) * length * value) / 2;
}

function removeElement(index, data) {
  data[index] = { value: EMPTY, length: data[index].length, freeSpace: data[index].length, children: [] };
}
