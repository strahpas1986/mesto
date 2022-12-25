// Переменные для кнопок открытия попапов

const closeButton = document.querySelector('.popup__close');
const profileOpenButton = document.querySelector('.profile__btn-edit');
const addOpenButton = document.querySelector('.profile__button');

// Переменные для вызова попапов

const popups = document.querySelectorAll('.popup');
const popupEditProfile = document.querySelector('.popup_profile');
const popupAddCard = document.querySelector('.popup_add-card');
const popupImage = document.querySelector('.popup_image-visible');
const popupImageFull = popupImage.querySelector('.popup__image');
const popupSubtitleImage = popupImage.querySelector('.popup__subtitle-img');

// Переменные для работы с формой

const formElement = document.querySelector('.popup__form');
const nameInput = document.querySelector('.popup__input_form_name');
const jobInput = document.querySelector('.popup__input_form_job');
const profileName = document.querySelector('.profile__name');
const profileText = document.querySelector('.profile__text');

// Переменные для добавление карточек

const elementContainer = document.querySelector('.elements');
const elementForm = document.querySelector('.popup__form');
const elementInputTitle = document.querySelector('.popup__input_form_title');
const elementInputLink = document.querySelector('.popup__input_form_link');
const elementInDisplayAdd = document.querySelector('#popup__form_add');
const elementTemplate = document.querySelector('#element-template').content.querySelector('.element');

// Функция открытия

const openPopUp = (popup) => {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupButtonEsc);
}
// Функция закрытия

const closePopUp = (popup) => {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupButtonEsc)
}

// Функция закрытия попапа по Esc

const closePopupButtonEsc = (evt) => {
  if (evt.key === 'Escape') {
    const popupOpen = document.querySelector('.popup_opened');
    closePopUp(popupOpen);
  }
}

// Функция закрытия попапа по Overlay

const closePopupButtonOverlay = (evt) => {
  if (evt.target === evt.currentTarget) {
    closePopUp(evt.currentTarget);
  }
}

// Функция заполнения профиля

const fillProfileInputs = () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileText.textContent;
}

const handleSubmitProfilePopup = (evt) => {
    evt.preventDefault();

    profileName.textContent = nameInput.value;
    profileText.textContent = jobInput.value;

    closePopUp(popupEditProfile);
}

const openPopupImageFull = (e) => {
  openPopUp(popupImage);
  const parentSelector = e.target.closest('.element');
  popupSubtitleImage.textContent = parentSelector.querySelector('.element__subtitle').textContent;
  popupImageFull.src = parentSelector.querySelector('.element__image').src;
  popupImageFull.alt = parentSelector.querySelector('.element__subtitle').textContent;
}

// клонирование карточек

const generateElement = (item) => {
  const newElement = elementTemplate.cloneNode(true);
  const title = newElement.querySelector('.element__subtitle');
  title.textContent = item.name;
  const image = newElement.querySelector('.element__image');
  image.src = item.link;
  image.alt = item.name;

  const likeButton = newElement.querySelector('.element__like');
  likeButton.addEventListener('click', toggleLike);

  const deleteButton = newElement.querySelector('.element__delete');
  deleteButton.addEventListener('click', deleteElement);
  image.addEventListener('click', openPopupImageFull);
  return newElement;
}

// функционал лайков

const toggleLike = (evt) => {
  evt.target.classList.toggle('element__like_active');
}

// функционал удаления карточек

const deleteElement = (evt) => {
  evt.target.closest('.element').remove();
}

const renderElement = (item) => {
  elementContainer.prepend(generateElement(item));
};

initialCards.forEach(renderElement);

// добавить новую карточку

const handleAddCard = (evt) => {
  evt.preventDefault();
  const newElementDisplay = {
    name: elementInputTitle.value,
    link: elementInputLink.value
  }

  renderElement(newElementDisplay);
  closePopUp(popupAddCard);
  evt.target.reset();
}

// слушатели событий

profileOpenButton.addEventListener('click', () => {
  openPopUp(popupEditProfile);
  fillProfileInputs();
});
addOpenButton.addEventListener('click', () => {
  openPopUp(popupAddCard);
});


popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup_opened')) {
          closePopUp(popup);
      }
      if (evt.target.classList.contains('popup__close')) {
        closePopUp(popup);
      }
  })
})

formElement.addEventListener('submit', handleSubmitProfilePopup);
elementInDisplayAdd.addEventListener('submit', handleAddCard);
