import { input } from './input.js';

export function main() {
  const data = getInputData(input);

  const part1Answer = part1(data);
  const part2Answer = part2(data);

  return `
        <p>Sum of the risk levels of all low points is <span class="answer">${part1Answer}</span>.</p>        
        <p>The product of sizes of the three largest basins is <span class="answer">${part2Answer}</span>.</p>        
    `;
}

export function part1(data) {
  const lowPoints = findLowPoints(data);

  return lowPoints.reduce((acc, el) => acc + data[el.x][el.y] + 1, 0);
}

export function part2(data) {
  const lowPoints = findLowPoints(data);
  const basins = findBasins(data, lowPoints);
  const basinsSums = basins.map(el => el.reduce((acc, str) =>
    acc + str.reduce((sum, num) => sum + num, 0)
    , 0));

  return basinsSums.sort((a, b) => b - a)
    .slice(0, 3)
    .reduce((acc, el) => acc * el);
}

export function getInputData(data) {
  return data.split("\n").map(line => line.split('').map(char => +char));
}

function findLowPoints(data) {
  const lowPoints = data.map(el => new Array(el.length).fill(1));

  for (let i in lowPoints) {
    for (let j in lowPoints[i]) {
      const left = data[i][j - 1] ?? null;
      const top = data[i - 1] ? data[i - 1][j] ?? null : null;

      if (lowPoints[i][j] === 1) {
        if (left !== null) {
          if (data[i][j] >= left) {
            lowPoints[i][j] = 0;
          } else {
            lowPoints[i][j - 1] = 0;
          }
        }

        if (top !== null) {
          if (data[i][j] >= top) {
            lowPoints[i][j] = 0;
          } else {
            lowPoints[i - 1][j] = 0;
          }
        }
      }
    }
  }

  const res = [];
  lowPoints.forEach((el, i) => el.forEach((point, j) => {
    if (point === 1) { res.push({ x: i, y: j }); }
  }));
  return res;
}

function findBasin(coords, heights, basin = null) {
  const { x, y } = coords;

  if (basin === null) {
    basin = heights.map(el => new Array(el.length).fill(0));
  }

  basin[x][y] = 1;

  const new_neighbors = findNeigbors(x, y).filter(el => heights[el.x] !== undefined
    && heights[el.x][el.y] !== undefined
    && heights[el.x][el.y] !== 9
    && basin[el.x][el.y] === 0);

  if (new_neighbors.length > 0) {
    new_neighbors.forEach(el => {
      basin = findBasin(el, heights, basin);
    });
  }

  return basin;
}

function findBasins(heights, lowPoints) {
  const basins = [];

  lowPoints.forEach(coords => {
    basins.push(findBasin(coords, heights));
  });

  return basins;
}

function findNeigbors(x, y) {
  return [
    { x: x - 1, y },
    { x: x + 1, y },
    { x, y: y - 1 },
    { x, y: y + 1 }
  ]
}