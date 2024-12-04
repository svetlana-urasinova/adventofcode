import { input } from './input.js';

export const INSTRUCTIONS = {
  multiply: {
    name: 'mul',
    argsNumber: 2,
  },
  enabled: {
    name: 'do',
  },
  disabled: {
    name: "don't",
  },
};

const ARGS_START_CHAR = '(';
const ARGS_END_CHAR = ')';
const ARGS_SEPARATOR_CHAR = ',';

export function main() {
  const part1Answer = part1(input);
  const part2Answer = part2(input);

  return `
        <p>Sum of all multiplications is <span class="answer">${part1Answer}</span>.</p>        
        <p>Sum of only enabled multiplications is <span class="answer">${part2Answer}</span>.</p>        
    `;
}

export function part1(input) {
  const data = parse(input);

  return calculateSumOfMultiplications(data);
}

export function part2(input) {
  const data = parse(input, true);

  return calculateSumOfMultiplications(data);
}

function parse(input, enabledOnly = false) {
  const instructions = enabledOnly
    ? [INSTRUCTIONS.multiply, INSTRUCTIONS.enabled, INSTRUCTIONS.disabled]
    : [INSTRUCTIONS.multiply];

  const result = [];

  let enabled = true;

  for (let i = 0; i < input.length; i++) {
    const parseResult = parseInstruction(instructions, input, i);

    if (!parseResult) {
      continue;
    }

    switch (parseResult.instruction.name) {
      case INSTRUCTIONS.multiply.name:
        if (enabled) {
          result.push(parseResult.args);
        }
        break;
      case INSTRUCTIONS.enabled.name:
        enabled = true;
        break;
      case INSTRUCTIONS.disabled.name:
        enabled = false;
        break;
    }

    i += parseResult.shift;
  }

  return result;
}

export function parseInstruction(instructions, input, start) {
  for (const instruction of instructions) {
    const { name, argsNumber } = instruction;

    if (input.slice(start, start + name.length) !== name) {
      continue;
    }

    const parseResult = parseInstructionArgs(input, start + name.length, argsNumber);

    if (parseResult) {
      return { ...parseResult, instruction };
    }
  }
}

function parseInstructionArgs(input, start, argsNumber) {
  const args = [];

  let counter = start;

  if (input[counter] !== ARGS_START_CHAR) {
    return null;
  }

  counter++;

  if (!argsNumber) {
    return input[counter] === ARGS_END_CHAR ? { args, shift: counter - start } : null;
  }

  for (let i = 0; i < argsNumber; i++) {
    let currentArg = '';

    while (/\d/.test(input[counter])) {
      currentArg += input[counter];
      counter++;
    }

    const isLastIteration = i + 1 === argsNumber;

    if (
      currentArg !== '' &&
      ((isLastIteration && input[counter] === ARGS_END_CHAR) ||
        (!isLastIteration && input[counter] === ARGS_SEPARATOR_CHAR))
    ) {
      args.push(+currentArg);
    } else {
      return null;
    }

    if (!isLastIteration) {
      counter++;
    }
  }

  return { args, shift: counter - start };
}

function calculateSumOfMultiplications(pairs) {
  return pairs.reduce((sum, pair) => sum + pair[0] * pair[1], 0);
}
