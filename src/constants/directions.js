import { COLORS, getColorWithIntersection } from '../vizualisation/colors/colors.js';

export const DIRECTIONS = {
  Up: 'up',
  Down: 'down',
  Left: 'left',
  LeftUp: 'left-up',
  LeftDown: 'left-down',
  Right: 'right',
  RightUp: 'right-up',
  RightDown: 'right-down',
};

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
