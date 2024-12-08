export class Bubble {
  _element;

  _avatarElement;
  _headerElement;
  _textElement;

  constructor(element) {
    this._element = element;

    this._avatarElement = this._element.querySelector('.bubble-avatar');
    this._headerElement = this._element.querySelector('.bubble-header');
    this._textElement = this._element.querySelector('.bubble-text');
  }

  update(data) {
    this.clear();

    this._headerElement.textContent = data.header;
    this._textElement.textContent = data.text;

    if (data.avatar) {
      this._createAvatar(data.avatar);
    }
  }

  show() {
    this._element.classList.remove('hidden');
  }

  hide() {
    this._element.classList.add('hidden');
  }

  clear() {
    this._headerElement.textContent = '';
    this._textElement.textContent = '';
    this._avatarElement.innerHTML = '';
  }

  _createAvatar(url) {
    const avatar = document.createElement('img');

    avatar.src = url;

    this._avatarElement.innerHTML = '';
    this._avatarElement.appendChild(avatar);
  }
}
