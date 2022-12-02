import { input } from './input.js';

export function main() {
  const data = getInputData(input);

  const part1Answer = part1(data);
  const part2Answer = part2(data);

  return `
        <p>If you were follow the strategy guide, your total score would be <span class="answer">${part1Answer}</span>.</p>        
        <p>If you correctly decrypte the strategy guide and follow it, your total score would be <span class="answer">${part2Answer}</span>.</p>        
    `;
}

const OUTCOME_SCORE = {
  Win: 6,
  Draw: 3,
  Lose: 0
}

const SHAPE_SCORE = {
  rock: 1,
  paper: 2,
  scissors: 3
}

const COMBOS = {
  rock: {
    rock: OUTCOME_SCORE.Draw,
    paper: OUTCOME_SCORE.Win,
    scissors: OUTCOME_SCORE.Lose,
  },
  paper: {
    rock: OUTCOME_SCORE.Lose,
    paper: OUTCOME_SCORE.Draw,
    scissors: OUTCOME_SCORE.Win,
  },
  scissors: {
    rock: OUTCOME_SCORE.Win,
    paper: OUTCOME_SCORE.Lose,
    scissors: OUTCOME_SCORE.Draw,
  }
}

const RIVAL_TURNS = {
  A: 'rock',
  B: 'paper',
  C: 'scissors'
}

export function part1(data) {
  return data.map(round => countScore1(round)).reduce((sum, num) => sum + num);
}

export function part2(data) {
  return data.map(round => countScore2(round)).reduce((sum, num) => sum + num);
}

export function getInputData(data) {
  return data.split('\n').map(line => {
    const [rival, you] = line.split(' ');

    return { rival, you }
  });
}

function countScore1(round) {
  const { rival, you } = round;

  const YOUR_TURNS = {
    X: 'rock',
    Y: 'paper',
    Z: 'scissors'
  }

  const yourTurn = YOUR_TURNS[you];
  const rivalTurn = RIVAL_TURNS[rival];

  return COMBOS[rivalTurn][yourTurn] + SHAPE_SCORE[yourTurn];
}

function countScore2(round) {
  const { rival, you } = round;

  const OUTCOMES = {
    X: OUTCOME_SCORE.Lose,
    Y: OUTCOME_SCORE.Draw,
    Z: OUTCOME_SCORE.Win
  }

  const rivalTurn = RIVAL_TURNS[rival];
  const yourTurn = Object.keys(COMBOS[rivalTurn]).find(key => COMBOS[rivalTurn][key] === OUTCOMES[you]);

  return COMBOS[rivalTurn][yourTurn] + SHAPE_SCORE[yourTurn];
}