import { input } from './input.js';

const DIGITS_LIST = { ...'0123456789'.split('') };

export function main() {
  const data = getInputData(input);

  const part1Answer = part1(data);
  const part2Answer = part2(data);

  return `
        <p>Sum of all of the calibration values is <span class="answer">${part1Answer}</span>.</p>        
        <p>Sum of all of the calibration values with correction is <span class="answer">${part2Answer}</span>.</p>        
    `;
}

export function part1(data) {
  return data.reduce((sum, line) => {
    const parsedLine = parseNumbers(line, DIGITS_LIST);

    return sum + getCalibrationValue(parsedLine);
  }, 0);
}

export function part2(data) {
  const dictionary = {
    ...DIGITS_LIST,
    one: 1,
    two: 2,
    three: 3,
    four: 4,
    five: 5,
    six: 6,
    seven: 7,
    eight: 8,
    nine: 9,
  };

  return data.reduce((sum, line) => {
    const parsedLine = parseNumbers(line, dictionary);

    return sum + getCalibrationValue(parsedLine);
  }, 0);
}

export function getInputData(data) {
  return data.split('\n');
}

function parseNumbers(str, dictionary) {
  const occurrences = [];

  for (const word of Object.keys(dictionary)) {
    let index = str.indexOf(word);

    while (index !== -1) {
      occurrences[index] = dictionary[word];

      index = str.indexOf(word, index + 1);
    }
  }

  return occurrences.join('');
}

function getCalibrationValue(str) {
  return Number(`${str[0]}${str[str.length - 1]}`);
}
