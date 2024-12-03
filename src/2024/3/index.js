import { input } from './input.js';

const INSTRUCTIONS = {
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
        <p><span class="answer">Sum of all multiplications is ${part1Answer}</span>.</p>        
        <p><span class="answer">Sum of only enabled multiplications is ${part2Answer}</span>.</p>        
    `;
}

export function part1(input) {
  const data = parseMultiplyInstructions(input);

  return calculateSumOfMultiplications(data);
}

export function part2(input) {
  const data = parseMultiplyInstructions(input, true);

  return calculateSumOfMultiplications(data);
}

function parseMultiplyInstructions(input, enabledOnly = false) {
  const result = [];

  let enabled = true;

  for (let i = 0; i < input.length; i++) {
    if (enabledOnly) {
      const disabledInstructionResult = parseInstruction(INSTRUCTIONS.disabled, input, i);

      if (disabledInstructionResult !== null) {
        enabled = false;

        i += disabledInstructionResult.instruction.length - 1;

        continue;
      }

      const enabledInstructionResult = parseInstruction(INSTRUCTIONS.enabled, input, i);

      if (enabledInstructionResult !== null) {
        enabled = true;

        i += enabledInstructionResult.instruction.length - 1;

        continue;
      }

      if (!enabled) {
        continue;
      }
    }

    const multiplyInstructionResult = parseInstruction(INSTRUCTIONS.multiply, input, i);

    if (multiplyInstructionResult !== null) {
      result.push(multiplyInstructionResult.args);

      i += multiplyInstructionResult.instruction.length - 1;
    }
  }

  return result;
}

function parseInstruction(instruction, str, start) {
  const { name, argsNumber } = instruction;

  if (str.slice(start, start + name.length) !== name) {
    return null;
  }

  const parsedArgs = parseInstructionArgs(str, start + name.length, argsNumber);

  if (!parsedArgs) {
    return null;
  }

  return { instruction: str.slice(start, parsedArgs.end), args: parsedArgs.args };
}

function parseInstructionArgs(str, start, argsNumber) {
  const args = [];

  let counter = start;

  if (str[counter] !== ARGS_START_CHAR) {
    return null;
  }

  counter++;

  if (!argsNumber) {
    return str[counter] === ARGS_END_CHAR ? { args, end: counter } : null;
  }

  for (let i = 0; i < argsNumber; i++) {
    let currentArg = '';

    while (/\d/.test(str[counter])) {
      currentArg += str[counter];
      counter++;
    }

    const isLastIteration = i + 1 === argsNumber;

    if (
      currentArg !== '' &&
      ((isLastIteration && str[counter] === ARGS_END_CHAR) ||
        (!isLastIteration && str[counter] === ARGS_SEPARATOR_CHAR))
    ) {
      args.push(+currentArg);
    } else {
      return null;
    }

    if (!isLastIteration) {
      counter++;
    }
  }

  return { args, end: counter };
}

function calculateSumOfMultiplications(pairs) {
  return pairs.reduce((sum, pair) => sum + pair[0] * pair[1], 0);
}
