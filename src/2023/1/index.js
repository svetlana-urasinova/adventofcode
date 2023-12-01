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
  return getCalibrationValuesSum(data, DIGITS_LIST);
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

  return getCalibrationValuesSum(data, dictionary);
}

export function getInputData(data) {
  return data.split('\n');
}

function getCalibrationValuesSum(data, dictionary) {
  return data.reduce((sum, line) => {
    const parsedLine = parseNumbers(line, dictionary);

    return sum + getCalibrationValue(parsedLine);
  }, 0);
}

function parseNumbers(str, dictionary) {
  const occurrences = [];

  for (const word of Object.keys(dictionary)) {
    let i = 0;

    while (i <= str.length - word.length) {
      if (str.slice(i, i + word.length) === word) {
        occurrences[i] = dictionary[word];

        i += word.length;
      } else {
        i++;
      }
    }
  }

  return occurrences.join('');
}

function getCalibrationValue(str) {
  return Number(`${str[0]}${str[str.length - 1]}`);
}
