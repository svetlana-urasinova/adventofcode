import { input } from './input-example2.js';

export function main() {
  const data = getInputData(input);

  const part1Answer = part1(data);
  const part2Answer = part2(data);

  return `
        <p>The lowest location number is <span class="answer">${part1Answer}</span>.</p>        
        <p>The lowest location number for rangees is <span class="answer">${part2Answer}</span>.</p>        
    `;
}

export function part1(data) {
  const { seeds, rules } = data;

  let lowestLocation = Infinity;

  for (const seed of seeds) {
    lowestLocation = Math.min(getLocation(seed, rules), lowestLocation);
  }

  return lowestLocation;
}

export function part2(data) {
  const { seeds, rules } = data;

  const seedRanges = getSeedRanges(seeds);

  let lowestLocation = Infinity;

  for (let i = 0; i < seedRanges.length; i++) {
    let currentLowestLocation = lowestLocation;

    const { start, end } = seedRanges[i];

    for (let j = start; j <= end; j++) {
      const location = getLocation(j, rules);

      currentLowestLocation = Math.min(location, currentLowestLocation);
    }

    lowestLocation = Math.min(currentLowestLocation, lowestLocation);
  }
}

export function getInputData(data) {
  const splittedData = data.split('\n\n');

  const seeds = splittedData
    .shift()
    .replace('seeds: ', '')
    .split(' ')
    .map(value => Number(value));

  const rules = splittedData.reduce((acc, block) => {
    const lines = block.split('\n');

    lines.shift();

    const ranges = lines.map(line => {
      const [destinationStartIndex, sourceStartIndex, rangeLength] = line.split(' ').map(value => Number(value));

      return {
        start: sourceStartIndex,
        end: sourceStartIndex + rangeLength - 1,
        shift: destinationStartIndex - sourceStartIndex,
      };
    });

    ranges.sort((a, b) => a.start - b.start);

    acc.push(ranges);

    return acc;
  }, []);

  return { seeds, rules };
}

function getMappedValue(currentValue, rule) {
  let i = rule.length - 1;

  while (i > -1 && rule[i].start > currentValue) {
    i--;
  }

  return rule[i] && rule[i].end >= currentValue ? currentValue + rule[i].shift : currentValue;
}

function getLocation(seed, rules) {
  let currentValue = seed;

  for (let i = 0; i < rules.length; i++) {
    currentValue = getMappedValue(currentValue, rules[i]);
  }

  return currentValue;
}

function getSeedRanges(seeds) {
  const seedRanges = [];

  for (let i = 0; i < seeds.length; i += 2) {
    seedRanges.push({ start: seeds[i], end: seeds[i] + seeds[i + 1] + 1 });
  }

  seedRanges.sort((a, b) => a.start - b.start);

  return seedRanges;
}
