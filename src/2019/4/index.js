import { input } from './input.js';

export function main() {
  const part1Answer = part1(input);
  const part2Answer = part2(input);

  return `
  <p><span class="answer">${part1Answer}</span> different passwords within the range meet the criteria.</p>
  <p><span class="answer">${part2Answer}</span> different passwords within the range meet the extended criteria.</p>
  `;
}

function part1(input) {
  const { min, max } = getMinMaxValues(input);

  const inputData = getInputData(min, max);

  return inputData.filter(password => isValidPassword(password, min, max)).length;
}

function part2(input) {
  const { min, max } = getMinMaxValues(input);

  const inputData = getInputData(min, max);

  return inputData.filter(password => isValidPasswordExtended(password, min, max)).length;
}

function getInputData(min, max) {
  const data = [];

  for (let i = min; i <= max; i++) {
    data.push(i);
  }

  return data;
}

export function isValidPassword(password, min, max) {
  return password >= min && password <= max && hasDoubles(password) && neverDecreases(password)
}

export function isValidPasswordExtended(password, min, max) {
  return password >= min && password <= max && hasDoublesExtended(password) && neverDecreases(password)
}

export function getMinMaxValues(input) {
  const [min, max] = input.split('-').map(str => Number(str));

  return { min, max };
}

function hasDoubles(password) {
  const passwordStr = password.toString();

  for (let i = 1; i < passwordStr.length; i++) {
    if (passwordStr[i] === passwordStr[i - 1]) {
      return true;
    }
  }

  return false;
}

function hasDoublesExtended(password) {
  const passwordStr = password.toString();

  let sequenceLength = 1;

  for (let i = 1; i < passwordStr.length; i++) {
    if (passwordStr[i] === passwordStr[i - 1]) {
      sequenceLength++;
    } else {
      if (sequenceLength === 2) {
        return true;
      }

      sequenceLength = 1;
    }
  }

  return sequenceLength === 2;
}

function neverDecreases(password) {
  const passwordStr = password.toString();

  for (let i = 1; i < passwordStr.length; i++) {
    if (Number(passwordStr[i]) < Number(passwordStr[i - 1])) {
      return false;
    }
  }

  return true;
}