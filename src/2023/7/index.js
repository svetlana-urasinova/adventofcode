import { input } from './input.js';

const CARDS_POWER = '23456789TJQKA'.split('').reduce((acc, card, index) => ({ ...acc, [card]: index }), {});

const CARDS_POWER_WITH_JOKER = 'J23456789TQKA'.split('').reduce((acc, card, index) => ({ ...acc, [card]: index }), {});

const JOKER_KEY = 'J';

export function main() {
  const data = getInputData(input);

  const part1Answer = part1(data);
  const part2Answer = part2(data);

  return `
        <p>The total winnings are <span class="answer">${part1Answer}</span>.</p>        
        <p>The total winnings with the joker rule are <span class="answer">${part2Answer}</span>.</p>        
    `;
}

export function part1(data) {
  const sortedData = data.sort((a, b) => handsComparator(a.hand, b.hand, CARDS_POWER, calculateHandPower));

  return sortedData.reduce((sum, entry, index) => sum + entry.bid * (index + 1), 0);
}

export function part2(data) {
  const sortedData = data.sort((a, b) =>
    handsComparator(a.hand, b.hand, CARDS_POWER_WITH_JOKER, calculateHandPowerWithJoker)
  );

  return sortedData.reduce((sum, entry, index) => sum + entry.bid * (index + 1), 0);
}

export function getInputData(data) {
  return data.split('\n').map(line => {
    const [hand, bid] = line.split(' ');

    return { hand: hand.split(''), bid: Number(bid) };
  });
}

function handsComparator(hand1, hand2, cardsPower, callback) {
  const handPowerDiff = callback(hand1) - callback(hand2);

  if (handPowerDiff !== 0) {
    return handPowerDiff;
  }

  for (let i = 0; i < hand1.length; i++) {
    const cardPowerDiff = cardsPower[hand1[i]] - cardsPower[hand2[i]];

    if (cardPowerDiff !== 0) {
      return cardPowerDiff;
    }
  }

  return 0;
}

export function calculateHandPower(hand) {
  const hash = {};

  for (let i = 0; i < hand.length; i++) {
    hash[hand[i]] = hash[hand[i]] ? ++hash[hand[i]] : 1;
  }

  const sortedHandAmounts = Object.values(hash).sort((a, b) => b - a);

  if (sortedHandAmounts[0] === 5) {
    return 6;
  }

  if (sortedHandAmounts[0] === 4) {
    return 5;
  }

  if (sortedHandAmounts[0] === 3) {
    return sortedHandAmounts[1] === 2 ? 4 : 3;
  }

  if (sortedHandAmounts[0] === 2) {
    return sortedHandAmounts[1] === 2 ? 2 : 1;
  }

  return 0;
}

export function calculateHandPowerWithJoker(hand) {
  const hash = {};

  for (let i = 0; i < hand.length; i++) {
    hash[hand[i]] = hash[hand[i]] ? ++hash[hand[i]] : 1;
  }

  const sortedHandAmountsWithoutJoker = Object.keys(hash)
    .filter(key => key !== JOKER_KEY)
    .map(key => hash[key])
    .sort((a, b) => b - a);

  const jokerAmount = hash[JOKER_KEY] ?? 0;

  if ((sortedHandAmountsWithoutJoker[0] ?? 0) + jokerAmount === 5) {
    return 6;
  }

  if (sortedHandAmountsWithoutJoker[0] + jokerAmount === 4) {
    return 5;
  }

  if (sortedHandAmountsWithoutJoker[0] + jokerAmount === 3) {
    return sortedHandAmountsWithoutJoker[1] === 2 ? 4 : 3;
  }

  if (sortedHandAmountsWithoutJoker[0] + jokerAmount === 2) {
    return sortedHandAmountsWithoutJoker[1] === 2 ? 2 : 1;
  }

  return 0;
}
