import { DIRECTIONS } from '../../../constants/directions.js';
import { delay } from '../../../utils/delay.js';
import { getRandomArrayElement } from '../../../utils/get-random-array-element.js';
import { getInitialGuardPosition, getInputData, isObstacle, updateGuardPosition } from '../index.js';
import { input } from '../input-example.js';

const DELAY_TIME = 500;

const OBSTACLES = [
  'barrel1.png',
  'barrel2.png',
  'barrel3.png',
  'boxes1.png',
  'boxes2.png',
  'cabinet1.png',
  'chair1.png',
  'chair2.png',
  'chest1.png',
  'chest2.png',
  'drawer1.png',
  'drawer2.png',
  'lights1.png',
  'mannequin1.png',
  'mannequin2.png',
  'mannequin3.png',
  'mannequin4.png',
  'mannequin5.png',
  'rolls1.png',
  'shelf1.png',
  'shelf2.png',
  'shelf3.png',
  'table1.png',
  'table2.png',
  'table3.png',
  'table4.png',
  'table5.png',
];

const lab = document.querySelector('#lab');

const cells = lab.querySelectorAll('div');

const matrix = getInputData(input);

const initialGuardPosition = getInitialGuardPosition(matrix);

window.onload = async () => {
  createObstacles();

  await makeGuardMove();
};

function createObstacles() {
  for (let row = 0; row < matrix.getHeight(); row++) {
    for (let column = 0; column < matrix.getWidth(); column++) {
      const coordinates = { row, column };

      const { value } = matrix.getElement(coordinates);

      if (isObstacle(value)) {
        const index = matrix.getIndexByCoordinates(coordinates);

        const obstacle = createObstacle();

        cells[index].appendChild(obstacle);
      }
    }
  }
}

function addGuard(index, hasObstacle, isFacingRight) {
  const guardElement = document.createElement('div');

  guardElement.classList.add('guard');

  guardElement.id = 'guard';

  if (isFacingRight) {
    guardElement.classList.add('facing-right');
  }

  if (hasObstacle) {
    guardElement.classList.add('stopped');
  } else {
    guardElement.classList.add('walking');
  }

  cells[index].appendChild(guardElement);
}

function deleteGuard(index) {
  lab.querySelector('#guard').remove();
}

function createObstacle() {
  const obstacle = getRandomArrayElement(OBSTACLES);

  const obstacleElement = document.createElement('img');

  obstacleElement.src = `./img/obstacles/${obstacle}`;

  return obstacleElement;
}

function reset() {
  matrix.clearAllData();
}

async function makeGuardMove() {
  let position = initialGuardPosition;

  let isFacingRight = position.direction === DIRECTIONS.Right;

  visitCell(position);

  while (true) {
    await delay(DELAY_TIME);

    deleteGuard();

    position = updateGuardPosition(position, matrix);

    if (!position) {
      return;
    }

    if (position.hasObstacle) {
      if (position.direction === DIRECTIONS.Right) {
        isFacingRight = true;
      }

      if (position.direction === DIRECTIONS.Left) {
        isFacingRight = false;
      }
    }

    visitCell(position, isFacingRight);
  }
}

function visitCell(position, isFacingRight) {
  const index = matrix.getIndexByCoordinates(position);

  addGuard(index, position.hasObstacle, isFacingRight);

  cells[index].classList.add('visited');
}
