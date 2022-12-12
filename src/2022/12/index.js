import { input } from './input.js';

const START_VALUE = 'S';
const END_VALUE = 'E';

export function main() {
  const data = getInputData(input);

  const part1Answer = part1(data);
  const part2Answer = part2(data);

  return `
        <p>The shortest way from S to E is <span class="answer">${part1Answer}</span>.</p>        
        <p>The shortest way from either S or a to E is <span class="answer">${part2Answer}</span>.</p>        
    `;
}

export function part1(graph) {
  const startHeight = getHeight(END_VALUE);
  const endHeight = getHeight(START_VALUE);

  const startIndex = graph.findIndex(vertice => vertice.height === startHeight);

  return updatePath([startIndex], 0, _.cloneDeep(graph), endHeight);
}

export function part2(graph) {
  const startHeight = getHeight(END_VALUE);
  const endHeight = getHeight('a');

  const startIndex = graph.findIndex(vertice => vertice.height === startHeight);

  return Math.min(updatePath([startIndex], 0, _.cloneDeep(graph), endHeight));
}

export function getInputData(data) {
  const graph = [];

  const matrix = data.split("\n").map(line => line.split(''));

  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[0].length; j++) {
      const coords = { x: i, y: j }

      graph.push({
        height: getHeight(matrix[i][j]),
        neighbors: findNeighbors(coords, matrix),
        visited: false
      });
    }
  }

  return graph;
}

function findNeighbors(coords, matrix) {
  const { x, y } = coords;

  const height = getHeight(matrix[x][y]);

  return [{ x: x - 1, y }, { x: x + 1, y }, { x, y: y - 1 }, { x, y: y + 1 }]
    .reduce((acc, neighbor) => {
      const { x, y } = neighbor;

      if (!matrix[x] || matrix[x][y] === undefined) {
        return acc;
      }

      return height - getHeight(matrix[x][y]) < 2 ? [...acc, getIndexByCoords(neighbor, matrix[0].length)] : acc
    }, [])
}

function getIndexByCoords(coords, rowLength) {
  const { x, y } = coords;

  return x * rowLength + y;
}

function getHeight(value) {
  const CODE_MIN = 97;
  const CODE_MAX = 122;

  const code = value.charCodeAt();

  return code >= CODE_MIN && code <= CODE_MAX ? code : value === END_VALUE ? CODE_MAX + 1 : CODE_MIN - 1;
}

function updatePath(vertices, path, graph, endHeight) {
  const updatedGraph = [...graph];
  const updatedVertices = [];
  const updatedPath = path + 1;

  for (const vertice of vertices) {
    const { neighbors } = graph[vertice];

    for (const neighbor of neighbors) {
      if (!graph[neighbor].visited) {
        graph[neighbor].visited = true;

        if (graph[neighbor].height <= endHeight) {
          return updatedPath;
        }

        updatedVertices.push(neighbor);
      }
    }
  }

  return updatePath(updatedVertices, updatedPath, updatedGraph, endHeight);
}
