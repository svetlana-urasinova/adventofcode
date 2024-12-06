import { DIRECTIONS } from '../constants/directions.js';
import { COLORS, getColorWithIntersection } from '../vizualisation/colors/colors.js';

export function turnClockwise(direction) {
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

export function turnCounterClockwise(direction) {
  switch (direction) {
    case DIRECTIONS.Up:
      return DIRECTIONS.Left;
    case DIRECTIONS.Left:
      return DIRECTIONS.Down;
    case DIRECTIONS.Down:
      return DIRECTIONS.Right;
    case DIRECTIONS.Right:
      return DIRECTIONS.Up;
    default:
      throw new Error('Unsupported direction');
  }
}

export function getColorByDirection(direction, colors) {
  switch (direction) {
    case DIRECTIONS.Left:
    case DIRECTIONS.Right:
      return getColorWithIntersection(COLORS.Green, colors);
    case DIRECTIONS.Up:
    case DIRECTIONS.Down:
      return getColorWithIntersection(COLORS.Blue, colors);
    case DIRECTIONS.LeftUp:
    case DIRECTIONS.LeftDown:
    case DIRECTIONS.RightUp:
    case DIRECTIONS.RightDown:
      return getColorWithIntersection(COLORS.Red, colors);
  }
}
