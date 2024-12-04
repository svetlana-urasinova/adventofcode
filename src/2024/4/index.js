import { input } from './input.js';

const DIRECTIONS = {
  Top: 'top',
  Bottom: 'bottom',
  Left: 'left',
  LeftTop: 'left-top',
  LeftBottom: 'left-bottom',
  Right: 'right',
  RightTop: 'right-top',
  RightBottom: 'right-bottom',
};

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
  const search = 'XMAS';

  let total = 0;

  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data[i].length; j++) {
      total += checkMatch({ row: i, column: j }, data, search).length;
    }
  }

  return total;
}

export function part2(data) {
  const search = 'MAS';

  let total = 0;

  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data[i].length; j++) {
      if (checkDiagonalMatch({ row: i, column: j }, data, search)) {
        total++;
      }
    }
  }

  return total;
}

export function getInputData(data) {
  return data.split('\n').map(line => line.split(''));
}

function checkMatch(coordinates, matrix, search) {
  // Checks if a given string can be found in the matrix
  // starting from the specified coordinates in any direction

  return Object.values(DIRECTIONS).filter(direction => checkDirection(direction, coordinates, matrix, search));
}

function checkDiagonalMatch(coordinates, matrix, search) {
  // Checks if a given string can be found in the matrix
  // along both diagonals passing through the specified coordinates
  // using those coordinates as the center

  const mid = Math.floor(search.length / 2);

  if (
    checkDirection(
      DIRECTIONS.RightBottom,
      getNeighborCoordinates(DIRECTIONS.LeftTop, coordinates, mid),
      matrix,
      search
    ) ||
    checkDirection(DIRECTIONS.LeftTop, getNeighborCoordinates(DIRECTIONS.RightBottom, coordinates, mid), matrix, search)
  ) {
    return (
      checkDirection(
        DIRECTIONS.LeftBottom,
        getNeighborCoordinates(DIRECTIONS.RightTop, coordinates, mid),
        matrix,
        search
      ) ||
      checkDirection(
        DIRECTIONS.RightTop,
        getNeighborCoordinates(DIRECTIONS.LeftBottom, coordinates, mid),
        matrix,
        search
      )
    );
  }
}

function checkDirection(direction, coordinates, matrix, search) {
  // Checks if a given string can be found in the matrix,
  // starting from the specified coordinates,
  // moving in the specified direction

  let str = getChar(coordinates, matrix);

  if (!str || !search.startsWith(str)) {
    return false;
  }

  let currentCoordinates = { ...coordinates };

  for (let i = 1; i < search.length; i++) {
    currentCoordinates = getNeighborCoordinates(direction, currentCoordinates);

    const currentChar = getChar(currentCoordinates, matrix);

    if (!currentChar) {
      return false;
    }

    str += currentChar;

    if (!search.startsWith(str)) {
      return false;
    }
  }

  return str === search;
}

function getNeighborCoordinates(direction, coordinates, shift = 1) {
  const { row, column } = coordinates;

  switch (direction) {
    case DIRECTIONS.Top:
      return { row: row - shift, column };
    case DIRECTIONS.Bottom:
      return { row: row + shift, column };
    case DIRECTIONS.Left:
      return { row, column: column - shift };
    case DIRECTIONS.LeftTop:
      return { row: row - shift, column: column - shift };
    case DIRECTIONS.LeftBottom:
      return { row: row + shift, column: column - shift };
    case DIRECTIONS.Right:
      return { row: row, column: column + shift };
    case DIRECTIONS.RightTop:
      return { row: row - shift, column: column + shift };
    case DIRECTIONS.RightBottom:
      return { row: row + shift, column: column + shift };
  }
}

function getChar(coordinates, matrix) {
  return matrix[coordinates.row]?.[coordinates.column];
}
