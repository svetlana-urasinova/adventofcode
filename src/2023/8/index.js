import { input } from './input.js';

export function main() {
  const data = getInputData(input);

  const part1Answer = part1(getInputData(input));
  const part2Answer = part2(getInputData(input));

  return `
        <p><span class="answer">${part1Answer}</span> steps are required to reach ZZZ.</p>        
        <p><span class="answer">${part2Answer}</span> steps are required to end up entirely on nodes that end in Z.</p>        
    `;
}

export function part1(data) {
  const { instructions, nodes } = data;

  let currentNode = nodes['AAA'];

  let counter = 0;

  while (currentNode.value !== 'ZZZ') {
    const currentInstruction = instructions[counter % instructions.length];

    currentNode = currentInstruction === 'L' ? nodes[currentNode.left] : nodes[currentNode.right];

    counter++;
  }

  return counter;
}

export function part2(data) {
  const { instructions, nodes } = data;

  const nodesToProcess = Object.keys(nodes).filter(key => key.endsWith('A'));

  const counters = [];

  let counter = 0;

  while (Object.keys(nodesToProcess).length > 0) {
    const currentInstruction = instructions[counter % instructions.length];

    const rowLength = nodesToProcess.length;

    for (let i = 0; i < rowLength; i++) {
      const currentNode = nodes[nodesToProcess.shift()];

      if (currentNode.value.endsWith('Z')) {
        if (counters[counters.length - 1] !== counter) {
          counters.push(counter);
        }
      } else {
        nodesToProcess.push(currentInstruction === 'L' ? currentNode.left : currentNode.right);
      }
    }

    counter++;
  }

  if (!counters.length) {
    return 0;
  }

  let lcm = counters[0];

  for (let i = 1; i < counters.length; i++) {
    lcm = findLCM(lcm, counters[i]);
  }

  return lcm;
}

export function getInputData(data) {
  const [instructions, nodesBlock] = data.split('\n\n');

  const nodes = nodesBlock
    .split('\n')
    .map(line => line.match(/^(?<value>.*)\s\=\s\((?<left>.*),\s(?<right>.*)\)$/).groups)
    .reduce((acc, node) => {
      acc[node.value] = node;

      return acc;
    }, {});

  return { instructions, nodes };
}

function findLCM(a, b) {
  return (a * b) / findGCD(a, b);
}

function findGCD(a, b) {
  while (a > 0 && b > 0) {
    if (a >= b) {
      a = a % b;
    } else {
      b = b % a;
    }
  }

  return Math.max(a, b);
}
