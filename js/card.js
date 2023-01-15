import {openPopUp, popupImage} from './index.js';

export class Card {
  constructor(name, link, templateSelector) {
    this._name = name;
    this._link = link;
    this._templateSelector = templateSelector;
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
    this._element = this._getTemplate();
    this._element.querySelector('.element__image').src = this._link;
    this._element.querySelector('.element__image').title = this._name;
    this._element.querySelector('.element__subtitle').textContent = this._name;
    this._setEventListeners();
    return this._element;
  }

  // функционал лайков

  _toggleLike() {
    this._element.querySelector('.element__like').classList.toggle('element__like_active');
  }

  // функционал удаления карточек

  _deleteElement() {
    this._element.querySelector('.element__delete').closest('.element').remove();
  }

   _openPopupImageFull() {
      openPopUp(popupImage);
      popupImage.querySelector('.element__subtitle').textContent = this._name;
      popupImage.querySelector('.element__image').src = this._link;
      popupImage.querySelector('.element__image').alt = this._name;
  }

  _setEventListeners() {
    this._element.querySelector('.element__like').addEventListener('click', () => {
      this._toggleLike();
    });
    this._element.querySelector('.element__delete').addEventListener('click', () => {
      this._deleteElement();
    });
    this._element.querySelector('.element__image').addEventListener('click', () => {
      this._openPopupImageFull();
    });
  }
}
