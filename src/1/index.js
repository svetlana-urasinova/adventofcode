import { input } from './input.js';
export function main() {
  const part1Answer = part1(input);
  const part2Answer = part2(input);

  return `
            <p>The sum of fuel requirements is <span class="answer">${part1Answer}</span>.</p>
            <p>The sum of fuel requirements with taking into account the mass of the added fuel is <span class="answer">${part2Answer}</span>.</p>
          `;
}

function part1(data) {
  return data.trim().split("\n").reduce((sum, massStr) => {
    if (!massStr) { return sum }

    return sum + getFuelAmount(Number(massStr))
  }, 0).toString();
}

function part2(data) {
  return data.trim().split("\n").reduce((sum, massStr) => {
    if (!massStr) { return sum }

    return sum + getUpdatedFuelAmount(Number(massStr))
  }, 0).toString();
}

export function getFuelAmount(mass) {
  return Math.floor(mass / 3) - 2;
}

export function getUpdatedFuelAmount(mass, totalMass = 0) {
  while (mass > 5) {
    mass = getFuelAmount(mass);
    totalMass += mass;
  }

  return totalMass;
}

