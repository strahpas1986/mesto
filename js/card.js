import {openPopUp, popupImage} from './index.js';

export class Card {
  constructor(name, link, templateSelector) {
    this._name = name;
    this._link = link;
    this._templateSelector = templateSelector;
    this._element = this._getTemplate();
    this._imageElement = this._element.querySelector('.element__image');
    this._likeElement = this._element.querySelector('.element__like');
    this._elementDelete = this._element.querySelector('.element__delete');
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
    // this._element = this._getTemplate();
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
    this._elementDelete.closest('.element').remove();
  }

   _openPopupImageFull() {
      popupImage.querySelector('.popup__subtitle-img').textContent = this._name;
      popupImage.querySelector('.popup__image').src = this._link;
      popupImage.querySelector('.popup__image').alt = this._name;
      openPopUp(popupImage);
  }

  _setEventListeners() {
    this._likeElement.addEventListener('click', () => {
      this._toggleLike();
    });
    this._elementDelete.addEventListener('click', () => {
      this._deleteElement();
    });
    this._imageElement.addEventListener('click', () => {
      this._openPopupImageFull();
    });
  }
}
