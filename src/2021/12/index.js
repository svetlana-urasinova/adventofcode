import { input } from './input.js';

const START_CONNECTION = 'start';
const END_CONNECTION = 'end';

export function main() {
  const data = getInputData(input);

  const part1Answer = part1(data);
  const part2Answer = part2(data);

  return `
        <p>There are <span class="answer">${part1Answer}</span> paths in this cave system if every small cave can be visited at most once.</p>        
        <p>There are <span class="answer">${part2Answer}</span> paths in this cave system if a single small cave can be visited at most twice, and the remaining only once.</p>        
    `;
}

export function part1(data) {
  return findPaths([{ content: [START_CONNECTION] }], data).length;
}

export function part2(data) {
  return findPaths([{ content: [START_CONNECTION], caveVisitedSecondTime: false }], data).length;
}

export function getInputData(data) {
  const parsedData = data.split(/\n/).map(el => el.split('-'));
  const vertices = {};
  const pushVertice = (a, b) => {
    vertices[a] = {
      connections: [...(vertices[a]?.connections || []), b],
      repeatable: a.toUpperCase() === a
    }
  }

  for (let i in parsedData) {
    const [from, to] = parsedData[i];
    pushVertice(from, to);
    pushVertice(to, from);
  }

  return vertices;
}

function findPaths(paths, vertices) {
  const newPaths = [];

  let done = true;

  paths.forEach(path => {
    const last = path.content.slice(-1)[0];

    if (last === END_CONNECTION) {
      newPaths.push(path);
    } else {
      vertices[last].connections.forEach(con => {
        if (con === START_CONNECTION) {
          return;
        }

        let caveVisitedSecondTime = path.caveVisitedSecondTime ?? null;

        if (!vertices[con].repeatable && path.content.includes(con)) {
          if (caveVisitedSecondTime || caveVisitedSecondTime === null) { return; }

          caveVisitedSecondTime = true;
        }

        vertices[con] = { ...vertices[con], visited: true };
        newPaths.push({ content: [...path.content, con], caveVisitedSecondTime });
        done = false;
      });
    }
  });

  return done === true ? newPaths : findPaths(newPaths, vertices);
}