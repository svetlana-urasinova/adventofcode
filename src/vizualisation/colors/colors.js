export const COLORS = {
  Red: 'red',
  Green: 'green',
  Blue: 'blue',
  Yellow: 'yellow',
  Purple: 'purple',
  LightBlue: 'light-blue',
  Orange: 'orange',
  White: 'white',
  Black: 'black',
};

export function getColorWithIntersection(color, colors) {
  const baseColors = getBaseColors([...colors, color]);

  switch (baseColors.length) {
    case 1:
      return baseColors[0];
    case 2:
      if (baseColors.includes(COLORS.Red)) {
        return baseColors.includes(COLORS.Green) ? COLORS.Yellow : COLORS.Purple;
      } else {
        return COLORS.LightBlue;
      }
    case 3:
      return COLORS.Orange;
    default:
      return null;
  }
}

export function getBaseColors(colors) {
  const baseColors = new Set();

  for (const color of colors) {
    switch (color) {
      case COLORS.Red:
      case COLORS.Green:
      case COLORS.Blue:
        baseColors.add(color);
        break;
      case COLORS.Yellow:
        baseColors.add(COLORS.Red);
        baseColors.add(COLORS.Green);
        break;
      case COLORS.LightBlue:
        baseColors.add(COLORS.Green);
        baseColors.add(COLORS.Blue);
        break;
      case COLORS.Purple:
        baseColors.add(COLORS.Red);
        baseColors.add(COLORS.Blue);
        break;
      case COLORS.Orange:
        baseColors.add(COLORS.Red);
        baseColors.add(COLORS.Green);
        baseColors.add(COLORS.Blue);
        break;
    }
  }

  return Array.from(baseColors);
}
