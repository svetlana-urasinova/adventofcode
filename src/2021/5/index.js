import { input } from './input.js';

export function main() {
  const part1Answer = part1(input);
  const part2Answer = part2(input);

  return `
    <p>Without diagonal lines at least two lines overlap in <span class="answer">${part1Answer}</span> points.</p>
    <p>With diagonal lines at least two lines overlap in <span class="answer">${part2Answer}</span> points.</p>
  `;
}

export function part1(input) {
  return countOverlaps(input);
}

export function part2(input) {
  return countOverlaps(input, true);
}

function getDataInput(input) {
  return input.trim().split("\n").map(str => {
    const [start, end] = str.split(/\s\-\>\s/).map(el => {
      const [x, y] = el.split(",").map(num => Number(num));

      return { x, y }
    });

    return { start, end }
  });
}

function countOverlaps(input, drawDiagonal = false) {
  const dataInput = getDataInput(input);
  let canvas = {}

  for (let line of dataInput) {
    const { start, end } = line;
    const points = drawLine(start, end, drawDiagonal);
    for (let point of points) {
      canvas[point] = canvas[point] ? ++canvas[point] : 1;
    }

  }

  return Object.values(canvas).filter(value => value > 1).length;
}

function drawLine(start, end, drawDiagonal = false) {
  switch (true) {
    case start.x === end.x:
      return drawHorizontalLine(start, end);
    case start.y === end.y:
      return drawVerticalLine(start, end);
    case drawDiagonal && Math.abs(start.x - end.x) === Math.abs(start.y - end.y):
      return drawDiagonalLine(start, end);
    default:
      return [];
  }

}

function drawHorizontalLine(start, end) {
  const points = [];

  const diff = start.y < end.y ? 1 : -1;
  let counter = start.y;

  while (counter - diff !== end.y) {
    points.push(`${start.x},${counter}`);
    counter += diff;
  }

  return points;
}

function drawVerticalLine(start, end) {
  const points = []

  const diff = start.x < end.x ? 1 : -1;
  let counter = start.x;

  while (counter - diff !== end.x) {
    points.push(`${counter},${start.y}`);
    counter += diff;
  }

  return points;
}

function drawDiagonalLine(start, end) {
  const points = [];

  const diff1 = start.x < end.x ? 1 : -1;
  const diff2 = start.y < end.y ? 1 : -1;

  let counter1 = start.x;
  let counter2 = start.y;

  while (counter1 - diff1 !== end.x) {
    points.push(`${counter1},${counter2}`);
    counter1 += diff1;
    counter2 += diff2;
  }

  return points;
}