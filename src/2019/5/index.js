import { input } from './input.js';

export function main() {
  const data = getInputData(input);
  const part1Answer = part1(data);
  const part2Answer = part2(data);

  return `
          <p>Diagnostic code for id=1 will be <span class="answer">${part1Answer}</span>.</p>
          <p>Diagnostic code for id=5 will be <span class="answer">${part2Answer}</span>.</p>
          `;
}

function part1(data) {
  const paramId = 1;
  return executeOpcode(data, paramId).outputValue;
}

function part2(data) {
  const paramId = 5;
  return executeOpcode(data, paramId).outputValue;
}

export function getInputData(input) {
  return input.split(',').map(val => Number(val));
}

function getParameter(data, pointer, mode = false) {
  return mode ? data[pointer] : data[data[pointer]];
}

function decodeInstruction(instruction) {
  const instructionSymbolsArray = String(instruction).split('').reverse();

  return instructionSymbolsArray.reduce((res, num, index) => {
    if (index < 2) {
      return { ...res, opcode: res.opcode + num * Math.pow(10, index) }
    } else {
      return { ...res, modes: [...res.modes, !!Number(num)] }
    }
  }, { opcode: 0, modes: [] });
}

export function executeOpcode(data, param) {
  try {
    let pointer = 0;
    let updatedData = [...data];
    let outputValue;

    while (true) {
      let instructionLength = 4;
      const { opcode, modes } = decodeInstruction(updatedData[pointer]);

      switch (opcode) {
        case 1:
          updatedData = sum(updatedData, pointer, modes);
          break;
        case 2:
          updatedData = multiply(updatedData, pointer, modes);
          break;
        case 3:
          updatedData = save(updatedData, pointer, param)
          instructionLength = 2;
          break;
        case 4:
          instructionLength = 2;
          outputValue = output(updatedData, pointer, modes);
          break;
        case 5:
          instructionLength = 0;
          pointer = jumpIfTrue(updatedData, pointer, modes);
          break;
        case 6:
          instructionLength = 0;
          pointer = jumpIfFalse(updatedData, pointer, modes);
          break;
        case 7:
          updatedData = lessThan(updatedData, pointer, modes)
          break;
        case 8:
          updatedData = equals(updatedData, pointer, modes)
          break;
        case 99:
          return { data: updatedData, outputValue }
        default:
          throw new Error(`Invalid opcode ${opcode}!`);
      }

      pointer += instructionLength;
      if (pointer >= updatedData.length) {
        throw new Error(`Invalid index ${pointer} !`)
      }
    }
  } catch (error) {
    console.error(`${error} Program is terminating.`);
  }
}

function sum(data, pointer, modes = []) {
  const updatedData = [...data];

  updatedData[updatedData[pointer + 3]] = getParameter(data, pointer + 1, modes[0]) + getParameter(data, pointer + 2, modes[1]);;

  return updatedData;
}

function multiply(data, pointer, modes = []) {
  const updatedData = [...data];

  updatedData[updatedData[pointer + 3]] = getParameter(data, pointer + 1, modes[0]) * getParameter(data, pointer + 2, modes[1]);

  return updatedData;
}

function save(data, pointer, param) {
  const updatedData = [...data];

  updatedData[updatedData[pointer + 1]] = param;

  return updatedData;
}

function output(data, pointer = 0, modes = []) {
  // return data[data[pointer + 1]];
  return getParameter(data, pointer + 1, modes[0]);
}

function jumpIfTrue(data, pointer, modes = []) {
  return getParameter(data, pointer + 1, modes[0]) ? getParameter(data, pointer + 2, modes[1]) : pointer + 3;
}

function jumpIfFalse(data, pointer, modes = []) {
  return getParameter(data, pointer + 1, modes[0]) ? pointer + 3 : getParameter(data, pointer + 2, modes[1]);
}

function lessThan(data, pointer, modes = []) {
  const updatedData = [...data];

  const value = getParameter(data, pointer + 1, modes[0]) < getParameter(data, pointer + 2, modes[1]) ? 1 : 0;

  updatedData[updatedData[pointer + 3]] = value;

  return updatedData;
}

function equals(data, pointer, modes = []) {
  const updatedData = [...data];

  const value = getParameter(data, pointer + 1, modes[0]) === getParameter(data, pointer + 2, modes[1]) ? 1 : 0;

  updatedData[updatedData[pointer + 3]] = value;

  return updatedData;
}