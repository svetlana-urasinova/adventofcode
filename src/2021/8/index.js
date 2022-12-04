import { input } from './input.js';

const props = {
  2: 1,
  3: 7,
  4: 4,
  7: 8
}

const numberOfSegments = {
  1: 2,
  2: 5,
  3: 5,
  4: 4,
  5: 5,
  6: 6,
  7: 3,
  8: 7,
  9: 6,
  0: 6
}

export function main() {
  const data = getInputData(input);

  const part1Answer = part1(data);
  const part2Answer = part2(data);

  return `
        <p>Total number of digits 1, 4, 7 and 8 is <span class="answer">${part1Answer}</span>.</p>        
        <p>The sum of all the output values is <span class="answer">${part2Answer}</span>.</p>        
    `;
}

export function part1(data) {
  const uniqueNumbersLengths = getUniqueNumbers().map(number => numberOfSegments[number]);

  const res = {};

  data.forEach(el => el.output.forEach(str => {
    if (uniqueNumbersLengths.includes(str.length)) {
      res[str.length] = res[str.length] ? ++res[str.length] : 1;
    }
  }));

  return Object.values(res).reduce((sum, num) => sum + num);
}

export function part2(data) {
  return data.reduce((sum, line) => sum + decodeOutput(line.patterns, line.output), 0);
}

export function getInputData(data) {
  return data.split(/\n/)
    .map(el => el.split(/\s\|\s/))
    .map(el => el.map(str => str.split(/\s+/)))
    .map(arr => ({ patterns: arr[0], output: arr[1] }));
}

function getUniqueNumbers() {
  const segments = Object.values(numberOfSegments);

  return Object.keys(numberOfSegments)
    .filter(key => segments.indexOf(segments[key]) === segments.lastIndexOf(segments[key]))
    .map(key => +key);
}

function decodeOutput(patterns, output) {
  const digits = parseDigits(patterns);

  let val = '';

  for (let i in output) {
    val += digits.findIndex(digit => digit === output[i].split('').sort().join(''));
  }

  return +val;
}

function findDiff(str1, str2) {
  return str1.split('').filter(char => !str2.includes(char)).join('');
}

function filterByLength(arr, n) {
  return arr.filter(str => str.length === n);
}

function findLineContainingChars(lines, chars) {
  return lines.filter(el => chars.split('').every(char => el.includes(char)));
}

function parseDigits(patterns) {
  const digits = [];

  getUniqueNumbers().forEach(num => {
    digits[num] = patterns.find(str => str.length === numberOfSegments[num]);
  });

  const linesWithLength6 = filterByLength(patterns, 6);
  digits[9] = findLineContainingChars(linesWithLength6, digits[4])[0];
  digits[0] = findLineContainingChars(linesWithLength6, digits[1]).find(el => el !== digits[9]);
  digits[6] = linesWithLength6.find(el => el !== digits[9] && el !== digits[0]);

  const linesWithLength5 = filterByLength(patterns, 5);
  digits[2] = linesWithLength5.find(el => el.includes(findDiff(digits[8], digits[9])));
  digits[3] = linesWithLength5.find(el => digits[1].split('').every(letter => el.includes(letter)));
  digits[5] = linesWithLength5.find(el => el !== digits[2] && el !== digits[3]);

  return digits.map(el => el.split('').sort().join(''));
}