import { getNeighborCoordinates } from '../utils/get-neighbor-coordinates.js';

export class Matrix {
  _data = [];

  constructor(data) {
    if (!data) {
      throw new Error(`[Matrix] Empty matrix is not allowed`);
    }

    if (!Array.isArray(data) || data.some(line => !Array.isArray(line))) {
      throw new Error(`[Matrix] Invalid matrix: should be a 2-dimensional array`);
    }

    this._data = data;
  }

  getElement(coordinates) {
    return this._data[coordinates.row]?.[coordinates.column];
  }

  getNeighborElement(direction, coordinates, shift = 1) {
    const neighborCoordinates = getNeighborCoordinates(direction, coordinates, shift);

    return this.getElement(neighborCoordinates);
  }

  getWidth() {
    return this._data[0]?.length;
  }

  getHeight() {
    return this._data.length;
  }

  getIndexByCoordinates(coordinates) {
    return coordinates.row * this.getWidth() + coordinates.column;
  }

  checkMatch(direction, coordinates, search) {
    let str = '';

    let currentCoordinates = { ...coordinates };

    for (let i = 0; i < search.length; i++) {
      const currentChar = this.getElement(currentCoordinates);

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
