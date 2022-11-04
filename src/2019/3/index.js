import { input } from './input.js';

export function main() {
  const part1Answer = part1(input);
  const part2Answer = part2(input);

  return `
          <p>The Manhattan distance from the central port to the closest intersection is <span class="answer">${part1Answer}</span>.</p>
          <p>The fewest combined steps the wires must take to reach an intersection is <span class="answer">${part2Answer}</span>.</p>        
          `;
}

export function part1(input) {
  const inputData = getInputData(input);

  const wire1 = getWirePath(inputData[0]);
  const wire2 = getWirePath(inputData[1]);
  const intersections = getIntersections(wire1, wire2);

  return intersections.reduce((minDistance, intersection) => {
    const currentDistance = getDistanceFromZero(intersection.x, intersection.y);
    return Math.min(currentDistance, minDistance)
  }, Infinity);
}

export function part2(input) {
  const inputData = getInputData(input);

  const wire1 = getWirePath(inputData[0]);
  const wire2 = getWirePath(inputData[1]);
  const intersections = getIntersections(wire1, wire2);

  return Math.min(...intersections.map(intersection => intersection.steps));
}

function getInputData(input) {
  return input.trim().split("\n").map(line => line.split(","))
}

function getWirePath(inputDataLine) {
  const path = {};
  const pointer = { x: 0, y: 0 }
  let currentSteps = 0;

  const updatePath = counter => {
    if (!path[`${pointer.x},${pointer.y}`]) {
      path[`${pointer.x},${pointer.y}`] = currentSteps + counter;
    }
  }

  for (let instruction of inputDataLine) {
    const { direction, steps } = readInstruction(instruction);

    switch (direction) {
      case 'L':
        for (let i = 1; i <= steps; i++) {
          pointer.x--;
          updatePath(i);
        }

        break;
      case 'R':
        for (let i = 1; i <= steps; i++) {
          pointer.x++;
          updatePath(i);
        }

        break;
      case 'U':
        for (let i = 1; i <= steps; i++) {
          pointer.y--;
          updatePath(i);
        }

        break;
      case 'D':
        for (let i = 1; i <= steps; i++) {
          pointer.y++;
          updatePath(i);
        }

        break;
    }

    currentSteps += steps;
  }

  return path;
}

function readInstruction(instruction) {
  const direction = instruction.substring(0, 1);
  const steps = Number(instruction.substring(1));

  return { direction, steps }
}

function getIntersections(path1, path2) {
  return Object.keys(path1).filter(key => path2[key]).map(coords => {
    const [x, y] = coords.split(",").map(val => Number(val));
    return { x, y, steps: path1[coords] + path2[coords] }
  })
}

function getDistanceFromZero(x, y) {
  return Math.abs(x) + Math.abs(y);
}