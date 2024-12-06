import { input } from './input-example.js';
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
const EMPTY = '.';

export function main() {
  const part1Answer = part1(input);
  const part2Answer = part2(input);

  return `
        <p>The guard will visit <span class="answer">${part1Answer}</span> distinct positions.</p>        
        <p>Answer to part 2: <span class="answer">${part2Answer}</span>.</p>        
    `;
}

export function part1(input) {
  const matrix = getInputData(input);

  let guardPosition = getInitialGuardPosition(matrix);

  makeGuardMove(guardPosition, matrix);

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
  // const matrix = getInputData(input);
  // let guardPosition = getInitialGuardPosition(matrix);
  // let total = 0;
  // for (let i = 0; i < matrix.getWidth() * matrix.getHeight(); i++) {
  //   const newObstacleCoordinates = matrix.getCoordinatesByIndex(i);
  //   const { value } = matrix.getElement(newObstacleCoordinates);
  //   if (value !== EMPTY) {
  //     continue;
  //   }
  //   matrix.updateValue(newObstacleCoordinates, OBSTACLE);
  // }
}

export function getInputData(input) {
  const data = input.split('\n').map(line => line.split(''));

  return new Matrix(data);
}

function makeGuardMove(guardPosition, matrix) {
  let position = { ...guardPosition };

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

  if (target.value === OBSTACLE) {
    return { row, column, direction: turnClockwise(direction) };
  } else {
    matrix.updateData(targetCoordinates, { visited: [...(target.data.visited || []), direction] });

    return { ...targetCoordinates, direction };
  }
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
