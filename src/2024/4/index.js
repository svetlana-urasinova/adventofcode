import { Matrix } from '../../classes/matrix.js';
import { DIRECTIONS } from '../../constants/directions.js';
import { getNeighborCoordinates } from '../../utils/get-neighbor-coordinates.js';
import { input } from './input.js';

export function main() {
  const data = getInputData(input);

  const part1Answer = part1(data);
  const part2Answer = part2(data);

  return `
        <p>A word &laquo;XMAS&raquo; appears <span class="answer">${part1Answer}</span> times.</p>        
        <p>An X-MAS appears <span class="answer">${part2Answer}</span> times.</p>        
    `;
}

export function part1(data) {
  const matrix = new Matrix(data);

  const search = 'XMAS';

  let total = 0;

  for (let i = 0; i < matrix.getHeight(); i++) {
    for (let j = 0; j < matrix.getWidth(); j++) {
      total += checkMatchByAnyDirection({ row: i, column: j }, search, matrix).length;
    }
  }

  return total;
}

export function part2(data) {
  const matrix = new Matrix(data);

  const search = 'MAS';

  let total = 0;

  for (let i = 0; i < matrix.getHeight(); i++) {
    for (let j = 0; j < matrix.getWidth(); j++) {
      if (checkDiagonalMatch({ row: i, column: j }, search, matrix)) {
        total++;
      }
    }
  }

  return total;
}

export function getInputData(data) {
  return data.split('\n').map(line => line.split(''));
}

export function checkMatchByAnyDirection(coordinates, search, matrix) {
  return Object.values(DIRECTIONS).filter(direction => matrix.checkMatch(direction, coordinates, search));
}

export function checkDiagonalMatch(coordinates, search, matrix) {
  // Checks if a given string can be found in the matrix
  // along both diagonals passing through the specified coordinates
  // using those coordinates as the center

  const mid = Math.floor(search.length / 2);

  if (
    matrix.checkMatch(DIRECTIONS.RightDown, getNeighborCoordinates(DIRECTIONS.LeftUp, coordinates, mid), search) ||
    matrix.checkMatch(DIRECTIONS.LeftUp, getNeighborCoordinates(DIRECTIONS.RightDown, coordinates, mid), search)
  ) {
    return (
      matrix.checkMatch(DIRECTIONS.LeftDown, getNeighborCoordinates(DIRECTIONS.RightUp, coordinates, mid), search) ||
      matrix.checkMatch(DIRECTIONS.RightUp, getNeighborCoordinates(DIRECTIONS.LeftDown, coordinates, mid), search)
    );
  }
}
