import { input } from './input.js';

export function main() {
  const data = getInputData(input);

  const part1Answer = part1(data);
  const part2Answer = part2(data);

  return `
        <p>The sum of signal strengths during the 20th, 60th, 100th, 140th, 180th and 220th cycles is <span class="answer">${part1Answer}</span>.</p>        
        <p>The rendered image is:<br /><br /><span class="answer">${part2Answer}</span></p>        
    `;
}

export function part1(data) {
  const BREAKPOINTS = [20, 60, 100, 140, 180, 220];
  let sum = 0;

  const callback = (counter, x) => {
    if (BREAKPOINTS.includes(counter)) {
      sum += counter * x;
    }
  }

  parseInstructions(data, callback);

  return sum;
}

export function part2(data) {
  const BREAKPOINTS = [40, 80, 120, 160, 200];
  const lineLength = 40;

  let currentLine = 0;
  let img = '';

  const callback = (counter, x) => {
    const position = counter - currentLine * lineLength - 1;

    img += spriteIncludesCurrentPixel(position, x, BREAKPOINTS) ? '#' : '.';

    if (BREAKPOINTS.includes(counter)) {
      img += "<br />";
      currentLine++;
    }
  }

  parseInstructions(data, callback);

  return img;
}

export function getInputData(data) {
  return data.split("\n");
}

function parseInstructions(data, callback) {
  let counter = 0;
  let x = 1;

  for (const line of data) {
    const [instruction, value] = line.split(" ");

    counter++;
    callback(counter, x);


    if (instruction === 'addx') {
      counter++;
      callback(counter, x);

      x += Number(value);
    }
  }
}

function spriteIncludesCurrentPixel(position, x, breakpoints) {
  for (let i = x - 1; i <= x + 1; i++) {
    if (position === i) {
      return true;
    }

    if (breakpoints.includes(i)) {
      break;
    }
  }

  return false;
}