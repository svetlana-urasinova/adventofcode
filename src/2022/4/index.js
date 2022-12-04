import { input } from './input.js';

export function main() {
  const data = getInputData(input);

  const part1Answer = part1(data);
  const part2Answer = part2(data);

  return `
        <p>There are <span class="answer">${part1Answer}</span> assignment pairs where one range fully contains the other.</p>        
        <p>There are <span class="answer">${part2Answer}</span> assignment pairs where the ranges overlap.</p>        
    `;
}

export function part1(data) {
  return data.filter(
    pair => {
      const firstContainsSecond = pair[0].start <= pair[1].start && pair[0].end >= pair[1].end;
      const secondContainsFirst = pair[1].start <= pair[0].start && pair[1].end >= pair[0].end;

      return firstContainsSecond || secondContainsFirst;
    }).length;
}

export function part2(data) {
  return data.filter(pair => {
    const firstOverlapsSecond = pair[0].start <= pair[1].start && pair[0].end >= pair[1].start;
    const secondOverlapsFirst = pair[1].start <= pair[0].start && pair[1].end >= pair[0].start;

    return firstOverlapsSecond || secondOverlapsFirst;
  }).length;
}

export function getInputData(data) {
  return data.split("\n").map(line => line.split(",").map(sections => {
    const [start, end] = sections.split('-').map(el => +el);

    return { start, end }
  }));
}