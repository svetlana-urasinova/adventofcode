import { input } from './input.js';

export function main() {
  const data = getInputData(input);

  const part1Answer = part1(data);
  const part2Answer = part2(data);

  return `
        <p>The sum of the middle page numbers from the correctly ordered updates is <span class="answer">${part1Answer}</span>.</p>        
        <p>The sum of the middle page numbers from the incorrectly ordered updates after ordering them correctly is <span class="answer">${part2Answer}</span>.</p>        
    `;
}

export function part1(data) {
  const { rules, updates } = data;

  return updates.filter(update => isUpdateValid(update, rules)).reduce((sum, update) => sum + getMiddle(update), 0);
}

export function part2(data) {
  const { rules, updates } = data;

  return updates
    .filter(update => !isUpdateValid(update, rules))
    .map(update => sortNumbers(update, rules))
    .reduce((sum, update) => sum + getMiddle(update), 0);
}

export function getInputData(data) {
  const [rulesData, updatesData] = data.split('\n\n');

  const rules = rulesData.split('\n').reduce((acc, line) => {
    const [first, second] = line.split('|');

    acc[first] = [...(acc[first] || []), +second];

    return acc;
  }, {});

  const updates = updatesData.split('\n').map(line => line.split(',').map(number => +number));

  return { rules, updates };
}

function isUpdateValid(update, rules) {
  const sortedNumbers = sortNumbers(update, rules);

  return update.every((number, index) => sortedNumbers[index] === number);
}

function sortNumbers(numbers, rules) {
  return [...numbers].sort(
    (a, b) => getFilteredRule(numbers, rules[b]).length - getFilteredRule(numbers, rules[a]).length
  );
}

function getFilteredRule(numbers, rule) {
  return rule?.filter(numberAfter => numbers.includes(numberAfter)) || [];
}

function getMiddle(numbers) {
  return numbers[Math.floor(numbers.length / 2)];
}
