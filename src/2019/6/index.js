import { input } from './input.js';

export function main() {
  const data = getInputData(input);

  const part1Answer = part1(data);
  const part2Answer = part2(data);

  return `
        <p>The total number of direct and indirect orbits in map data is <span class="answer">${part1Answer}</span>.</p>        
        <p>The minimum number of orbital transfers required is <span class="answer">${part2Answer}</span>.</p>        
    `;
}

export function part1(data) {
  const STARTING_POINT = 'COM';

  const orbitChecksums = countOrbits(STARTING_POINT, { [STARTING_POINT]: 0 }, data);

  return Object.values(orbitChecksums).reduce((sum, orbitChecksum) => sum + orbitChecksum);
}

export function part2(data) {
  const STARTING_POINT = 'YOU';
  const FINISH_POINT = 'SAN'

  const planetPaths = findPaths(STARTING_POINT, { [STARTING_POINT]: 0 }, data);

  return planetPaths[FINISH_POINT] - 2;
}

export function getInputData(data) {
  return data.trim().split("\n").map(line => {
    const [planet, sattelite] = line.split(")");

    return { planet, sattelite };
  });
}

function countOrbits(currentPlanet, orbits, data) {
  let updatedOrbits = { ...orbits };
  const planetsWithDirectOrbits = data.filter(line => line.planet === currentPlanet).map(line => line.sattelite);

  for (let planet of planetsWithDirectOrbits) {
    updatedOrbits[planet] = updatedOrbits[currentPlanet] + 1;
    updatedOrbits = countOrbits(planet, updatedOrbits, data);
  }

  return updatedOrbits;
}

function findPaths(currentPlanet, paths, data) {
  let updatedPaths = { ...paths };
  const planetsNeighbors = data.filter(line => line.planet === currentPlanet && paths[line.sattelite] === undefined || line.sattelite === currentPlanet && paths[line.planet] === undefined).map(line => line.sattelite === currentPlanet ? line.planet : line.sattelite);

  for (let planet of planetsNeighbors) {
    updatedPaths[planet] = updatedPaths[currentPlanet] + 1;
    updatedPaths = findPaths(planet, updatedPaths, data);
  }

  return updatedPaths;
}