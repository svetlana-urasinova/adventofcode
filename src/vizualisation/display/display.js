export class Display {
  _contentElement;

  constructor(selector) {
    this._contentElement = document.querySelector(selector)?.querySelector('.display-content');

    if (!this._contentElement) {
      throw new Error(`[Display] No element for selector "${selector}" is found.`);
    }
  }

  updateElement(content, selector) {
    const element = this._getElement(selector);

    element.innerHTML = '';

    element.append(content);
  }

  clearElement(selector) {
    const element = this._getElement(selector);

    element.innerHTML = '';
  }

  getElementContent(selector) {
    return this._getElement(selector).textContent;
  }

  _getElement(selector) {
    const element = selector ? this._contentElement.querySelector(selector) : this._contentElement;

    if (selector && !element) {
      throw new Error(`[Display] Cannot find element for selector ${selector}`);
    }

    return element;
  }
}
