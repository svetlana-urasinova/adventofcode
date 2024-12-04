import { delay } from '../../../utils/delay.js';
import { ColoredTextBlock } from '../../../vizualisation/colored-text-block/colored-text-block.js';
import { COLORS } from '../../../vizualisation/colors/colors.js';
import { ARGS_END_CHAR, ARGS_SEPARATOR_CHAR, ARGS_START_CHAR, INSTRUCTIONS } from '../index.js';
import { input } from './../input-example2.js';

const timeout = 50;

const block1 = new ColoredTextBlock('#block1');
const block2 = new ColoredTextBlock('#block2');

window.onload = async () => {
  block1.setContent(input);
  block2.setContent(input);

  parse(block1);
  parseOnlyEnabled(block2);
};

async function parse(block) {
  const instructions = [INSTRUCTIONS.multiply];

  let i = 0;

  while (i < input.length) {
    block.goToNextChar(i, COLORS.White);

    const parseResult = await parseInstruction(block, instructions, input, i);

    i += parseResult ? parseResult.shift : 1;

    await delay(timeout);
  }

  block.cleanChar(i - 1);
}

async function parseOnlyEnabled(block) {
  const instructions = [INSTRUCTIONS.multiply, INSTRUCTIONS.disabled, INSTRUCTIONS.enabled];

  let isEnabled = true;

  let i = 0;

  while (i < input.length) {
    block.goToNextChar(i, isEnabled ? COLORS.White : COLORS.Black);

    const parseResult = await parseInstruction(block, instructions, input, i, isEnabled);

    if (parseResult?.instruction.name === INSTRUCTIONS.disabled.name) {
      isEnabled = false;
    }

    if (parseResult?.instruction.name === INSTRUCTIONS.enabled.name) {
      isEnabled = true;
    }

    i += parseResult ? parseResult.shift : 1;

    await delay(timeout);
  }

  block.cleanChar(i - 1, COLORS.White);
  block.cleanChar(i - 1, COLORS.Black);
}

async function parseInstruction(block, instructions, input, start, isEnabled = true) {
  for (const instruction of instructions) {
    const { name, argsNumber } = instruction;

    const animate = name === INSTRUCTIONS.multiply.name;

    let isMatch = true;

    for (let i = 0; i < name.length; i++) {
      if (input[start + i] !== name[i]) {
        isMatch = false;

        break;
      }

      if (animate) {
        if (isEnabled) {
          block.paintChar(start + i, COLORS.White);
        } else {
          block.goToNextChar(start + i, COLORS.Black);
        }

        await delay(timeout);
      }
    }

    if (!isMatch) {
      continue;
    }

    const parseResult = await parseInstructionArgs(block, input, start + name.length, argsNumber, animate, isEnabled);

    if (animate) {
      if (parseResult.success) {
        if (isEnabled) {
          block.blink(COLORS.Yellow, start, parseResult.lastIndex);

          await delay(1000);
        }
      } else {
        for (let i = start; i <= parseResult.lastIndex; i++) {
          block.cleanChar(i);
        }
      }
    } else {
      for (let i = start; i < parseResult.lastIndex; i++) {
        block.cleanChar(i);
        block.paintChar(i, getInstructionColor(instruction.name));
      }
    }

    return { args: parseResult.args, shift: parseResult.lastIndex - start + 1, instruction };
  }
}

async function parseInstructionArgs(block, input, start, argsNumber, animate = false, isEnabled = true) {
  const highlight = async i => {
    if (isEnabled) {
      block.paintChar(i, COLORS.White);
    } else {
      block.goToNextChar(i, COLORS.Black);
    }

    await delay(timeout);
  };

  const args = [];

  let counter = start;

  if (animate) {
    await highlight(counter);
  }

  if (input[counter] !== ARGS_START_CHAR) {
    return { success: false, lastIndex: counter };
  }

  counter++;

  if (!argsNumber) {
    if (animate) {
      await highlight(counter);
    }

    return input[counter] === ARGS_END_CHAR
      ? { success: true, lastIndex: counter + 1, args }
      : { success: false, lastIndex: counter + 1 };
  }

  for (let i = 0; i < argsNumber; i++) {
    let currentArg = '';

    while (/\d/.test(input[counter])) {
      if (animate) {
        await highlight(counter);
      }

      currentArg += input[counter];
      counter++;
    }

    const isLastIteration = i + 1 === argsNumber;

    if (animate) {
      await highlight(counter);
    }

    if (
      currentArg !== '' &&
      ((isLastIteration && input[counter] === ARGS_END_CHAR) ||
        (!isLastIteration && input[counter] === ARGS_SEPARATOR_CHAR))
    ) {
      args.push(+currentArg);
    } else {
      return { success: false, lastIndex: counter };
    }

    counter++;
  }

  return { success: true, lastIndex: counter - 1, args };
}

function getInstructionColor(instructionName) {
  switch (instructionName) {
    case INSTRUCTIONS.disabled.name:
      return COLORS.Red;
    case INSTRUCTIONS.enabled.name:
      return COLORS.Green;
    default:
      return null;
  }
}
