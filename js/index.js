import { Card } from './card.js';
import { initialCards, settings } from './constants.js';
import Section from './components/Section.js';

// Переменные для кнопок открытия попапов

const profileOpenButton = document.querySelector('.profile__btn-edit');
const addOpenButton = document.querySelector('.profile__button');

// Переменные для вызова попапов

const popups = document.querySelectorAll('.popup');
const popupEditProfile = document.querySelector('.popup_profile');
const popupAddCard = document.querySelector('.popup_add-card');
export const popupImage = document.querySelector('.popup_image-visible');
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
const formEditProfile = document.querySelector('.popup__form_edit-profile');
const formAddCard = document.querySelector('.popup__form_add-card');
const elementInputTitle = document.querySelector('.popup__input_form_title');
const elementInputLink = document.querySelector('.popup__input_form_link');
const elementInDisplayAdd = document.querySelector('#popup__form_add');


// Функция открытия

export const openPopUp = (popup) => {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupButtonEsc);
}

// Функция закрытия

const closePopUp = (popup) => {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupButtonEsc);
}

// Функция закрытия попапа по Esc

const closePopupButtonEsc = (evt) => {
  if (evt.key === 'Escape') {
    const popupOpen = document.querySelector('.popup_opened');
    closePopUp(popupOpen);
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

const elementList = new Section ({
  items: initialCards,
  renderer: (item) => {
    const element = new Card(item.name, item.link, '#element-template');
    const elementContainer = element.generateElement();
    elementList.addItem(elementContainer);
  }
}, elementContainer);

// initialCards.forEach((item) => {

// })

// initialCards.forEach((item) => {
//   const element = new Card(item.name, item.link, '#element-template');
//   const elementContainer = element.generateElement();
//   document.querySelector('.elements').append(elementContainer);
// });

// добавить новую карточку

const handleAddCard = (evt) => {
  evt.preventDefault();
  const newElementDisplay = {
    name: elementInputTitle.value,
    link: elementInputLink.value
  }

  const element = new Card (newElementDisplay.name, newElementDisplay.link, '#element-template');
  const cardElement = element.generateElement();
  elementContainer.prepend(cardElement);
  closePopUp(popupAddCard);
  evt.target.reset();
}

// валидация через класс

const popupProfileValidation = new FormValidator(settings, formEditProfile);
const popupAddCardValidation = new FormValidator(settings, formAddCard);
popupProfileValidation.enableValidation();
popupAddCardValidation.enableValidation();

// слушатели событий

profileOpenButton.addEventListener('click', () => {
  openPopUp(popupEditProfile);
  fillProfileInputs();
  popupProfileValidation.resetValidation();
});
addOpenButton.addEventListener('click', () => {
  openPopUp(popupAddCard);
});

// Закрытие попапов

popups.forEach((popup) => {
  const closePopupIsAll = (evt) => {
    if (evt.target.classList.contains('popup_opened')) {
        closePopUp(popup);
    }
    if (evt.target.classList.contains('popup__close')) {
      closePopUp(popup);
    }
  }
  popup.addEventListener('mousedown', closePopupIsAll);
});

elementList.renderItems();

formElement.addEventListener('submit', handleSubmitProfilePopup);
elementInDisplayAdd.addEventListener('submit', handleAddCard);
