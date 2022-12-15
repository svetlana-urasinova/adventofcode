import { input } from './input.js';

const SAND_START_POINT = { x: 500, y: 0 };

export function main() {
  const data = getInputData(input);

  const part1Answer = part1(data);
  const part2Answer = part2(data);

  return `
        <p><span class="answer">${part1Answer}</span> units of the sand come to rest above the abyss.</p>        
        <p><span class="answer">${part2Answer}</span> units of the sand come to rest on the floor</p>        
    `;
}

export function part1(data) {
  const max = getMaxIndices(data);

  const map = buildRocksMapWithoutFloor(data, max);

  const updatedMap = simulateSand(map);

  return updatedMap.reduce((count, row) => count + row.filter(point => point === 'o').length, 0);
}

export function part2(data) {
  const max = getMaxIndices(data);

  const map = buildRocksMapWithFloor(data, max);

  const updatedMap = simulateSand(map);

  // return renderMap(updatedMap);
  return updatedMap.reduce((count, row) => count + row.filter(point => point === 'o').length, 0)
}

export function getInputData(data) {
  return data.split("\n").map(line => line.split(" -> ").map(str => {
    const [x, y] = str.split(',');

    return { x: Number(x), y: Number(y) }
  }));
}

function getMaxIndices(data) {
  const { x, y } = SAND_START_POINT;
  const max = { x: x + 1, y: y + 1 }

  for (const polygon of data) {
    for (const point of polygon) {
      const { x, y } = point;

      if (x > max.x) { max.x = x + 1; }
      if (y > max.y) { max.y = y + 1; }
    }
  }

  max.x += 500;

  return max;
}

function move(coords, direction) {
  const { x, y } = coords;

  switch (direction) {
    case 'up':
      return { x, y: y - 1 }
    case 'down':
      return { x, y: y + 1 }
    case 'left':
      return { x: x - 1, y }
    case 'right':
      return { x: x + 1, y }
  }
}

function getDirection(from, to) {
  switch (true) {
    case from.x === to.x:
      return from.y > to.y ? 'up' : 'down';
    case from.y === to.y:
      return from.x > to.x ? 'left' : 'right';
  }
}

function renderMap(map) {
  let render = '';

  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[0].length; j++) {
      render += map[i][j] ? map[i][j] : '.';
    }

    render += "<br>";
  }

  return render;
}

function buildRocksMapWithoutFloor(data, max) {
  const map = new Array(max.y + 1).fill(0).map(_ => new Array(max.x + 1));
  map[SAND_START_POINT.y][SAND_START_POINT.x] = '+';

  for (const polygon of data) {
    for (let i = 0; i < polygon.length - 1; i++) {
      let currentPoint = polygon[i];
      const nextPoint = polygon[i + 1];
      const direction = getDirection(currentPoint, nextPoint);

      map[nextPoint.y][nextPoint.x] = '#';

      while (currentPoint.x !== nextPoint.x || currentPoint.y !== nextPoint.y) {
        const { x, y } = currentPoint;

        map[y][x] = '#';

        currentPoint = move({ x, y }, direction);
      }
    }
  }

  return map[max.y].filter(Boolean).length ? [...map, new Array(max.x + 1)] : map;
}

function buildRocksMapWithFloor(data, max) {
  return [...buildRocksMapWithoutFloor(data, max), new Array(max.x + 1).fill('#')];
}

function simulateSand(map) {
  const mapSize = map.length * map[0].length;
  let counter = 0;

  let coords = SAND_START_POINT;

  while (coords && counter < mapSize) {
    const { x, y } = coords;

    if (counter > 0) {
      map[y][x] = 'o';
    }

    if (x >= map[0].length) {
      map = updateMapToWidth(map, y + 1);
    }

    coords = fall(map, SAND_START_POINT);

    counter++;
  }

  return map;
}

function fall(map, coords) {
  const updatedCoords = move(coords, 'down');

  if (!isValid(map, updatedCoords)) { return null; }

  if (!isObstacle(map, updatedCoords, 'down')) {
    return fall(map, updatedCoords);
  }

  const updatedCoordsLeft = move(updatedCoords, 'left');
  if (!isObstacle(map, updatedCoordsLeft) && isValid(map, updatedCoordsLeft)) {
    return fall(map, updatedCoordsLeft);
  }

  const updatedCoordsRight = move(updatedCoords, 'right');
  if (!isObstacle(map, updatedCoordsRight) && isValid(map, updatedCoordsRight)) {
    return fall(map, updatedCoordsRight);
  }

  return coords;
}

function isObstacle(map, coords) {
  const { x, y } = coords;

  return map[y] && !!map[y][x];
}

function isValid(map, coords) {
  const { x, y } = coords;

  return x >= 0 && y >= 0 && y < map.length;
}

function updateMapToWidth(map, width) {
  const updatedMap = _.cloneDeep(map);

  for (let i = 0; i < map.length; i++) {
    updatedMap[i].length = width;
  }

  return updatedMap;
}