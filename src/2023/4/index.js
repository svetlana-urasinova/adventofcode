import { input } from './input.js';

export function main() {
  const data = getInputData(input);

  const part1Answer = part1(data);
  const part2Answer = part2(data);

  return `
        <p>The pile of the scratchcards is worth <span class="answer">${part1Answer}</span> points.</p>        
        <p>The total number of cards in the end is <span class="answer">${part2Answer}</span>.</p>        
    `;
}

export function part1(cards) {
  let result = 0;

  for (const card of cards) {
    const winningNumbersCount = countWinningNumbers(card);

    result += calculatePoints(winningNumbersCount);
  }

  return result;
}

export function part2(cards) {
  const cardsToTake = {};

  let currentCardIndex = cards.length - 1;

  while (currentCardIndex >= 0) {
    const currentCard = cards[currentCardIndex];

    const winningNumbersCount = countWinningNumbers(currentCard);

    cardsToTake[currentCardIndex] = 1;

    for (let i = currentCardIndex + 1; i <= currentCardIndex + winningNumbersCount; i++) {
      cardsToTake[currentCardIndex] += cardsToTake[i];
    }

    currentCardIndex--;
  }

  return Object.values(cardsToTake).reduce((sum, num) => sum + num);
}

export function getInputData(data) {
  return data.split('\n').map(line => {
    const groups = line.match(/^Card\s+\d+:\s(?<winning>[\d|\s]+)\s\|\s(?<own>[\d|\s]+)$/).groups;

    return {
      winning: parseArrayString(groups.winning),
      own: parseArrayString(groups.own),
    };
  });
}

function parseArrayString(str) {
  return str
    .split(/\s+/)
    .filter(Boolean)
    .map(value => Number(value))
    .sort((a, b) => a - b);
}

function countWinningNumbers(card) {
  const { winning, own } = card;

  let counter = 0;
  let i = 0;
  let j = 0;

  while (i < winning.length && j < own.length) {
    if (winning[i] === own[j]) {
      counter++;
      i++;
      j++;
    }

    if (winning[i] < own[j]) {
      i++;
    }

    if (winning[i] > own[j]) {
      j++;
    }
  }

  return counter;
}

function calculatePoints(winningNumbersCount) {
  if (!winningNumbersCount) {
    return 0;
  }

  return Math.pow(2, winningNumbersCount - 1);
}
