import { input } from './input.js';
import { Matrix } from '../../classes/matrix.js';

const EMPTY = '.';

export function main() {
  const part1Answer = part1(input);
  const part2Answer = part2(input);

  return `
        <p><span class="answer">${part1Answer}</span> unique locations within the bounds of the map contain an antinode.</p>        
        <p>Answer to part 2: <span class="answer">${part2Answer}</span>.</p>        
    `;
}

export function part1(input) {
  const matrix = getInputData(input);

  const antennas = getAntennas(matrix);

  let total = 0;

  for (const key in antennas) {
    const pairs = getAllPossiblePairs(antennas[key]);

    for (const pair of pairs) {
      const antinodes = getAntinodes(pair);

      antinodes.forEach(antinode => {
        const element = matrix.getElement(antinode);

        if (element) {
          if (!element.data.antinode) {
            matrix.updateData(antinode, { antinode: true });

            total++;
          }
        }
      });
    }
  }

  return total;
}

export function part2(input) {
  return '(answer)';
}

export function getInputData(input) {
  return new Matrix(input.split('\n').map(line => line.split('')));
}

export function getAntennas(matrix) {
  const antennas = {};

  for (let i = 0; i < matrix.getHeight(); i++) {
    for (let j = 0; j < matrix.getWidth(); j++) {
      const { value } = matrix.getElement({ row: i, column: j });

      if (value !== EMPTY) {
        antennas[value] = [...(antennas[value] || []), { row: i, column: j }];
      }
    }
  }

  return antennas;
}

function getAllPossiblePairs(antennas) {
  const pairs = [];

  for (let i = 0; i < antennas.length; i++) {
    for (let j = i + 1; j < antennas.length; j++) {
      pairs.push([antennas[i], antennas[j]]);
    }
  }

  return pairs;
}

function getAntinodes(pair) {
  const [antenna1, antenna2] = pair;

  return [
    { row: 2 * antenna1.row - antenna2.row, column: 2 * antenna1.column - antenna2.column },
    { row: 2 * antenna2.row - antenna1.row, column: 2 * antenna2.column - antenna1.column },
  ];
}
