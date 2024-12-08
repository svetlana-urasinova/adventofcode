import { delay } from '../../../../utils/delay.js';
import { input } from '../../input-example.js';
import { Bubble } from './bubble.js';
import { Game } from './game.js';

const TIME_BEFORE_START = 1000;

const MIN_INPUT_VALUE = 1;
const MAX_INPUT_VALUE = 10;

const GUARD_AVATAR = './img/guard/guard-portrait.png';
const HISTORIANS_AVATAR = './img/historians.jpeg';

const lab = document.querySelector('#lab');
const menu = document.querySelector('#labMenu');

const bubble = new Bubble(document.querySelector('#bubble'));

let game;

window.onload = async () => {
  addInputListeners();
  addButtonListeners();

  game = new Game(lab, input);
};

function addInputListeners() {
  menu.querySelectorAll('.menu-input').forEach(input => {
    input.addEventListener('focus', () => {
      input.classList.remove('error');
    });

    input.addEventListener('input', event => {
      input.classList.remove('error');

      if (event.target.value === '') {
        return;
      }

      event.target.value = convertInputValueToNumber(event.target.value);
    });

    input.addEventListener('change', event => {
      if (event.target.value === '') {
        event.target.value = MIN_INPUT_VALUE;
      }
    });
  });
}

function addButtonListeners() {
  startBubble.querySelector('#startButton').addEventListener('click', async () => {
    startBubble.classList.add('hidden');

    await makeGuardMove(game.getInitialGuardPosition());
  });

  menu.querySelector('#createObstacle').addEventListener('click', async () => {
    if (!game.isActive()) {
      return;
    }

    menu.querySelectorAll('.menu-input').forEach(input => input.classList.remove('error'));

    const { row, column } = getCoordinatesFromForm();

    if (row === null || column === null) {
      return;
    }

    bubble.hide();

    game.createObstacle({ row, column }, true);

    game.reset();

    await makeGuardMove(game.getInitialGuardPosition());
  });

  menu.querySelector('#resetObstacles').addEventListener('click', async () => {
    if (!game.isActive()) {
      return;
    }

    menu.querySelectorAll('.menu-input').forEach(input => input.classList.remove('error'));

    await resetGame();
  });
}

function convertInputValueToNumber(value) {
  const number = Number(value);

  if (!Number.isInteger(number) || Number.isNaN(number) || number < MIN_INPUT_VALUE) {
    return MIN_INPUT_VALUE;
  }

  if (number > MAX_INPUT_VALUE) {
    return MAX_INPUT_VALUE;
  }

  return number;
}

function getCoordinatesFromForm() {
  const rowInput = menu.querySelector(`#newObstacleY`);
  const columnInput = menu.querySelector(`#newObstacleX`);

  const row = getInputValue(rowInput);
  const column = getInputValue(columnInput);

  if (row === undefined || column === undefined) {
    return { row: null, column: null };
  }

  rowInput.value = '';
  columnInput.value = '';

  return { row: +row - 1, column: +column - 1 };
}

function getInputValue(input) {
  const value = input?.value;

  if ((value !== 0 && !value) || value < MIN_INPUT_VALUE || value > MAX_INPUT_VALUE) {
    input.classList.add('error');

    return;
  }

  return value;
}

async function resetGame() {
  game.stop();

  bubble.hide();

  lab.innerHTML = '';

  game = new Game(lab, input);

  const initialPosition = game.getInitialGuardPosition();

  await makeGuardMove(initialPosition);
}

async function makeGuardMove(initialPosition) {
  delay(TIME_BEFORE_START);

  try {
    const result = await game.makeGuardMove(initialPosition);

    if (result) {
      bubble.update({
        header: 'Historians',
        text: 'Hurry up, we must search the laboratory while the guardian is away!',
        avatar: HISTORIANS_AVATAR,
      });

      bubble.show();
    }
  } catch (error) {
    bubble.update({ header: 'Guard', text: error.message, avatar: GUARD_AVATAR });

    bubble.show();
  }
}
