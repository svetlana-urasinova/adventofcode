import { input } from './input.js';

const SPACE_CHAR = '.';

export function main() {
  const part1Answer = part1(input);
  const part2Answer = part2(input);

  return `
        <p>The sum of the lengths of the shortest path between every pair of galaxies is <span class="answer">${part1Answer}</span>.</p>        
        <p>The sum of the lengths of the shortest path between every pair of quickly expanding galaxies is <span class="answer">${part2Answer}</span>.</p>        
    `;
}

export function part1(input) {
  return solution(input);
}

export function part2(input) {
  return solution(input, 1000000);
}

// base case is expandMultiplier = 2 (means every empty row or column will be twice as big)
export function solution(input, expandMultiplier = 2) {
  const data = getInputData(input, expandMultiplier);

  return data.reduce((result, coords, index) => {
    const { x, y } = coords;

    for (let i = index + 1; i < data.length; i++) {
      result += Math.abs(data[i].y - y) + Math.abs(data[i].x - x);
    }

    return result;
  }, 0);
}

export function getInputData(data, expandMultiplier) {
  let y = 0;

  const sortedData = data
    .split('\n')
    .map(line => {
      const row = line.split('').reduce((acc, char, x) => {
        if (char === SPACE_CHAR) {
          return acc;
        }

        acc.push({ x, y });

        return acc;
      }, []);

      y++;

      if (!row.length) {
        y += expandMultiplier - 1;
      }

      return row;
    })
    .flat()
    .sort((a, b) => a.x - b.x);

  let currentX = 0;
  let shift = 0;

  for (let i = 0; i < sortedData.length; i++) {
    while (currentX < sortedData[i].x) {
      currentX++;
      shift += expandMultiplier - 1;
    }

    if (currentX === sortedData[i].x) {
      currentX++;
    }

    sortedData[i].x += shift;
  }

  return sortedData;
}
