import { input } from './input.js';

const SEARCH = 'XMAS';

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
        <p>Word &laquo;XMAS&raquo; appears <span class="answer">${part1Answer}</span> times.</p>        
        <p><span class="answer">${part2Answer}</span></p>        
    `;
}

export function part1(data) {
  let total = 0;

  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data[i].length; j++) {
      total += checkAllDirections(data, i, j).length;
    }
  }

  return total;
}

export function part2(data) {
  return '';
}

export function getInputData(data) {
  return data.split('\n').map(line => line.split(''));
}

function checkAllDirections(matrix, row, column) {
  return Object.values(DIRECTIONS).filter(direction => checkDirection(matrix, row, column, direction));
}

function checkDirection(matrix, row, column, direction) {
  let str = matrix[row]?.[column];

  if (!str || !SEARCH.startsWith(str)) {
    return false;
  }

  let currentRow = row;
  let currentColumn = column;

  for (let i = 1; i < SEARCH.length; i++) {
    const neighborCoordinates = getNeighborCoordinates(currentRow, currentColumn, direction);

    const currentChar = getChar(matrix, neighborCoordinates);

    if (!currentChar) {
      return false;
    }

    str += currentChar;

    if (!SEARCH.startsWith(str)) {
      return false;
    }

    currentRow = neighborCoordinates.row;
    currentColumn = neighborCoordinates.column;
  }

  return str === SEARCH;
}

function getNeighborCoordinates(row, column, direction) {
  switch (direction) {
    case DIRECTIONS.Top:
      return { row: [row - 1], column };
    case DIRECTIONS.Bottom:
      return { row: row + 1, column };
    case DIRECTIONS.Left:
      return { row, column: column - 1 };
    case DIRECTIONS.LeftTop:
      return { row: row - 1, column: column - 1 };
    case DIRECTIONS.LeftBottom:
      return { row: row + 1, column: column - 1 };
    case DIRECTIONS.Right:
      return { row: row, column: column + 1 };
    case DIRECTIONS.RightTop:
      return { row: row - 1, column: column + 1 };
    case DIRECTIONS.RightBottom:
      return { row: row + 1, column: column + 1 };
  }
}

function getChar(matrix, coordinates) {
  return matrix[coordinates.row]?.[coordinates.column];
}
