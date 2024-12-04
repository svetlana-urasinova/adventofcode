import { COLORS } from '../colors/colors.js';

export class ColoredTextBlock {
  _contentElement;

  constructor(selector) {
    this._contentElement = document.querySelector(selector);

    if (!this._contentElement) {
      throw new Error(`[ColoredTextBlock] No element for selector "${selector}" is found.`);
    }

    if (!this._contentElement.id) {
      throw new Error(`[ColoredTextBlock] Element id is required.`);
    }
  }

  setContent(input) {
    let total = 0;

    const content = input
      .split('\n')
      .map(line =>
        line
          .split('')
          .map(char => `<span class="with-bgr" id="${this._getCharId(total++)}">${char}</span>`)
          .join('')
      )
      .join('<br>');

    this._contentElement.innerHTML = content;
  }

  clear() {
    this._contentElement.innerHTML = '';
  }

  getChar(index) {
    const id = this._getCharId(index);

    return this._contentElement.querySelector(`#${id}`);
  }

  paintChar(index, color) {
    const char = this.getChar(index);

    if (!char) {
      return;
    }

    char.classList.add(color);
  }

  cleanChar(index, color) {
    const char = this.getChar(index);

    if (!char) {
      return;
    }

    if (color) {
      char.classList.remove(color);
    } else {
      for (const key in COLORS) {
        char.classList.remove(COLORS[key]);
      }
    }
  }

  blink(color, start, end = start) {
    for (let i = start; i <= end; i++) {
      const char = this.getChar(i);

      if (!char) {
        continue;
      }

      this.cleanChar(i);

      char.classList.add(color);
      char.classList.add('blink');
    }
  }

  goToNextChar(index, color = COLORS.White) {
    if (index > 0) {
      this.cleanChar(index - 1, color);
    }

    this.paintChar(index, color);
  }

  _getCharId(index) {
    return `${this._contentElement.id}-char-${index}`;
  }
}
