export class Card {
  constructor(name, link, templateSelector, handleCardClick) {
    this._name = name;
    this._link = link;
    this._templateSelector = templateSelector;
    this._element = this._getTemplate();
    this._imageElement = this._element.querySelector('.element__image');
    this._likeElement = this._element.querySelector('.element__like');
    this._elementDelete = this._element.querySelector('.element__delete');
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const elementTemplate = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.element')
      .cloneNode(true);

    return elementTemplate;
  }

  // клонирование карточек

  generateElement () {
    this._imageElement.src = this._link;
    this._imageElement.title = this._name;
    this._element.querySelector('.element__subtitle').textContent = this._name;
    this._setEventListeners();
    return this._element;
  }

  // функционал лайков

  _toggleLike() {
    this._likeElement.classList.toggle('element__like_active');
  }

  // функционал удаления карточек

  _deleteElement() {
    // this._popupOpenDeleteCard();
    this._elementDelete.closest('.element').remove();
  }

  _setEventListeners() {
    this._likeElement.addEventListener('click', () => {
      this._toggleLike();
    });
    this._elementDelete.addEventListener('click', () => {
      // this.popupOpenDeleteCard();
      this._deleteElement();
    });
    this._imageElement.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });
  }
}
