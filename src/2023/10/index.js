import { input } from './input.js';

const TILES = {
  Start: 'S',
  NorthSouth: '|',
  EastWest: '-',
  NorthEast: 'L',
  NorthWest: 'J',
  SouthEast: 'F',
  SouthWest: '7',
  Ground: '.',
};

// a neighbor tile can be a connection only if it is connected with the current tile
// for example: F-SLJ
// for S the left tile (-) is a connection because it connects S with F
// and the right tile (L) is not a connection because it does not connect S with anything
const POSSIBLE_CONNECTIONS_VALUES = {
  withTop: [TILES.NorthEast, TILES.NorthWest, TILES.NorthSouth],
  withRight: [TILES.NorthEast, TILES.SouthEast, TILES.EastWest],
  withLeft: [TILES.NorthWest, TILES.SouthWest, TILES.EastWest],
  withBottom: [TILES.SouthEast, TILES.SouthWest, TILES.NorthSouth],
};

const CONNECTIONS_MAP = {
  bottom: 'withTop',
  left: 'withRight',
  right: 'withLeft',
  top: 'withBottom',
};

export function main() {
  const data = getInputData(input);

  const part1Answer = part1(data);
  const part2Answer = part2(data);

  return `
        <p>The number of steps needed to get from the starting position to the point farthest from the starting position is <span class="answer">${part1Answer}</span>.</p>        
        <p>The numbers of tiles enclosed by the loop <span class="answer">${part2Answer}</span>.</p>        
    `;
}

export function part1(data) {
  const { start, grid } = data;

  let counter = 1;

  let currentPosition = start;

  while (currentPosition) {
    currentPosition = findNotVisitedConnection(currentPosition, grid);

    if (currentPosition) {
      grid[currentPosition.y][currentPosition.x].inLoop = true;
    }

    counter++;
  }

  return Math.floor(counter / 2);
}

export function part2(data) {
  const { start, grid } = data;

  let result = 0;

  let currentPosition = start;

  while (currentPosition) {
    currentPosition = findNotVisitedConnection(currentPosition, grid);

    if (currentPosition) {
      grid[currentPosition.y][currentPosition.x].inLoop = true;
    }
  }

  for (let i = 1; i < grid.length - 1; i++) {
    let isEnclosed = isEnclosing({ y: i, x: 0 }, grid);

    for (let j = 1; j < grid[0].length - 1; j++) {
      if (isEnclosing({ x: j, y: i }, grid)) {
        isEnclosed = !isEnclosed;
      } else {
        if (!grid[i][j].inLoop && isEnclosed) {
          result++;
        }
      }
    }
  }

  return result;
}

export function getInputData(data) {
  let start;

  const grid = data.split('\n').map((line, y) =>
    line.split('').map((tile, x) => {
      if (tile === TILES.Start) {
        start = { x, y };
      }

      return { value: tile, inLoop: tile === TILES.Start ? true : false };
    })
  );

  return { start, grid };
}

function getNeighborsCoords(coords) {
  const { x, y } = coords;

  return {
    bottom: { x, y: y + 1 },
    left: { x: x - 1, y },
    right: { x: x + 1, y },
    top: { x, y: y - 1 },
  };
}

function findNotVisitedConnection(coords, grid) {
  const currentValue = grid[coords.y][coords.x].value;

  if (currentValue === TILES.Start) {
    return findStartTileConnection(coords, grid);
  }

  const connectionsCoords = findTileConnectionsCoords(currentValue, coords);

  for (const connectionCoords of connectionsCoords) {
    const { x, y } = connectionCoords;

    const connection = grid[y]?.[x];

    if (connection && !connection.inLoop) {
      return connectionCoords;
    }
  }
}

function findTileConnectionsCoords(value, coords) {
  const neighborsCoords = getNeighborsCoords(coords);

  switch (value) {
    case TILES.NorthSouth:
      return [neighborsCoords.top, neighborsCoords.bottom];
    case TILES.EastWest:
      return [neighborsCoords.left, neighborsCoords.right];
    case TILES.NorthEast:
      return [neighborsCoords.right, neighborsCoords.top];
    case TILES.SouthWest:
      return [neighborsCoords.bottom, neighborsCoords.left];
    case TILES.SouthEast:
      return [neighborsCoords.bottom, neighborsCoords.right];
    case TILES.NorthWest:
      return [neighborsCoords.top, neighborsCoords.left];
    default:
      return [];
  }
}

function findStartTileConnection(coords, grid) {
  // we don't know which value the start tile has
  // so we need to find any neighbor of the start tile which is connected to it

  const neighborsCoords = getNeighborsCoords(coords);

  for (const key of Object.keys(neighborsCoords)) {
    const { x, y } = neighborsCoords[key];

    const neighborValue = grid[y]?.[x]?.value;

    if (POSSIBLE_CONNECTIONS_VALUES[CONNECTIONS_MAP[key]].includes(neighborValue)) {
      return neighborsCoords[key];
    }
  }
}

function isEnclosing(coords, grid) {
  // we're looking throw every line from left to right
  // therefore the tile will only then be enclosing when it has a connection with the bottom

  const { x, y } = coords;

  const tile = grid[y][x];

  if (tile.value === TILES.Start) {
    return grid[y + 1][x].inLoop && (grid[y][x - 1].inLoop || grid[y][x + 1].inLoop);
  }

  return tile.inLoop && POSSIBLE_CONNECTIONS_VALUES.withBottom.includes(tile.value);
}
