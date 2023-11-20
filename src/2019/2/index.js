import { input } from './input.js';

export function main() {
  const data = parseInput(input);
  const part1Answer = part1(data);
  const part2Answer = part2(data);

  return `
          <p>With inputs 12 and 2 left at position 0 will be <span class="answer">${part1Answer}</span>.</p>
          <p>In order to get output 19690720 inputs ${part2Answer.x} and ${part2Answer.y} are required which give you total result of <span class="answer">${part2Answer.res}</span>.</p>
          `;
}

export function parseInput(input) {
  return input.split(',').map(val => Number(val));
}

function part1(data) {
  const strWithUpdatedInputs = updateInputs(data, 12, 2);
  return getZeroPositionElement(strWithUpdatedInputs);
}

function part2(data) {
  const OUTPUT = 19690720;

  const inputs = getInputsForOutput(data, OUTPUT);

  return { ...inputs, res: 100 * inputs.x + inputs.y };
}

function getInputsForOutput(data, output) {
  try {
    for (let i = 0; i <= 99; i++) {
      for (let j = 0; j <= 99; j++) {
        const strWithUpdatedInputs = updateInputs(data, i, j);

        if (getZeroPositionElement(strWithUpdatedInputs) === output)
          return { x: i, y: j }
      }
    }

    throw new Error('Inputs not found!')
  } catch (error) {
    console.error(error);
  }

}

function updateInputs(data, input1, input2) {
  const updatedData = [...data];
  updatedData[1] = input1;
  updatedData[2] = input2;

  return updatedData;
}

export function getZeroPositionElement(data) {
  const updatedData = executeOpcode(data);

  return updatedData?.[0];
}

export function executeOpcode(data, pointer = 0) {
  try {
    if (pointer >= data.length) {
      throw new Error(`Invalid index ${pointer} !`)
    }

    const currentOpcode = data[pointer];
    const updatedData = [...data];

    switch (currentOpcode) {
      case 1:
        updatedData[updatedData[pointer + 3]] = updatedData[updatedData[pointer + 1]] + updatedData[updatedData[pointer + 2]];
        return executeOpcode(updatedData, pointer + 4);
      case 2:
        updatedData[updatedData[pointer + 3]] = updatedData[updatedData[pointer + 1]] * updatedData[updatedData[pointer + 2]];
        return executeOpcode(updatedData, pointer + 4);
      case 99:
        return data;
      default:
        throw new Error(`Invalid opcode ${currentOpcode} !`);
    }
  } catch (error) {
    console.error(`${error} Program is terminating.Please check if everything is correct.`);
  }
}