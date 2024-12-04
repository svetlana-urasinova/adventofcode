import { COLORS, getColorWithIntersection } from '../vizualisation/colors/colors.js';

export const DIRECTIONS = {
  Top: 'top',
  Bottom: 'bottom',
  Left: 'left',
  LeftTop: 'left-top',
  LeftBottom: 'left-bottom',
  Right: 'right',
  RightTop: 'right-top',
  RightBottom: 'right-bottom',
};

export function getColorByDirection(direction, colors) {
  switch (direction) {
    case DIRECTIONS.Left:
    case DIRECTIONS.Right:
      return getColorWithIntersection(COLORS.Green, colors);
    case DIRECTIONS.Top:
    case DIRECTIONS.Bottom:
      return getColorWithIntersection(COLORS.Blue, colors);
    case DIRECTIONS.LeftTop:
    case DIRECTIONS.LeftBottom:
    case DIRECTIONS.RightTop:
    case DIRECTIONS.RightBottom:
      return getColorWithIntersection(COLORS.Red, colors);
  }
}
