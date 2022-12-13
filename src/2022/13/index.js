import { input } from './input.js';

export function main() {
  const data = getInputData(input);

  const part1Answer = part1(data);
  const part2Answer = part2(input);

  return `
        <p>The sum of indices of the parts that already are in the right order is <span class="answer">${part1Answer}</span>.</p>        
        <p>The decoder key is <span class="answer">${part2Answer}</span>.</p>        
    `;
}

export function part1(pairs) {
  return pairs.reduce((sum, pair, index) => comparePair(pair) === -1 ? sum + index + 1 : sum, 0);
}

export function part2(input) {
  const dividers = ['[[2]]', '[[6]]'];
  const data = [...input.split(/\n+/), ...dividers]
    .sort((a, b) => comparePair([a, b]));

  return dividers.reduce((production, divider) => production * (data.indexOf(divider) + 1), 1);
}

export function getInputData(data) {
  return data.split("\n\n").map(pair => pair.split("\n"));
}

function comparePair(pair) {
  const [left, right] = pair;

  const parsedLeft = parseList(left.replace(/(?<=^)\[|\](?=$)/g, ''));
  const parsedRight = parseList(right.replace(/(?<=^)\[|\](?=$)/g, ''));

  const res = compare(parsedLeft, parsedRight, true);

  return res;
}

function compare(left, right) {
  if (Number.isInteger(left) && Number.isInteger(right)) {
    return left < right ? -1 : left > right ? 1 : 0;
  }

  const updatedLeft = Number.isInteger(left) ? [left] : left;
  const updatedRight = Number.isInteger(right) ? [right] : right;

  for (let i = 0; i < updatedLeft.length; i++) {
    if (i === updatedRight.length) {
      return 1;
    }

    const compareResult = compare(updatedLeft[i], updatedRight[i]);

    if (compareResult) {
      return compareResult;
    }
  }

  return updatedLeft.length === updatedRight.length ? 0 : -1;
}

function parseList(str) {
  const parsedList = [];

  let currentString = '';
  let openedBrackets = 0;
  let closedBrackets = 0;

  for (let i = 0; i < str.length; i++) {
    switch (str[i]) {
      case '[':
        openedBrackets++;
        currentString += str[i];

        break;
      case ']':
        closedBrackets++;
        currentString += str[i];

        if (openedBrackets === closedBrackets) {
          parsedList.push(parseList(currentString.substring(1, currentString.length - 1)));

          openedBrackets = 0;
          closedBrackets = 0;
          currentString = '';
        }

        break;
      case ',':
        if (openedBrackets > 0) {
          currentString += str[i];
        } else {
          if (currentString.length > 0) {
            parsedList.push(Number(currentString));
            currentString = '';
          }
        }

        break;
      default:
        currentString += str[i];

        if (i === str.length - 1) {
          parsedList.push(Number(currentString));
        }
    }
  }

  return parsedList;
}