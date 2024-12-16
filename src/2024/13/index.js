import { input } from './input.js';

const BUTTON_PRESS_LIMIT = 100;
const A_COST = 3;
const B_COST = 1;
const POSITION_DIFF = 10000000000000;

export function main() {
  const data = getInputData(input);

  const part1Answer = part1(data);
  const part2Answer = part2(data);

  return `
        <p>The fewest tokens you would have to spend to win all possible prizes is <span class="answer">${part1Answer}</span>.</p>        
        <p>Answer to part 2: <span class="answer">${part2Answer}</span>.</p>        
    `;
}

export function part1(data) {
  let total = 0;

  for (const machine of data) {
    const { a, b } = solveEquationSystem(machine);

    if (isValidSolution(a) && isValidSolution(b)) {
      total += a * A_COST + b * B_COST;
    }
  }

  return total;
}

export function part2(data) {
  let total = 0;

  for (const machine of data) {
    const { a, b } = solveEquationSystem({
      ...machine,
      prize: { x: machine.prize.x + POSITION_DIFF, y: machine.prize.y + POSITION_DIFF },
    });

    if (isValidSolution(a, true) && isValidSolution(b, true)) {
      total += a * A_COST + b * B_COST;
    }
  }

  return total;
}

function solveEquationSystem(machine) {
  const { coefficientA, coefficientB, prize } = machine;

  const a =
    (prize.x * coefficientB.y - prize.y * coefficientB.x) /
    (coefficientA.x * coefficientB.y - coefficientA.y * coefficientB.x);

  if (!Number.isInteger(a)) {
    return { a: null, b: null };
  }

  const b = (prize.x - a * coefficientA.x) / coefficientB.x;

  return { a, b };
}

export function getInputData(input) {
  return input.split('\n\n').map(machine => {
    const [coefficientA, coefficientB, prize] = machine.split('\n').map(line => {
      const { x, y } = line.match(/.*X.(?<x>\d+),\sY.(?<y>\d+)/).groups;

      return { x: Number(x), y: Number(y) };
    });

    return { coefficientA, coefficientB, prize };
  });
}

function isValidSolution(n, skipPressLimit = false) {
  if (!skipPressLimit && n > BUTTON_PRESS_LIMIT) {
    return false;
  }

  return n !== null;
}
