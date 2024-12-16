import { getNeighborCoordinates } from '../utils/get-neighbor-coordinates.js';

export class Matrix {
  _matrix = [];

  constructor(matrix) {
    if (!matrix) {
      throw new Error(`[Matrix] Empty matrix is not allowed`);
    }

    if (!Array.isArray(matrix) || matrix.some(line => !Array.isArray(line) || line.length !== matrix[0].length)) {
      throw new Error(`[Matrix] Invalid matrix: should be a 2-dimensional array`);
    }

    for (let row = 0; row < matrix.length; row++) {
      this._matrix[row] = [];

      for (let column = 0; column < matrix[row].length; column++) {
        this._matrix[row][column] = { value: matrix[row][column], data: {} };
      }
    }
  }

  getElement(coordinates) {
    return this._matrix[coordinates.row]?.[coordinates.column];
  }

  getNeighbor(direction, coordinates, shift = 1) {
    const neighborCoordinates = getNeighborCoordinates(direction, coordinates, shift);

    if (!neighborCoordinates) {
      return null;
    }

    const neighbor = this.getElement(neighborCoordinates);

    return neighbor ? { ...neighbor, ...neighborCoordinates } : null;
  }

  updateValue(coordinates, value) {
    const { row, column } = coordinates;

    if (!this._matrix[row]?.[column]) {
      throw new Error(`Cannot update data: element [${(row, column)}] doesn't exist.`);
    }

    this._matrix[row][column].value = value;
  }

  updateData(coordinates, data) {
    const { row, column } = coordinates;

    if (!this._matrix[row]?.[column]) {
      throw new Error(`Cannot update data: element [${(row, column)}] doesn't exist.`);
    }

    this._matrix[row][column].data = data;
  }

  clearAllData() {
    for (let row = 0; row < this.getHeight(); row++) {
      for (let column = 0; column < this.getWidth(); column++) {
        this._matrix[row][column].data = {};
      }
    }
  }

  getWidth() {
    return this._matrix[0]?.length;
  }

  getHeight() {
    return this._matrix.length;
  }

  getIndexByCoordinates(coordinates) {
    return coordinates.row * this.getWidth() + coordinates.column;
  }

  getCoordinatesByIndex(index) {
    const width = this.getWidth();

    return { row: Math.floor(index / width), column: index % width };
  }

  checkMatch(direction, coordinates, search) {
    let str = '';

    let currentCoordinates = { ...coordinates };

    for (let i = 0; i < search.length; i++) {
      const currentChar = this.getElement(currentCoordinates)?.value;

      if (!currentChar) {
        return false;
      }

      str += currentChar;

      if (!search.startsWith(str)) {
        return false;
      }

      currentCoordinates = getNeighborCoordinates(direction, currentCoordinates);
    }

    return str === search;
  }
}
