import { input } from './input.js';

export function main() {
  const part1Answer = part1(input);
  const part2Answer = part2(input);

  return `
        <p>Monkey business with relief after 20 rounds is <span class="answer">${part1Answer}</span>.</p>        
        <p>Monkey business without relief after 10000 rounds is <span class="answer">${part2Answer}</span>.</p>        
    `;
}

export function part1(input) {
  const rounds = 20;
  let monkeys = getInputData(input);

  for (let i = 1; i <= rounds; i++) {
    monkeys = roundWithRelief(monkeys);
  }

  return countMonkeyBusiness(monkeys);
}

export function part2(input) {
  const rounds = 10000;
  const data = getInputData(input);
  const divisors = data.map(monkey => monkey.divisor);

  let monkeys = data.map(monkey => ({
    ...monkey, items: monkey.items.map(item => divisors
      .reduce((acc, divisor) => ({ ...acc, [divisor]: item % divisor }), {}))
  }));

  for (let i = 1; i <= rounds; i++) {
    monkeys = roundWithoutRelief(monkeys, divisors);
  }

  return countMonkeyBusiness(monkeys);
}

export function getInputData(data) {
  return data.split("\n\n").map(block => block.split("\n").map(line => {
    const instruction = line.trim();

    switch (true) {
      case instruction.startsWith('Monkey'):
        return { index: parseInt(instruction.replace('Monkey', '')) };
      case instruction.startsWith('Starting items'):
        return { items: instruction.replace('Starting items:', '').trim().split(', ').map(el => Number(el)) };
      case instruction.startsWith('Operation'):
        const { operator, modifier } = instruction.match(/^Operation\:\snew\s\=\sold\s(?<operator>.)\s(?<modifier>.+)$/).groups;

        if (isNaN(parseInt(modifier))) {
          return { operator, modifier }
        } else {
          return { operator, modifier: Number(modifier) }
        }
      case instruction.startsWith('Test'):
        return { divisor: Number(instruction.replace('Test: divisible by ', '')) }
      case instruction.startsWith('If true'):
        return { ifTrue: Number(instruction.replace('If true: throw to monkey', '')) }
      case instruction.startsWith('If false'):
        return { ifFalse: Number(instruction.replace('If false: throw to monkey', '')) }
      default:
        return line;
    }
  })).map(monkey => {
    return { ...monkey.reduce((acc, el) => ({ ...acc, ...el }), {}), inspected: 0 };
  });
}

function roundWithRelief(monkeys) {
  const updatedMonkeys = [...monkeys];

  for (const monkey of updatedMonkeys) {
    const { index, items, operator, modifier, divisor, ifTrue, ifFalse } = monkey;

    while (items.length > 0) {
      updatedMonkeys[index].inspected++;

      const item = items.shift();
      const updatedItem = Math.floor(updateItem(item, operator, modifier) / 3);

      if (updatedItem % divisor === 0) {
        updatedMonkeys[ifTrue].items.push(updatedItem);
      } else {
        updatedMonkeys[ifFalse].items.push(updatedItem);
      }
    }
  };

  return updatedMonkeys;
}

function roundWithoutRelief(monkeys, divisors) {
  const updatedMonkeys = [...monkeys];

  for (const monkey of updatedMonkeys) {
    const { index, items, operator, modifier, divisor, ifTrue, ifFalse } = monkey;

    while (items.length > 0) {
      updatedMonkeys[index].inspected++;

      const remainders = monkey.items.shift();

      for (const possibleDivisor of divisors) {
        const updatedItem = updateItem(remainders[possibleDivisor], operator, modifier);
        remainders[possibleDivisor] = updatedItem % possibleDivisor;
      }

      const newOwnerIndex = remainders[divisor] % divisor === 0 ? ifTrue : ifFalse;
      updatedMonkeys[newOwnerIndex].items.push(remainders);
    }
  };

  return updatedMonkeys;
}

function updateItem(item, operator, modifier) {
  const updatedModifier = modifier === 'old' ? item : modifier;

  switch (operator) {
    case '+':
      return item + updatedModifier;
    case '-':
      return item - updatedModifier;
    case '*':
      return item * updatedModifier;
  }
}

function countMonkeyBusiness(monkeys) {
  return monkeys.sort((a, b) => b.inspected - a.inspected).slice(0, 2).reduce((production, monkey) => production * monkey.inspected, 1);
}