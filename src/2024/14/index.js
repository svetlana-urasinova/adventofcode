import { input } from './input-example.js';

export function main() {
  const data = getInputData(input);

  const part1Answer = part1(data);
  const part2Answer = part2(data);

  return `
        <p>The safety factor be after exactly 100 seconds have elapsed is <span class="answer">${part1Answer}</span>.</p>        
        <p>${
          part2Answer
            ? `The fewest number of seconds that must elapse for the robots to display the Easter egg is <span class="answer">${part2Answer}</span>.`
            : 'The Easter egg is not found for the current data set.'
        }</p>        
    `;
}

export function part1(data) {
  const hashMap = createHashMap(data);

  const max = getHashMapMax(hashMap);

  let robots = [...data];

  for (let i = 0; i < 100; i++) {
    robots = updateRobots(robots, max, hashMap);
  }

  return calculateSafetyFactor(max, hashMap);
}

export function part2(data) {
  const hashMap = createHashMap(data);

  const max = getHashMapMax(hashMap);

  let robots = [...data];

  let counter = 1;

  while (true) {
    if (counter > 10000) {
      // to avoid infinite loop for an example
      break;
    }

    robots = updateRobots(robots, max, hashMap);

    if (checkForTriangle(max, hashMap)) {
      printHashMap(max, hashMap);

      return counter;
    }

    counter++;
  }
}

export function getInputData(input) {
  return input.split('\n').map(line => {
    const { row, column, vh, vv } = line.match(/p\=(?<column>\d+),(?<row>\d+)\sv\=(?<vh>-?\d+),(?<vv>-?\d+)/).groups;

    return {
      row: Number(row),
      column: Number(column),
      vh: Number(vh),
      vv: Number(vv),
    };
  });
}

function createHashMap(data) {
  const hashMap = {};

  for (const { row, column } of data) {
    const key = getKey(row, column);

    hashMap[key] = hashMap[key] === undefined ? 1 : ++hashMap[key];
  }

  return hashMap;
}

function getHashMapMax(hashMap) {
  const max = { row: 0, column: 0 };

  for (const key of Object.keys(hashMap)) {
    const { row, column } = parseKey(key);

    max.row = Math.max(max.row, row);
    max.column = Math.max(max.column, column);
  }

  return max;
}

function getKey(row, column) {
  return `${row}-${column}`;
}

function parseKey(key) {
  const [row, column] = key.split('-').map(el => +el);

  return { row, column };
}

function getUpdatedRow(row, vv, max) {
  return (row + vv + (max.row + 1)) % (max.row + 1);
}

function getUpdatedColumn(column, vh, max) {
  return (column + vh + (max.column + 1)) % (max.column + 1);
}

function updateRobots(robots, max, hashMap) {
  const robotsAmount = robots.length;

  for (let j = 0; j < robotsAmount; j++) {
    const robot = robots.shift();

    const updatedRow = getUpdatedRow(robot.row, robot.vv, max);
    const updatedColumn = getUpdatedColumn(robot.column, robot.vh, max);

    move(robot.row, robot.column, updatedRow, updatedColumn, hashMap);

    robots.push({ row: updatedRow, column: updatedColumn, vh: robot.vh, vv: robot.vv });
  }

  return robots;
}

function move(row, column, updatedRow, updatedColumn, hashMap) {
  const updatedKey = getKey(updatedRow, updatedColumn);

  hashMap[getKey(row, column)]--;
  hashMap[updatedKey] = hashMap[updatedKey] === undefined ? 1 : ++hashMap[updatedKey];
}

function printHashMap(max, hashMap) {
  let str = '';

  for (let row = 0; row <= max.row; row++) {
    for (let column = 0; column <= max.column; column++) {
      const key = getKey(row, column);

      str += hashMap[key] > 0 ? hashMap[key] : '.';
    }

    str += '\n';
  }

  console.log(str);
}

function calculateSafetyFactor(max, hashMap) {
  const quadrants = new Array(4).fill(0);

  const middle = getMiddle(max);

  for (const key of Object.keys(hashMap)) {
    if (hashMap[key] === 0) {
      continue;
    }

    const { row, column } = parseKey(key);

    const quadrantIndex = getQuadrantIndex(row, column, middle);

    if (quadrantIndex > -1) {
      quadrants[quadrantIndex] += hashMap[key];
    }
  }

  return quadrants.reduce((totalScore, quadrantScore) => totalScore * quadrantScore, 1);
}

function getQuadrantIndex(row, column, middle) {
  if (row === middle.row || column === middle.column) {
    return -1;
  }

  return (row < middle.row ? 0 : 1) + (column < middle.column ? 0 : 2);
}

function getMiddle(max) {
  return { row: Math.ceil(max.row / 2), column: Math.ceil(max.column / 2) };
}

function checkRow(row, start, end, hashMap) {
  for (let column = start; column <= end; column++) {
    const key = getKey(row, column);

    if (hashMap[key] === 0) {
      return false;
    }
  }

  return true;
}

function checkForTriangle(max, hashMap) {
  for (let row = 3; row <= max.row; row++) {
    let currentLength = 0;

    for (let column = 0; column <= max.column; column++) {
      currentLength = hashMap[getKey(row, column)] > 0 ? currentLength + 1 : 0;

      if (currentLength === 7 && !hashMap[getKey(row, column + 1)]) {
        const middle = column - 3;

        if (
          checkRow(row - 1, middle - 2, middle + 2, hashMap) &&
          checkRow(row - 2, middle - 1, middle + 1, hashMap) &&
          checkRow(row - 3, middle, middle, hashMap)
        ) {
          return true;
        }
      }
    }
  }

  return false;
}
