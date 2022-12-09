import { input } from './input.js';

export function main() {
  const part1Answer = part1(input);
  const part2Answer = part2(input);

  return `
        <p>The tail of a 2 knots rope visit at least once <span class="answer">${part1Answer}</span> positions.</p>        
        <p>The tail of a 10 knots rope visit at least once <span class="answer">${part2Answer}</span> positions.</p>        
    `;
}

export function part1(input) {
  const instructions = getInputData(input);
  const visited = new Set();
  const knots = new Array(2).fill(0).map(_ => ({ x: 0, y: 0 }));

  return runInstructions(instructions, knots, visited);
}

export function part2(input) {
  const instructions = getInputData(input);
  const visited = new Set();
  const knots = new Array(10).fill(0).map(_ => ({ x: 0, y: 0 }));

  return runInstructions(instructions, knots, visited);
}

export function getInputData(data) {
  return data.split("\n").map(line => {
    const [direction, steps] = line.split(" ");

    return { direction, steps: Number(steps) }
  });
}

function runInstructions(instructions, knots, visited) {
  if (instructions.length === 0) {
    return visited.size;
  }

  const instruction = instructions.shift();
  const updatedData = move(instruction, knots, visited);

  return runInstructions(instructions, updatedData.knots, updatedData.visited);
}

function move(instruction, knots, visited) {
  const { direction } = instruction;
  const { major, minor } = getAxes(direction);

  const steps = getSteps(direction, instruction.steps);
  const updatedKnots = [...knots]
  const head = { ...updatedKnots[0] };

  for (let i = Math.min(head[major], head[major] + steps); i < Math.max(head[major], head[major] + steps); i++) {
    updatedKnots[0][major] += steps < 0 ? -1 : 1;

    for (let j = 1; j < knots.length; j++) {
      const dMajor = updatedKnots[j][major] > updatedKnots[j - 1][major] ? -1 : 1;
      const dMinor = updatedKnots[j][minor] > updatedKnots[j - 1][minor] ? -1 : 1;

      if (!isTouching(updatedKnots[j - 1], updatedKnots[j])) {
        if (updatedKnots[j][minor] !== updatedKnots[j - 1][minor]) {
          updatedKnots[j][minor] += dMinor;
        }

        if (updatedKnots[j - 1][major] !== updatedKnots[j][major]) {
          updatedKnots[j][major] += dMajor;
        };
      }
    }

    const tail = updatedKnots[updatedKnots.length - 1];
    visited.add(`${tail.x}, ${tail.y}`);
  }

  return { knots: updatedKnots, visited }
}

function getAxes(direction) {
  switch (direction) {
    case 'U':
    case 'D':
      return { major: 'x', minor: 'y' }
    case 'L':
    case 'R':
      return { major: 'y', minor: 'x' }
  }
}

function getSteps(direction, steps) {
  switch (direction) {
    case 'U':
    case 'L':
      return steps * -1;
    case 'D':
    case 'R':
      return steps;
  }
}

function isTouching(head, tail) {
  return Math.abs(head.x - tail.x) < 2 && Math.abs(head.y - tail.y) < 2;
}