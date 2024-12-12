export function getFilteredNeighbors(filter, coordinates, directions, matrix) {
  const neighbors = [];

  for (const direction of directions) {
    const neighbor = matrix.getNeighbor(direction, coordinates);

    if (neighbor && neighbor.value === filter) {
      neighbors.push(neighbor);
    }
  }

  return neighbors;
}
