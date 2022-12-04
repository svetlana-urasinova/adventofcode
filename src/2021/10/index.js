import { input } from './input.js';

const rules = [
  {
    open: '(',
    closed: ')',
    corrupted_points: 3,
    incomplete_points: 1
  },
  {
    open: '[',
    closed: ']',
    corrupted_points: 57,
    incomplete_points: 2
  },
  {
    open: '{',
    closed: '}',
    corrupted_points: 1197,
    incomplete_points: 3
  },
  {
    open: '<',
    closed: '>',
    corrupted_points: 25137,
    incomplete_points: 4
  },

];

export function main() {
  const data = getInputData(input);

  const part1Answer = part1(data);
  const part2Answer = part2(data);

  return `
        <p>The total syntax error score is <span class="answer">${part1Answer}</span>.</p>        
        <p>The middle score is <span class="answer">${part2Answer}</span>.</p>        
    `;
}

export function part1(data) {
  const corrupted = sortChunks(data)['corrupted'];

  const scores = corrupted.map(el => {
    const search = rules.find(bracket => bracket.closed === el.bracket);

    return search.corrupted_points;
  });

  return scores.reduce((sum, corruptedPoints) => sum + corruptedPoints);
}

export function part2(data) {
  const incomplete = sortChunks(data)['incomplete'];

  const scores = incomplete.map(el => el.chunk.split('')
    .reduceRight((acc, el) => {
      const search = rules.find(bracket => bracket.open === el);
      return acc * 5 + search.incomplete_points;
    }, 0)
  ).sort((a, b) => a - b);

  return scores[(scores.length - 1) / 2];
}

export function getInputData(data) {
  return data.split(/\n\s+/);
}

function sortChunks(chunks) {
  const res = { corrupted: [], incomplete: [] };

  chunks.forEach(chunk => {
    chunk = clearChunk(chunk);

    const corruptedBracket = findCorruptedBracket(chunk);

    if (corruptedBracket) {
      res.corrupted.push({ chunk, bracket: corruptedBracket });
    } else {
      res.incomplete.push({ chunk });
    }
  });
  return res;
}

const clearChunk = str => {
  // looks for pairs of any brackets: (), [], <> or {}
  const re = new RegExp(rules.map(el => `\\${el.open}\\${el.closed}`).join('|'), 'g'); // \(\)|\[\]|\<\>|\{\}
  str = str.replace(re, '');

  return re.test(str) ? clearChunk(str) : str;
}

const findCorruptedBracket = str => {
  // looks for any closing bracket: ), ], > or }
  const re = new RegExp(rules.map(el => `\\${el.closed}`).join('|')); // \)|\]|\>|\}
  const res = re.exec(str);

  return res ? res[0] : false;
}