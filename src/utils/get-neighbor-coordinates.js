import { DIRECTIONS } from '../constants/directions.js';

export function getNeighborCoordinates(direction, coordinates, shift = 1) {
  const { row, column } = coordinates;

  switch (direction) {
    case DIRECTIONS.Up:
      return { row: row - shift, column };
    case DIRECTIONS.Down:
      return { row: row + shift, column };
    case DIRECTIONS.Left:
      return { row, column: column - shift };
    case DIRECTIONS.LeftUp:
      return { row: row - shift, column: column - shift };
    case DIRECTIONS.LeftDown:
      return { row: row + shift, column: column - shift };
    case DIRECTIONS.Right:
      return { row: row, column: column + shift };
    case DIRECTIONS.RightUp:
      return { row: row - shift, column: column + shift };
    case DIRECTIONS.RightDown:
      return { row: row + shift, column: column + shift };
  }
}
