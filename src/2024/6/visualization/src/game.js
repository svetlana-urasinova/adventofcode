import { delay } from '../../../../utils/delay.js';
import { OBSTACLES } from './obstacles.js';
import { getInputData, getInitialGuardPosition, updateGuardPosition, isObstacle, NEW_OBSTACLE } from './../../index.js';
import { getRandomArrayElement } from '../../../../utils/get-random-array-element.js';
import { DIRECTIONS } from '../../../../constants/directions.js';

export class Game {
  _container;
  _matrix;
  _initialGuardPosition;
  _active = false;
  _activeLoop = 0;

  _cells = [];
  _delayTime = 500;

  constructor(container, input) {
    this._container = container;

    this._initMatrix(input);
  }

  getInitialGuardPosition() {
    return this._initialGuardPosition;
  }

  createObstacle(coordinates, isNew = false) {
    const index = this._matrix.getIndexByCoordinates(coordinates);

    const obstacle = getRandomArrayElement(OBSTACLES);

    const obstacleElement = document.createElement('img');

    if (isNew) {
      this._matrix.updateValue(coordinates, NEW_OBSTACLE);

      obstacleElement.classList.add('new');
    }

    obstacleElement.src = `./img/obstacles/${obstacle}`;

    this._cells[index].innerHTML = '';
    this._cells[index].appendChild(obstacleElement);
  }

  async makeGuardMove(initialPosition) {
    const activeLoop = this._activeLoop;

    this._active = true;

    let position = { ...initialPosition };

    let isFacingRight = position.direction === DIRECTIONS.Right;

    this._visitCell(position);

    while (true && this._activeLoop === activeLoop && this._active === true) {
      this._deleteGuard();

      if (position.hasObstacle) {
        if (position.direction === DIRECTIONS.Right) {
          isFacingRight = true;
        }

        if (position.direction === DIRECTIONS.Left) {
          isFacingRight = false;
        }
      }

      this._visitCell(position, isFacingRight);

      position = updateGuardPosition(position, this._matrix);

      if (!position) {
        this._deleteGuard();

        return true;
      }

      await delay(this._delayTime);
    }
  }

  stop() {
    this._active = false;
    this._activeLoop = this._activeLoop > 1000 ? 0 : ++this._activeLoop;
  }

  isActive() {
    return this._active;
  }

  async reset() {
    this.stop();

    this._deleteGuard();

    this._matrix.clearAllData();
    this._container.querySelectorAll('div').forEach(div => div.classList.remove('visited'));
  }

  _initMatrix(input) {
    this._matrix = getInputData(input);

    this._initialGuardPosition = getInitialGuardPosition(this._matrix);

    for (let i = 0; i < this._matrix.getWidth() * this._matrix.getHeight(); i++) {
      const cell = document.createElement('div');

      this._cells.push(cell);

      lab.appendChild(cell);
    }

    this._createObstacles();
  }

  _createObstacles() {
    for (let row = 0; row < this._matrix.getHeight(); row++) {
      for (let column = 0; column < this._matrix.getWidth(); column++) {
        const coordinates = { row, column };

        const { value } = this._matrix.getElement(coordinates);

        if (isObstacle(value)) {
          this.createObstacle(coordinates);
        }
      }
    }
  }

  _visitCell(position, isFacingRight) {
    const index = this._matrix.getIndexByCoordinates(position);

    this._addGuard(index, position.hasObstacle, isFacingRight);

    this._cells[index].classList.add('visited');
  }

  _addGuard(index, hasObstacle, isFacingRight) {
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

    this._cells[index].appendChild(guardElement);
  }

  _deleteGuard() {
    lab.querySelector('#guard')?.remove();
  }
}
