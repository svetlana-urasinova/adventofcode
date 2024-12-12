import { input } from './input.js';
import { Matrix } from '../../classes/matrix.js';
import { DIRECTIONS } from '../../constants/directions.js';
import { getFilteredNeighbors } from '../../utils/get-filtered-neighbors.js';

const neighborDirections = [DIRECTIONS.Up, DIRECTIONS.Down, DIRECTIONS.Left, DIRECTIONS.Right];

const START = 0;
const END = 9;

export function main() {
  const data = getInputData(input);

  const part1Answer = part1(data);
  const part2Answer = part2(data);

  return `
        <p>The sum of the scores of all trailheads is <span class="answer">${part1Answer}</span>.</p>        
        <p>Answer to part 2: <span class="answer">${part2Answer}</span>.</p>        
    `;
}

export function part1(matrix) {
  const paths = buildAllPaths(matrix);

  return filterUniquePaths(paths).length;
}

export function part2(matrix) {
  return buildAllPaths(matrix).length;
}

export function getInputData(input) {
  return new Matrix(input.split('\n').map(line => line.split('').map(el => +el)));
}

function getStartPositions(matrix) {
  const startPositions = [];

  for (let row = 0; row < matrix.getHeight(); row++) {
    for (let column = 0; column < matrix.getWidth(); column++) {
      if (matrix.getElement({ row, column }).value === START) {
        startPositions.push({ start: { row, column }, current: { row, column } });
      }
    }
  }

  return startPositions;
}

function buildAllPaths(matrix) {
  const queue = getStartPositions(matrix);

  for (let i = START + 1; i <= END; i++) {
    const count = queue.length;

    for (let j = 0; j < count; j++) {
      const { start, current } = queue.shift();

      const neighbors = getFilteredNeighbors(i, current, neighborDirections, matrix);

      for (const neighbor of neighbors) {
        queue.push({ start, current: neighbor });
      }
    }
  }

  return queue;
}

function filterUniquePaths(paths) {
  const uniqueHelper = new Set();
  const result = [];

  for (const { start, current } of paths) {
    if (!uniqueHelper.has(JSON.stringify([start, current]))) {
      result.push({ start, current });
    }

    uniqueHelper.add(JSON.stringify([start, current]));
  }

  return result;
}
