import { input } from './input.js';

export function main() {
  const data = getInputData(input);

  const part1Answer = part1(data, 2000000);
  const part2Answer = part2(data, 4000000);

  return `
        <p><span class="answer">${part1Answer}</span></p>        
        <p><span class="answer">${part2Answer}</span></p>        
    `;
}

export function part1(data, rowNumber) {
  const emptyAreas = mergeAllSegments(getEmptyAreas(data, rowNumber));
  const emptyAreasLength = emptyAreas.reduce((sum, segment) => sum + segment.end - segment.start + 1, 0);
  const occupiedPointsNumber = countOccupiedPointsInRow(data, rowNumber);

  return emptyAreasLength - occupiedPointsNumber;
}

export function part2(data, max) {
  const MULTIPLIER = 4000000;

  for (let i = 0; i <= max; i++) {
    const rows = [];
    const areas = mergeAllSegments(getEmptyAreas(data, i));

    for (const area of areas) {
      if (area.start > max || area.end < 0) {
        continue;
      }

      const start = Math.max(area.start, 0);
      const end = Math.min(area.end, max);

      if (start !== 0 || end !== max) {
        rows.push({ start, end });
      }
    }

    if (rows.length > 0) {
      const sortedRows = [...rows].sort((a, b) => a.start - b.start);

      return (sortedRows[0].end + 1) * MULTIPLIER + i;
    }
  }
}

export function getInputData(data) {
  return data.split("\n").reduce((acc, row) => {
    const { sx, sy, bx, by } = row.match(/^[a-z\s=]+x=(?<sx>-?\d+),\sy=(?<sy>-?\d+):[a-z\s=]+x=(?<bx>-?\d+),\sy=(?<by>-?\d+)$/i).groups;

    acc.push({ sensor: { x: Number(sx), y: Number(sy) }, beacon: { x: Number(bx), y: Number(by) } });

    return acc;
  }, []);
}

function getEmptyAreas(data, rowNumber) {
  return data.reduce((segments, line) => {
    const { sensor, beacon } = line;
    const row = getRow(sensor, beacon, rowNumber);

    return row ? [...segments, row] : segments;
  }, []);
}

function getDistance(sensor, beacon) {
  return Math.abs(sensor.x - beacon.x) + Math.abs(sensor.y - beacon.y);
}

function getEdges(sensor, beacon) {
  const { x, y } = sensor;
  const distance = getDistance(sensor, beacon);

  return {
    horizontal: { start: { x: x - distance, y }, end: { x: x + distance, y } },
    vertical: { start: { x, y: y - distance }, end: { x, y: y + distance } }
  }
}

function getRow(sensor, beacon, rowNumber) {
  const { horizontal, vertical } = getEdges(sensor, beacon);
  const distance = getDistance(sensor, beacon);

  if (rowNumber < vertical.start.y || rowNumber > vertical.end.y) {
    return null;
  }

  const verticalShift = Math.abs(horizontal.start.y - rowNumber);
  const horizontalShift = distance - verticalShift;

  return {
    start: horizontal.start.x + verticalShift,
    end: horizontal.start.x + verticalShift + horizontalShift * 2
  }
}

function canBeMerged(segment1, segment2) {
  return segment2.end - segment1.start >= -1 && segment1.end - segment2.start >= -1;
}

function mergeTwoSegments(segment1, segment2) {
  return { start: Math.min(segment1.start, segment2.start), end: Math.max(segment1.end, segment2.end) }
}

function mergeSegments(segments) {
  return segments.reduce((acc, currentSegment) => {
    for (let i = 0; i < acc.length; i++) {
      if (canBeMerged(acc[i], currentSegment)) {
        acc[i] = mergeTwoSegments(acc[i], currentSegment);

        return acc;
      }
    }

    return [...acc, currentSegment];
  }, []);
}

function mergeAllSegments(segments) {
  const updatedSegments = mergeSegments(segments);

  return segments.length === updatedSegments.length ? segments : mergeAllSegments(updatedSegments);
}

function countOccupiedPointsInRow(data, rowNumber) {
  const occupiedCells = data.reduce((acc, line) => {
    const { sensor, beacon } = line;

    if (sensor.y === rowNumber) {
      acc.add(sensor.x);
    }

    if (beacon.y === rowNumber) {
      acc.add(beacon.x);
    }

    return acc;
  }, new Set());

  return occupiedCells.size;
}
