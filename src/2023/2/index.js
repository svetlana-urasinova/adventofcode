import { input } from './input.js';

const COLORS = ['red', 'green', 'blue'];

export function main() {
  const data = getInputData(input);

  const part1Answer = part1(data);
  const part2Answer = part2(data);

  return `
  <p>The sum of the IDs of all possible games is <span class="answer">${part1Answer}</span>.</p>        
  <p>The sum of the power of the minumum sets of cubes is <span class="answer">${part2Answer}</span>.</p>        
  `;
}

export function part1(data) {
  const bag = { red: 12, green: 13, blue: 14 }

  let result = 0;

  for (const game of data) {
    let isGamePossible = true;

    let i = 0;

    while (i < game.steps.length && isGamePossible) {
      for (const color of COLORS) {
        if (game.steps[i][color] > bag[color]) {
          isGamePossible = false;
          break;
        }
      }

      i++;
    }

    if (isGamePossible) {
      result += game.id;
    }
  }

  return result;
}

export function part2(data) {
  const result = [];

  for (const game of data) {
    const minimumSet = getEmptySet();

    for (const step of game.steps) {
      for (const color of COLORS) {
        if (step[color] > minimumSet[color]) {
          minimumSet[color] = step[color];
        }
      }
    }

    result.push(minimumSet);
  }

  return result.reduce((sum, set) => sum + COLORS.reduce((power, color) => power * set[color], 1), 0)
}

export function getInputData(data) {
  return data.split("\n").map(line => {
    const { id, record } = line.match(/^Game\s(?<id>\d+):\s(?<record>.+)$/).groups;

    const steps = record.split(";").map(step => {
      const cubesEntries = step.split(",");

      const result = getEmptySet();

      for (const entry of cubesEntries) {
        for (const color of COLORS) {
          if (entry.endsWith(color)) {
            result[color] += parseInt(entry);
            break;
          }
        }
      }

      return result;
    });

    return { id: Number(id), steps }
  })
}

function getEmptySet() {
  return COLORS.reduce((acc, color) => ({ ...acc, [color]: 0 }), {});
}