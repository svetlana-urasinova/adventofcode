import { input } from './input-example.js';
import { Matrix } from './../../classes/matrix.js';
import { DIRECTIONS } from '../../constants/directions.js';
import { getFilteredNeighbors } from '../../utils/get-filtered-neighbors.js';

const neighborDirections = [DIRECTIONS.Up, DIRECTIONS.Down, DIRECTIONS.Left, DIRECTIONS.Right];

export function main() {
  const part1Answer = part1(input);
  const part2Answer = part2(input);

  return `
        <p>The total price of fencing all regions is <span class="answer">${part1Answer}</span>.</p>        
        <p>The total price of fencing all regions with a bulk discount is <span class="answer">${part2Answer}</span>.</p>        
    `;
}

export function part1(input) {
  const matrix = getInputData(input);

  const regions = buildRegions(matrix);

  return regions.reduce((price, region) => price + calculateArea(region) * calculatePerimeter(region, matrix), 0);
}

export function part2(input) {
  return '(answer)';
}

export function getInputData(input) {
  return new Matrix(input.split('\n').map(line => line.split('')));
}

function buildRegions(matrix) {
  const regions = [];

  for (let row = 0; row < matrix.getHeight(); row++) {
    for (let column = 0; column < matrix.getWidth(); column++) {
      const { value, data } = matrix.getElement({ row, column });

      if (data.visited) {
        continue;
      }

      regions.push(buildRegion([{ row, column }], matrix));
    }
  }

  return regions;
}

function buildRegion(plots, matrix) {
  const region = [];

  for (const plot of plots) {
    const element = { ...matrix.getElement(plot), ...plot };

    if (element.data.visited) {
      continue;
    }

    matrix.updateData(element, { ...element.data, visited: true });
    region.push(element);

    getFilteredNeighbors(element.value, element, neighborDirections, matrix)
      .filter(neighbor => !neighbor.data.visited)
      .forEach(neighbor => {
        const { data } = matrix.getElement(neighbor).data;

        if (!matrix.getElement(neighbor).data?.visited) {
          matrix.updateData(neighbor, { ...neighbor.data, visited: true });

          region.push(...buildRegion([neighbor], matrix));
        }
      });
  }

  return region;
}

function calculateArea(region) {
  return region.length;
}

function calculatePerimeter(region, matrix) {
  return region
    .map(plot =>
      neighborDirections
        .map(direction => matrix.getNeighbor(direction, plot))
        .filter(neighbor => neighbor === null || neighbor.value !== plot.value)
    )
    .reduce((perimeter, sides) => perimeter + sides.length, 0);
}
