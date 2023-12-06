import { input } from './input.js';

export function main() {
  const part1Answer = part1(input);
  const part2Answer = part2(input);

  return `
        <p>The product of numbers of the ways to beat the record is <span class="answer">${part1Answer}</span>.</p>        
        <p>The number of the ways to beat the record in a long race is <span class="answer">${part2Answer}</span>.</p>        
    `;
}

export function part1(input) {
  const data = getInputData(input);

  let result = 1;

  for (const line of data) {
    const { start, end } = getRange(line.time, line.distance);

    result *= end - start + 1;
  }

  return result;
}

export function part2(input) {
  const { time, distance } = getInputData(input, true);

  const { start, end } = getRange(time, distance);

  return end - start + 1;
}

export function getInputData(data, ignoreSpaces = false) {
  const splittedData = data.split('\n');

  const timeRow = splittedData[0].replace('Time:', '');
  const distanceRow = splittedData[1].replace('Distance:', '');

  if (ignoreSpaces) {
    return { time: Number(timeRow.replace(/\s/g, '')), distance: Number(distanceRow.replace(/\s/g, '')) };
  }

  const time = parseNumberRow(timeRow);
  const distance = parseNumberRow(distanceRow);

  return time.map((value, index) => ({ time: value, distance: distance[index] }));
}

function parseNumberRow(row) {
  return row.split(/\s+/).filter(Boolean).map(Number);
}

function getEquationRoots(t, d) {
  const discriminant = t ** 2 - 4 * d;

  const x1 = 0.5 * (t - Math.sqrt(discriminant));
  const x2 = 0.5 * (t + Math.sqrt(discriminant));

  return [x1, x2];
}

function getRange(t, d) {
  const [x1, x2] = getEquationRoots(t, d);

  const start = Number.isInteger(x1) ? x1 + 1 : Math.ceil(x1);
  const end = Number.isInteger(x2) ? x2 - 1 : Math.floor(x2);

  return { start: Math.max(start, 1), end: Math.min(end, t - 1) };
}
