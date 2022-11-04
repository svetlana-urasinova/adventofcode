import { input } from "./input.js";

export function main() {
  const part1Answer = part1(input);
  const part2Answer = part2(input);

  return `
    <p>Without aiming you'll get <span class="answer">${part1Answer}</span> if you multiply your final horizontal position by your final depth.</p>
    <p>With aiming you'll get <span class="answer">${part2Answer}</span> if you multiply your final horizontal position by your final depth.</p>    
  `;
}

export function part1(input) {
  return findPosition(input);
}

export function part2(input) {
  return findAimedPosition(input);
}

function findPosition(input) {
  const inputData = getInputData(input);

  const currentPosition = inputData.reduce((position, instruction) => {
    const { direction, steps } = parseInstruction(instruction);

    direction === 'forward' ? position.x += steps
      : position.y += direction === 'down' ? steps : -1 * steps
    return position;
  }, { x: 0, y: 0 });

  return currentPosition.x * currentPosition.y;
}

function findAimedPosition(input) {
  const inputData = getInputData(input);

  const currentPosition = inputData.reduce((position, instruction) => {
    const { direction, steps } = parseInstruction(instruction);

    if (direction === 'forward') {
      position.x += steps;
      position.y += position.aim * steps;
    } else {
      position.aim += direction === 'down' ? steps : -1 * steps
    }
    return position;
  }, { x: 0, y: 0, aim: 0 });

  return currentPosition.x * currentPosition.y;
}

function getInputData(input) {
  return input.trim().split("\n");
}

function parseInstruction(instruction) {
  const [direction, steps] = instruction.split(' ');
  return { direction, steps: Number(steps) };
}