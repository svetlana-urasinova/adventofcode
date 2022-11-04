import { input } from "./input.js";

const BOARD_SIZE = 5;

export function main() {
  const part1Answer = part1(input);
  const part2Answer = part2(input);

  return `
    <p>The board that let you win will have final score of <span class="answer">${part1Answer}</span>.</p>
    <p>The board that let giant squid win will have final score of <span class="answer">${part2Answer}</span>.</p>    
  `;
}

export function part1(input) {
  const inputData = getInputData(input);
  const winners = findWinners(inputData);
  const { board, winningNumber } = winners.find(el => el.place === 1);

  return countScore(board, winningNumber);
}

export function part2(input) {
  const inputData = getInputData(input);
  const winners = findWinners(inputData);
  const { board, winningNumber } = winners.find(el => el.place === winners.length);
  return countScore(board, winningNumber);

}

function getInputData(input) {
  const data = input.trim().split("\n\n");
  console.log(data);
  const numbers = data.shift().split(',').map(str => Number(str));;
  const boards = data.map(str => str.trim().replace("\n", ' ').split(/\s+/).map(str => Number(str)));

  return { numbers, boards }
}

function checkRow(board, x) {
  const filtered = [];
  for (let i = BOARD_SIZE * x; i < BOARD_SIZE * (x + 1); i++) {
    filtered.push(board[i]);
  }

  return filtered.every(el => el === null);
}

const checkColumn = (board, y) => {
  const filtered = [];
  for (let i = y; i < board.length; i += BOARD_SIZE) {
    filtered.push(board[i]);
  }

  return filtered.every(el => el === null);
}

const findWinners = (data) => {
  const { numbers, boards } = data;

  const winners = new Array(boards.length).fill(null);

  let winnersCount = 0;
  let movesCounter = 0;

  while (movesCounter < numbers.length) {
    for (let i = 0; i < boards.length; i++) {
      if (winners[i] === null) {
        const n = boards[i].findIndex(el => el === numbers[movesCounter]);
        boards[i][n] = null;

        const { x, y } = getCoordsByIndex(n);
        if (checkRow(boards[i], x) || checkColumn(boards[i], y)) {
          winnersCount++;
          winners[i] = { board: boards[i], winningNumber: numbers[movesCounter], place: winnersCount };
        }
      }

      if (winnersCount === winners.length) { return winners; }
    }
    movesCounter++;
  }
}

function getCoordsByIndex(index) {
  const x = Math.floor(index / BOARD_SIZE);
  const y = index % BOARD_SIZE;

  return { x, y };
}

function countScore(board, num) {
  return board.filter(num => Boolean(num)).reduce((sum, num) => sum + num) * num;
} 