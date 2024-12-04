import { input } from './input.js';

export function main() {
  const data = getInputData(input);

  const part1Answer = part1(data);
  const part2Answer = part2(data);

  return `
        <p>A total distance between the left and the right lists is <span class="answer">${part1Answer}</span>.</p>        
        <p>A total similarity score between the left and the right lists is <span class="answer">${part2Answer}</span>.</p>        
    `;
}

export function part1(data) {
  const { left, right } = data;

  return left.reduce((acc, _, i) => acc + countDifference(right[i], left[i]), 0);
}

export function part2(data) {
  const { left, right } = data;

  return left.reduce((acc, _, i) => acc + countSimilarity(right, left[i]), 0);
}

export function getInputData(data) {
  const result = { left: [], right: [] };

  for (const line of data.split('\n')) {
    const [left, right] = line.split(/\s+/);

    result.left.push(Number(left));
    result.right.push(Number(right));
  }

  result.left.sort();
  result.right.sort();

  return result;
}

function countDifference(a, b) {
  return Math.abs(a - b);
}

function countSimilarity(arr, element) {
  let n = 0;

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === element) {
      n++;
    } else {
      if (n > 0) {
        break;
      }
    }
  }

  return element * n;
}
