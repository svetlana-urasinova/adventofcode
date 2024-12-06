import { input } from './input.js';
import { Matrix } from './../../classes/matrix.js';
import { DIRECTIONS } from '../../constants/directions.js';
import { turnClockwise } from '../../utils/directions.js';
import { getNeighborCoordinates } from '../../utils/get-neighbor-coordinates.js';

const GUARD = {
  [DIRECTIONS.Up]: '^',
  [DIRECTIONS.Down]: 'v',
  [DIRECTIONS.Left]: '<',
  [DIRECTIONS.Right]: '>',
};

const OBSTACLE = '#';
const NEW_OBSTACLE = 'o';
const EMPTY = '.';

export function main() {
  const part1Answer = part1(input);
  const part2Answer = part2(input);

  return `
        <p>The guard will visit <span class="answer">${part1Answer}</span> distinct positions.</p>        
        <p>The number of possible infinite loops is <span class="answer">${part2Answer}</span>.</p>        
    `;
}

export function part1(input) {
  const matrix = getInputData(input);

  makeGuardMove(matrix);

  let total = 0;

  for (let i = 0; i < matrix.getWidth() * matrix.getHeight(); i++) {
    const coordinates = matrix.getCoordinatesByIndex(i);

    if (!!matrix.getElement(coordinates).data.visited) {
      total++;
    }
  }

  return total;
}

export function part2(input) {
  console.time();

  const matrix = getInputData(input);

  let total = 0;

  for (let i = 0; i < matrix.getWidth() * matrix.getHeight(); i++) {
    const newObstacleCoordinates = matrix.getCoordinatesByIndex(i);

    const { value } = matrix.getElement(newObstacleCoordinates);

    if (value !== EMPTY) {
      continue;
    }

    try {
      matrix.updateValue(newObstacleCoordinates, NEW_OBSTACLE);

      makeGuardMove(matrix);
    } catch (error) {
      total++;
    } finally {
      // reseting the matrix

      matrix.updateValue(newObstacleCoordinates, EMPTY);

      matrix.clearAllData();
    }
  }

  console.timeEnd();

  return total;
}

export function getInputData(input) {
  const data = input.split('\n').map(line => line.split(''));

  return new Matrix(data);
}

function makeGuardMove(matrix) {
  let position = getInitialGuardPosition(matrix);

  while (true) {
    position = updateGuardPosition(position, matrix);

    if (!position) {
      return;
    }
  }
}

function getInitialGuardPosition(matrix) {
  for (let row = 0; row < matrix.getHeight(); row++) {
    for (let column = 0; column < matrix.getWidth(); column++) {
      const guardDirection = Object.entries(GUARD).find(
        ([_, value]) => matrix.getElement({ row, column }).value === value
      )?.[0];

      if (guardDirection) {
        return { row, column, direction: guardDirection };
      }
    }
  }

  throw new Error(`Cannot determine guard's initial position!`);
}

function updateGuardPosition(guardPosition, matrix) {
  const { row, column, direction } = guardPosition;

  const targetCoordinates = getNeighborCoordinates(direction, { row, column });

  const target = matrix.getElement(targetCoordinates);

  if (!target) {
    return null;
  }

  if (target.data.visited?.includes(direction)) {
    throw new Error('Oh no, the guard got in the infinite loop!');
  }

  if (isObstacle(target.value)) {
    return { row, column, direction: turnClockwise(direction) };
  } else {
    matrix.updateData(targetCoordinates, { visited: [...(target.data.visited || []), direction] });

    return { ...targetCoordinates, direction };
  }
}

function isObstacle(value) {
  return value === OBSTACLE || value === NEW_OBSTACLE;
}
