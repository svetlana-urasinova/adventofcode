import { input } from './input.js';

export function main() {
  const data = getInputData(input);

  const part1Answer = part1(data);
  const part2Answer = part2(data);

  return `
        <p>After the rearrangement procedure completes by CrateMover-9000, on top of each stack end crates <span class="answer">${part1Answer}</span>.</p>        
        <p>After the rearrangement procedure completes by CrateMover-9001, on top of each stack end crates <span class="answer">${part2Answer}</span>.</p>        
    `;
}

export function part1(data) {
  const { stacks, instructions } = data;

  const updatedStacks = executeInstructions9000(stacks, instructions);

  return getTopCrates(updatedStacks);
}

export function part2(data) {
  const { stacks, instructions } = { ...data };

  const updatedStacks = executeInstructions9001(stacks, instructions);

  return getTopCrates(updatedStacks);
}

export function getInputData(input) {
  const [stacksSource, instructionsSource] = input.split(/\s[\d+\s+]+\d+\s\n\n/m);

  const stacksRotated = stacksSource.split("\n").map(
    line => line.replace(/^\s{3}|\s{3}$/g, '_')
      .replace(/\s{4}/g, ' _')
      .replace(/\[|\]/g, '')
      .split(' '));

  const stacks = stacksRotated[0].map((_, index) => stacksRotated.map(line => line[index]).filter(el => el !== '_').reverse());

  const instructions = instructionsSource
    .split("\n").map(line => {
      const { quantity, from, to } = line.match(/move (?<quantity>\d+) from (?<from>\d+) to (?<to>\d+)/).groups;

      return { quantity: Number(quantity), from: Number(from) - 1, to: Number(to) - 1 }
    });

  return { stacks, instructions }
}

function executeInstructions9000(stacks, instructions) {
  const updatedStacks = _.cloneDeep(stacks);
  const updatedInstructions = _.cloneDeep(instructions);

  const instruction = updatedInstructions.shift();

  const { quantity, from, to } = instruction;

  for (let i = 0; i < quantity; i++) {
    const crate = updatedStacks[from].pop();
    updatedStacks[to].push(crate);
  }

  return updatedInstructions.length === 0 ? updatedStacks : executeInstructions9000(updatedStacks, updatedInstructions);
}

function executeInstructions9001(stacks, instructions) {
  const updatedStacks = _.cloneDeep(stacks);
  const updatedInstructions = _.cloneDeep(instructions);

  const instruction = updatedInstructions.shift();

  const { quantity, from, to } = instruction;

  const crates = updatedStacks[from].splice(updatedStacks[from].length - quantity);

  updatedStacks[to] = [...updatedStacks[to], ...crates];

  return updatedInstructions.length === 0 ? updatedStacks : executeInstructions9001(updatedStacks, updatedInstructions);
}

function getTopCrates(stacks) {
  return stacks.map(stack => stack[stack.length - 1]).join('');
}