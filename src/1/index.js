import { input as part1Input } from './part1-input.js';
export function main() {
  part1();

  return 'Hello world';
}

function part1() {
  const inputData = getInputData(part1Input);
  console.log(inputData);
}

function getInputData(input) {
  return input.split("\n").reduce((inputData, str) =>
    str === "" ? inputData : [...inputData, Number(str)]
    , [])
}