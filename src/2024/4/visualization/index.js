import { Matrix } from '../../../classes/matrix.js';
import { DIRECTIONS } from '../../../constants/directions.js';
import { delay } from '../../../utils/delay.js';
import { getColorByDirection } from '../../../utils/directions.js';
import { getNeighborCoordinates } from '../../../utils/get-neighbor-coordinates.js';
import { ColoredTextBlock } from '../../../vizualisation/colored-text-block/colored-text-block.js';
import { COLORS } from '../../../vizualisation/colors/colors.js';
import { checkDiagonalMatch, checkMatchByAnyDirection, getInputData } from '../index.js';
import { input } from './../input-example.js';

const timeout = 100;

const block1 = new ColoredTextBlock('#block1');
const block2 = new ColoredTextBlock('#block2');

const data = getInputData(input);

const matrix = new Matrix(data);

const colors = [COLORS.Red, COLORS.Orange, COLORS.Yellow, COLORS.Green, COLORS.LightBlue, COLORS.Blue, COLORS.Purple];

window.onload = async () => {
  block1.setContent(input);
  block2.setContent(input);

  let index = 0;

  let diagonalMatchesCounter = 0;

  for (let i = 0; i < matrix.getHeight(); i++) {
    for (let j = 0; j < matrix.getWidth(); j++) {
      const coordinates = { row: i, column: j };

      // block 1
      block1.goToNextChar(index);

      const search1 = 'XMAS';

      const result1 = checkMatchByAnyDirection(coordinates, search1, matrix);

      if (result1.length) {
        for (const direction of result1) {
          paintInDirection(direction, coordinates, search1.length, block1);
        }
      }

      // block 2
      block2.goToNextChar(index);

      const search2 = 'MAS';

      const result2 = checkDiagonalMatch(coordinates, search2, matrix);

      if (result2) {
        paintDiagonalMatch(block2, coordinates, 'MAS', diagonalMatchesCounter);

        diagonalMatchesCounter++;
      }

      index++;

      await delay(timeout);
    }
  }

  block1.cleanChar(index - 1);
  block2.cleanChar(index - 1);
};

function paintDiagonalMatch(blockElement, coordinates, search, counter) {
  const { row, column } = coordinates;

  const mid = Math.floor(search.length / 2);

  paintInDirection(
    DIRECTIONS.RightDown,
    { row: row - mid, column: column - mid },
    search.length,
    blockElement,
    colors[counter % colors.length]
  );
  paintInDirection(
    DIRECTIONS.LeftDown,
    { row: row - mid, column: column + mid },
    search.length,
    blockElement,
    colors[counter % colors.length]
  );

  counter++;
}

function paintInDirection(direction, coordinates, shift, blockElement, color) {
  let currentCoordinates = { ...coordinates };

  for (let i = 0; i < shift; i++) {
    const index = matrix.getIndexByCoordinates(currentCoordinates);

    blockElement.cleanChar(index);

    if (color) {
      blockElement.paintChar(index, color);
    } else {
      const currentColors = Array.from(blockElement.getChar(index).classList).filter(color =>
        Object.values(COLORS).includes(color)
      );

      const colorByDirection = getColorByDirection(direction, currentColors);

      blockElement.paintChar(index, colorByDirection);
    }

    currentCoordinates = getNeighborCoordinates(direction, currentCoordinates);
  }
}
