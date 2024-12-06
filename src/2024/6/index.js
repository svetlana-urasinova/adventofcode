import { input } from './input.js';
import { Matrix } from './../../classes/matrix.js';
import { DIRECTIONS } from '../../constants/directions.js';
import { getNeighborCoordinates } from '../../utils/get-neighbor-coordinates.js';

const GUARD = {
  [DIRECTIONS.Up]: '^',
  [DIRECTIONS.Down]: 'v',
  [DIRECTIONS.Left]: '<',
  [DIRECTIONS.Right]: '>',
};

const OBSTACLE = '#';

export function main() {
  const data = getInputData(input);

  const part1Answer = part1(data);
  const part2Answer = part2(data);

  return `
        <p>The guard will visit <span class="answer">${part1Answer}</span> distinct positions.</p>        
        <p>Answer to part 2: <span class="answer">${part2Answer}</span>.</p>        
    `;
}

export function part1(matrix) {
  let guardPosition = getInitialGuardPosition(matrix);

  let total = 0;

  while (true) {
    guardPosition = updateGuardPosition(guardPosition, matrix);

    if (!guardPosition) {
      // printMatrix(matrix);

      return total;
    }

    const coordinates = { row: guardPosition.row, column: guardPosition.column };

    const { data } = matrix.getElement(coordinates);

    if (!data.visited) {
      matrix.updateData(coordinates, { visited: true });

      total++;
    }
  }
}

export function part2(data) {
  return '(answer)';
}

export function getInputData(input) {
  const data = input.split('\n').map(line => line.split(''));

  return new Matrix(data);
}

function getInitialGuardPosition(matrix) {
  for (let row = 0; row < matrix.getHeight(); row++) {
    for (let column = 0; column < matrix.getWidth(); column++) {
      const guardDirection = Object.entries(GUARD).find(
        ([_, value]) => matrix.getElement({ row, column }).value === value
      )?.[0];

      if (guardDirection) {
        return { row, column, direction: guardDirection, visitedBefore: false };
      }
    }
  }

  throw new Error(`Cannot determine guard's position!`);
}

function updateGuardPosition(guardPosition, matrix) {
  const { row, column, direction } = guardPosition;

  const targetCoordinates = getNeighborCoordinates(direction, { row, column });

  const target = matrix.getElement(targetCoordinates);

  if (!target) {
    return null;
  }

  return target.value === OBSTACLE
    ? { row, column, direction: turnClockwise(direction), visitedBefore: !!target.data.visited }
    : { ...targetCoordinates, direction, visitedBefore: !!target.data.visited };
}

function turnClockwise(direction) {
  switch (direction) {
    case DIRECTIONS.Up:
      return DIRECTIONS.Right;
    case DIRECTIONS.Right:
      return DIRECTIONS.Down;
    case DIRECTIONS.Down:
      return DIRECTIONS.Left;
    case DIRECTIONS.Left:
      return DIRECTIONS.Up;
    default:
      throw new Error('Unsupported direction');
  }
}

function printMatrix(matrix) {
  for (let row = 0; row < matrix.getHeight(); row++) {
    let str = '';

    for (let column = 0; column < matrix.getWidth(); column++) {
      const element = matrix.getElement({ row, column });

      str += element.data.visited ? 'X' : element.value;
    }

    console.log(str);
  }
}
