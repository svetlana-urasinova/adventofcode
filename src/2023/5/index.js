import { input } from './input.js';

export function main() {
  const data = getInputData(input);

  const part1Answer = part1(data);
  const part2Answer = part2(data);

  return `
        <p>The lowest location number is <span class="answer">${part1Answer}</span>.</p>        
        <p>The lowest location number for ranges is <span class="answer">${part2Answer}</span>.</p>        
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

  let ranges = [...rules[0]].map(rule => ({ ...rule, total: rule.shift }));

  for (let i = 1; i < rules.length; i++) {
    const updatedRanges = [];

    while (ranges.length > 0) {
      const range = ranges.shift();

      const left = range.start + range.shift;
      const right = range.end + range.shift;

      let ruleFound = false;

      for (let j = 0; j < rules[i].length; j++) {
        const ruleRange = rules[i][j];

        // range and ruleRange don't overlap
        if (left > ruleRange.end || right < ruleRange.start) {
          continue;
        }

        updatedRanges.push({
          start: Math.max(left, ruleRange.start),
          end: Math.min(right, ruleRange.end),
          shift: ruleRange.shift,
          total: range.total + ruleRange.shift,
        });

        // non-overlapping left part
        if (left < ruleRange.start) {
          ranges.push({ start: left, end: ruleRange.start - 1, shift: 0, total: range.total });
        }

        // non-overlapping right part
        if (right > ruleRange.end) {
          ranges.push({ start: ruleRange.end + 1, end: right, shift: 0, total: range.total });
        }

        ruleFound = true;

        break;
      }

      if (!ruleFound) {
        updatedRanges.push({ start: left, end: right, shift: 0, total: range.total });
      }
    }

    ranges = updatedRanges;
  }

  // add the last shift
  for (const range of ranges) {
    range.start += range.shift;
    range.end += range.shift;
  }

  const rangesMap = ranges.sort((a, b) => a.start - b.start);

  for (const rangeMap of rangesMap) {
    const start_origin = rangeMap.start - rangeMap.total;
    const end_origin = rangeMap.end - rangeMap.total;

    for (const seedRange of seedRanges) {
      if (seedRange.end < start_origin || seedRange.start > end_origin) {
        continue;
      }

      return rangeMap.start;
    }
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
