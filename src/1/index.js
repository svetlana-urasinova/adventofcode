import { input } from './part1-input.js';
export function main() {
  const part1Answer = part1();
  const part2Answer = part2();

  return `
            <p>The sum of fuel requirements is ${part1Answer}.</p>
            <p>The sum of fuel requirements with taking into account the mass of the added fuel is ${part2Answer}.</p>
          `;
}

function part1() {
  return input.trim().split("\n").reduce((sum, massStr) => {
    if (!massStr) { return sum }

    // console.log(sum + BigInt(Math.floor(Number(str) / 3)));
    // return sum + BigInt(Math.floor(Number(str) / 3) - 2)
    console.log(`${massStr} -> ${getFuelAmount(massStr)}`);
    return sum + getFuelAmount(Number(massStr))
  }, 0).toString();
}

function part2() {
  return input.trim().split("\n").reduce((sum, massStr) => {
    if (!massStr) { return sum }

    // console.log(sum + BigInt(Math.floor(Number(str) / 3)));
    // return sum + BigInt(Math.floor(Number(str) / 3) - 2)
    console.log(`${massStr} -> ${getFuelAmount(massStr)}`);
    return sum + getFuelAmount(Number(massStr))
  }, 0).toString();
}

function getFuelAmount(mass) {
  return Math.floor(mass / 3) - 2;
}