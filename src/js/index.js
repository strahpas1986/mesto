// import '../pages/index.css';
import { FormValidator } from './components/FormValidator.js';
import { Card } from './components/card.js';
import { initialCards, settings } from './constants.js';
import Section from './components/Section.js';
import Popup from './components/Popup.js';
import { PopupWithForm } from './components/PopupWithForm.js';
import { UserInfo } from './components/UserInfo.js';

// Переменные для кнопок открытия попапов

const profileOpenButton = document.querySelector('.profile__btn-edit');
const addOpenButton = document.querySelector('.profile__button');

// Переменные для вызова попапов

const popups = document.querySelectorAll('.popup');
const popupEditProfile = document.querySelector('.popup_profile');
const popupAddCard = document.querySelector('.popup_add-card');
export const popupImage = document.querySelector('.popup_image-visible');
export const popupImageFull = popupImage.querySelector('.popup__image');
export const popupSubtitleImage = popupImage.querySelector('.popup__subtitle-img');

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

// Открытие попапа добавления карточки через класс Popup

const addElementPopup = new Popup('.popup_add-card');

addElementPopup.setEventListeners();

const openProfilePopup = new Popup('.popup_profile');

openProfilePopup.setEventListeners();

// Реализация PopupWidthForm

const userInfo = new UserInfo({name: '.profile__name', job: '.profile__text'});

const handleSubmitProfilePopup = (evt, values) => {
    evt.preventDefault();

    userInfo.setUserInfo(values.name, values.job);
    editProfilePopup.close();
}

const elementList = new Section ({
  items: initialCards,
  renderer: (item) => {
    const element = new Card(item.name, item.link, '#element-template', handleCardClick);
    const elementContainer = element.generateElement();
    elementList.addItem(elementContainer);
  }
}, elementContainer);

// функция открытия попапа с картинкой при клике по карточке

const handleCardClick = (name, link) => {
  addCardPopup.open(name, link);
}

// добавить новую карточку

const handleAddCard = (evt) => {
  evt.preventDefault();
  const newElementDisplay = {
    name: elementInputTitle.value,
    link: elementInputLink.value
  }

  const element = new Card (newElementDisplay.name, newElementDisplay.link, '#element-template', handleCardClick);
  const cardElement = element.generateElement();
  elementContainer.prepend(cardElement);
  addCardPopup.close();

  evt.target.reset();
}

const addCardPopup = new PopupWithForm('.popup_add-card', handleAddCard);
addCardPopup.setEventListeners();

const editProfilePopup = new PopupWithForm('.popup_profile', handleSubmitProfilePopup);
editProfilePopup.setEventListeners();

// валидация форм через класс

const popupProfileValidation = new FormValidator(settings, formEditProfile);
const popupAddCardValidation = new FormValidator(settings, formAddCard);
popupProfileValidation.enableValidation();
popupAddCardValidation.enableValidation();

// слушатели событий

profileOpenButton.addEventListener('click', () => {
    const { name, job } = userInfo.getUserInfo();
    editProfilePopup.open();
    editProfilePopup.setFormValues({ name, job });
    popupProfileValidation.resetValidation();
});
addOpenButton.addEventListener('click', () => {
  addElementPopup.open();
});


elementList.renderItems();
