import { input } from './input.js';

const NEIGHBOR_DIRS = [{ x: -1, y: 0 }, { x: 1, y: 0 }, { x: 0, y: -1 }, { x: 0, y: 1 }, { x: -1, y: -1 }, { x: 1, y: -1 }, { x: -1, y: 1 }, { x: 1, y: 1 }];

export function main() {
  const data = getInputData(input);

  const part1Answer = part1(data);
  const part2Answer = part2(data);

  return `
        <p>The sum of all of the part numbers in the engine schematic is <span class="answer">${part1Answer}</span>.</p>        
        <p>The sum of all of the gear ratios in the engine schematic is <span class="answer">${part2Answer}</span>.</p>        
    `;
}

export function part1(data) {
  const partNumbers = getPartNumbers(data);

  return partNumbers.reduce((sum, num) => sum + num.value, 0);
}

export function part2(data) {
  const GEAR_NEIGHBORS_AMOUNT = 2;

  const partNumbers = getPartNumbers(data);

  const possibleGears = {};

  for (const number of partNumbers) {
    const { start, end } = number.x;

    for (let x = start; x <= end; x++) {
      const neighbors = getNeighbors({ x, y: number.y }, data);

      for (const neighbor of neighbors) {
        if (isGearSymbol(neighbor.value)) {
          const currentGearIndex = `${neighbor.x}-${neighbor.y}`;

          if (!possibleGears[currentGearIndex]) {
            possibleGears[currentGearIndex] = new Set();
          }

          possibleGears[currentGearIndex].add(number);
        }
      }
    }
  }

  const gears = Object.values(possibleGears).filter(partNumbersNeighbors => partNumbersNeighbors.size === GEAR_NEIGHBORS_AMOUNT);

  return gears.reduce((sum, gear) => sum + calculateGearRatio(gear), 0);
}

export function getInputData(data) {
  return data.split("\n");
}

function getNeighbors(coords, grid) {
  const { x, y } = coords;

  const neighbors = [];

  for (const dir of NEIGHBOR_DIRS) {
    const neighborX = x + dir.x;
    const neighborY = y + dir.y;

    if (neighborX > -1 && neighborX < grid[0].length && neighborY > -1 && neighborY < grid.length) {
      neighbors.push({ value: grid[neighborY][neighborX], x: neighborX, y: neighborY });
    }
  }

  return neighbors;
}

/**
 * Return all numbers in grid with coords
 * @param {string[]} grid 
 * @returns { { value: number, y: number, x: { start: number, end: number }}[] }
 */
function parseNumbers(grid) {
  const numbers = [];

  let x = 0;
  let start;

  for (let y = 0; y < grid.length; y++) {
    x = 0;

    while (x < grid[y].length) {
      if (!isNumber(grid[y][x])) {
        x++;

        continue;
      }

      start = x;

      while (isNumber(grid[y][x]) && x < grid[y].length) {
        x++;
      }

      numbers.push({ value: Number(grid[y].substring(start, x)), y, x: { start, end: x - 1 } })
    }
  }

  return numbers;
}

function getPartNumbers(data) {
  const result = [];

  const numbers = parseNumbers(data);

  for (const number of numbers) {
    const { start, end } = number.x;

    let x = start;

    let isPartNumber = false;

    while (!isPartNumber && x <= end) {
      const neighbors = getNeighbors({ x, y: number.y }, data);

      if (hasSymbolNeighbor(neighbors)) {
        isPartNumber = true;
      }

      x++;
    }

    if (isPartNumber) {
      result.push(number);
    }
  }

  return result;
}

function hasSymbolNeighbor(neighbors) {
  for (const neighbor of neighbors) {
    if (isSymbol(neighbor.value)) {
      return true;
    }
  }

  return false;
}

function isEmpty(char) {
  return char === '.';
}

function isNumber(char) {
  return /^\d$/.test(char);
}

function isSymbol(char) {
  return !isEmpty(char) && !isNumber(char);
}

function isGearSymbol(char) {
  return char === '*';
}

function calculateGearRatio(gear) {
  let gearRatio = 1;

  for (const num of Array.from(gear)) {
    gearRatio *= num.value;
  }

  return gearRatio;
}