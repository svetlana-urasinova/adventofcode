import { input } from './input.js';

export function main() {
  const data = getInputData(input);

  const part1Answer = part1(data);
  const part2Answer = part2(data);

  return `
        <p><span class="answer">${part1Answer}</span></p>        
        <p><span class="answer">${part2Answer}</span></p>        
    `;
}

export function part1(data) {
  let octopuses = data;
  let flashes = 0;

  for (let i = 0; i < 100; i++) {
    const res = makeStep(octopuses, flashes);

    octopuses = res.octopuses;
    flashes = res.flashes;
  }

  return flashes;
}

export function part2(data) {
  let octopuses = data;
  let flashes = 0;
  let step = 0;
  let isSynchronized = false;

  while (!isSynchronized) {
    step++;
    const res = makeStep(octopuses, flashes);
    octopuses = res.octopuses;
    isSynchronized = checkIfSynchronized(octopuses);
  }

  return step;
}

export function getInputData(data) {
  return data.split("\n").map(line => line.split('').map(num => { return { energy: +num, canFlash: true } }));
}

function updateOctopus(octopus) {
  let flash = false;

  if (octopus.canFlash === true) {
    if (octopus.energy < 9) {
      octopus.energy++;
    } else {
      octopus.energy = 0;
      octopus.canFlash = false;
      flash = true;
    }
  }
  return { octopus, flash }
}

const makeStep = (octopuses, flashes) => {
  octopuses = octopuses.map(str => str.map(el => {
    return { ...el, canFlash: true };
  }));

  flashes = iterate(octopuses, flashes);

  return { octopuses, flashes };
}

const iterate = (octopuses, flashes, x = null, y = null) => {
  const i_min = x === null ? 0 : Math.max(x - 1, 0);
  const i_max = x === null ? octopuses.length : Math.min(x + 2, octopuses.length);
  const j_min = y === null ? 0 : Math.max(y - 1, 0);
  const j_max = y === null ? octopuses[0].length : Math.min(y + 2, octopuses[0].length);

  for (let i = i_min; i < i_max; i++) {
    for (let j = j_min; j < j_max; j++) {
      const res = updateOctopus(octopuses[i][j]);
      if (res.flash) {
        flashes++;
        flashes = iterate(octopuses, flashes, i, j);
      }
    }
  }

  return flashes;
}

function checkIfSynchronized(octopuses) {
  return octopuses.every(line => line.every(octopus => octopus.energy === 0));
}
