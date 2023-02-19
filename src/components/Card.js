export class Card {
  constructor(data,
              templateSelector,
              userId,
              handleCardClick,
              {
                handlePutLike,
                handleDeleteCard
              }
              ) {
    this._data = data;
    this._templateSelector = templateSelector;
    this._element = this._getTemplate();
    this._imageElement = this._element.querySelector('.element__image');
    this._likeElement = this._element.querySelector('.element__like');
    this._elementDelete = this._element.querySelector('.element__delete');
    this._elementLikeNumber = this._element.querySelector('.element__like-number');
    this._userId = userId;
    this._cardId = this._data._id;
    this._handleCardClick = handleCardClick;
    this._handlePutLike = handlePutLike;
    // this._handleDeleteLike = handleDeleteLike;
    this._likes = this._data.likes;
    this._ownerId = this._data.owner._id;
    this._handleDeleteCard = handleDeleteCard;
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
    this._imageElement.src = this._data.link;
    this._imageElement.title = this._data.name;
    this._element.querySelector('.element__subtitle').textContent = this._data.name;
    this._setEventListeners();
    this.renderLikes();



    if (this._ownerId !== this._userId) {
      this._elementDelete.remove();
    }

    return this._element;
  }

  //

  renderLikes() {
    this._elementLikeNumber.textContent = this._likes.length;
  }

  //

  defineLikes() {
    return this._likes.some((like) => like._id === this._userId);
  }

  //

  switchLikes() {
    if (this.defineLikes()) {
      this._likeElement.classList.add("elements__button-like_active");
    } else {
      this._likeElement.classList.remove("elements__button-like_active");
    }
  }

  //

  setLikes(elem) {
    this._likes = elem.likes;
    this._elementLikeNumber.textContent = this._likes.length;
    this.toggleLike();
  }

  // функционал лайков

  toggleLike() {
    this._likeElement.classList.toggle('element__like_active');
  }

  //

  getElementId() {
    return this._cardId;
  }

  // функционал удаления карточек

  deleteElement() {
    if (this._ownerId !== this._userId) {
      this._popupWithDeleteCard();
      this._elementDelete.closest('.element').remove();
    }

  }

  deleteCards() {
    this._element.remove();
    this._element = null;
  }

  _setEventListeners() {
    this._likeElement.addEventListener('click', () => {
      this._handlePutLike();
    });
    this._elementDelete.addEventListener('click', () => {
      this._handleDeleteCard(this._cardId);
    });
    this._imageElement.addEventListener('click', () => {
      this._handleCardClick(this._data.name, this._data.link);
    });


  }
}

