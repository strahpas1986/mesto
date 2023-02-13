import '../pages/index.css';
import { profileOpenButton,
         buttonOpenAdd,
         popupImage,
         popupImageFull,
         popupSubtitleImage,
         elementContainer,
         formEditProfile,
         formAddCard,
         elementInputTitle,
         elementInputLink
       } from '../utils/variables.js';
import { FormValidator } from '../components/FormValidator.js';
import { Card } from '../components/Card.js';
import { initialCards, settingsValidation } from '../utils/constants.js';
import Section from '../components/Section.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithImage } from '../components/PopupWithImage';
import { PopupWithDeleteCard } from '../components/PopupWithDeleteCard';
import { UserInfo } from '../components/UserInfo.js';
import { Api } from '../components/Api.js';

const api = new Api({
  serverUrl: "https://mesto.nomoreparties.co/v1/cohort-59",
  headers: {
    authorization: "b185719c-abff-4277-81cb-becf6d2eb2bf",
    "Content-Type": "application/json",
  },
});

let userId;

api.getUserInfo().then(res => {
  userId = res._id;
  userInfo.setUserInfo(res.name, res.about);
});

api.getInitialCards().then(res => {
  cardsContainer.renderItems(res);
})

const popupOpenImage = new PopupWithImage('.popup_image-visible');
popupOpenImage.setEventListeners();

const handleCardClick = (name, link) => {
  popupOpenImage.open(name, link);
}

const userInfo = new UserInfo({name: '.profile__name', about: '.profile__text'});

function handleSubmitProfilePopup(evt, values) {
  evt.preventDefault();
  api.editProfileInfo(values.name, values.about)
    .then(res => userInfo.setUserInfo(res.name, res.about))
  popupEditProfile.close();
}

function createCard(item) {
  const cardItem = new Card(item, '#element-template', userId, handleCardClick);
    const cardElement = cardItem.generateElement();
    cardsContainer.addItem(cardElement);

  return cardElement;

}

function insertCard(elem) {
  cardsContainer.addItem(elem);
}

const cardsContainer = new Section ({
  renderer: (item) => {
        createCard(item);
        insertCard(createCard(item));
  }
}, elementContainer);

// добавить новую карточку

function handleAddCard(evt, {name, link}) {
  evt.preventDefault();
  api.addNewCard(name, link)
    .then((res) => {
      insertCard(createCard(res));

    });
    popupAddCard.close();
}

function handleDeleteCard(evt) {
  evt.preventDefault();
  popupOpenDeleteCard.open();
}

// функция изменения аватара

function handleEditAvatarProfile(evt) {
  evt.preventDefault();
  popupEditAvatar.open();
}

const popupAddCard = new PopupWithForm('.popup_add-card', handleAddCard);
popupAddCard.setEventListeners();

const popupEditProfile = new PopupWithForm('.popup_profile', handleSubmitProfilePopup);
popupEditProfile.setEventListeners();

export const popupOpenDeleteCard = new PopupWithDeleteCard('.popup_delete-card', handleDeleteCard);
popupOpenDeleteCard.setEventListeners();

const popupEditAvatar = new PopupWithForm('.popup_edit-avatar', handleEditAvatarProfile);
popupEditAvatar.setEventListeners();

// валидация форм через класс

const popupProfileValidation = new FormValidator(settingsValidation, formEditProfile);
const popupAddCardValidation = new FormValidator(settingsValidation, formAddCard);
popupProfileValidation.enableValidation();
popupAddCardValidation.enableValidation();

// слушатели событий

profileOpenButton.addEventListener('click', () => {
    const { name, about } = userInfo.getUserInfo();
    popupEditProfile.open();
    popupEditProfile.setFormValues({ name, about });
    popupProfileValidation.resetValidation();
});
buttonOpenAdd.addEventListener('click', () => {
  popupAddCard.open();
});

// cardsContainer.renderItems();


