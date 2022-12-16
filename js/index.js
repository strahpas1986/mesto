// Переменные для кнопок открытия попапов

const buttonClosePopup = document.querySelector('.popup__close');
const buttonClosePopupCard = document.querySelector('.popup__close_add-card');
const buttonClosePopupImage = document.querySelector('.popup__close_image-visible');
const buttonOpenPopup = document.querySelector('.profile__btn-edit');
const buttonOpenAdd = document.querySelector('.profile__button');

// Переменные для вызова попапов

const popupElements = document.querySelectorAll('.popup');
const popupEditProfile = document.querySelector('.popup');
const popupAddCard = document.querySelector('.popup_add-card');
const popupImage = document.querySelector('.popup_image-visible');

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
  const popupOpen = document.querySelector('.popup_opened');
  if (evt.key === 'Escape') {
    closePopUp(popupOpen);
  }
}

// Функция закрытия попапа по Overlay

const closePopupButtonOverlay = (evt) => {
  const popupOpen = document.querySelector('.popup_opened');
  if (evt.target === evt.currentTarget) {
    closePopUp(popupOpen);
  }
}

// Функция заполнения профиля

const renderInput = () => {
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
  parentSelector = e.target.closest('.element');
  popupImage.querySelector('.popup__subtitle-img').textContent = parentSelector.querySelector('.element__subtitle').textContent;
  const popupImageFull = popupImage.querySelector('.popup__image');
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
  likeButton.addEventListener('click', likeElementButton);

  const deleteButton = newElement.querySelector('.element__delete');
  deleteButton.addEventListener('click', deleteElementButton);
  image.addEventListener('click', openPopupImageFull);
  image.addEventListener('click', () => {openPopUp(popupImage)});
  return newElement;
}

// функционал лайков

const likeElementButton = (evt) => {
  evt.target.classList.toggle('element__like_active');
}

// функционал удаления карточек

const deleteElementButton = (evt) => {
  evt.target.closest('.element').remove();
}

const renderElement = (item) => {
  elementContainer.prepend(generateElement(item));
};

initialCards.forEach((item) => {
  renderElement(item);
})

// добавить новую карточку

const handleAddCard = (evt) => {
  evt.preventDefault();
  const newElementDisplay = {
    name: elementInputTitle.value,
    link: elementInputLink.value
  }

  renderElement(newElementDisplay);
  closePopUp(popupAddCard);
}

// слушатели событий

buttonOpenPopup.addEventListener('click', () => {
  openPopUp(popupEditProfile);
  renderInput();
});
buttonOpenAdd.addEventListener('click', () => {
  openPopUp(popupAddCard);
});
buttonClosePopup.addEventListener('click', () => closePopUp(popupEditProfile));
buttonClosePopupCard.addEventListener('click', () => closePopUp(popupAddCard));
buttonClosePopupImage.addEventListener('click', () => closePopUp(popupImage));
popupElements.forEach((element) => element.addEventListener('click', closePopupButtonOverlay));
formElement.addEventListener('submit', handleSubmitProfilePopup);
elementInDisplayAdd.addEventListener('submit', handleAddCard);



// сделать импорты переменных
// при закрытии модалки приводить форму к исходному состоянию ???
// отправить на ревью


