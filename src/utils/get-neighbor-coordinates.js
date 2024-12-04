import { DIRECTIONS } from '../constants/directions.js';

export function getNeighborCoordinates(direction, coordinates, shift = 1) {
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
