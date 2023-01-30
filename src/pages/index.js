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
       } from '../js/utils/variables.js';
import { FormValidator } from '../js/components/FormValidator.js';
import { Card } from '../js/components/card.js';
import { initialCards, settingsValidation } from '../js/utils/constants.js';
import Section from '../js/components/Section.js';
import Popup from '../js/components/Popup.js';
import { PopupWithForm } from '../js/components/PopupWithForm.js';
import { UserInfo } from '../js/components/UserInfo.js';

const userInfo = new UserInfo({name: '.profile__name', job: '.profile__text'});

const handleSubmitProfilePopup = (evt, values) => {
    evt.preventDefault();

    userInfo.setUserInfo(values.name, values.job);
    editProfilePopup.close();
}

const handleReturnCard = (name, link) => {
  const cardItem = new Card(name, link, '#element-template', handleCardClick);
    const cardElement = cardItem.generateElement();
    cardsContainer.addItem(cardElement);
}

const cardsContainer = new Section ({
  items: initialCards,
  renderer: (item) => {
        handleReturnCard(item.name, item.link);
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

  handleReturnCard(newElementDisplay.name, newElementDisplay.link);
  addCardPopup.close();
}

const addCardPopup = new PopupWithForm('.popup_add-card', handleAddCard);
addCardPopup.setEventListeners();

const editProfilePopup = new PopupWithForm('.popup_profile', handleSubmitProfilePopup);
editProfilePopup.setEventListeners();

// валидация форм через класс

const popupProfileValidation = new FormValidator(settingsValidation, formEditProfile);
const popupAddCardValidation = new FormValidator(settingsValidation, formAddCard);
popupProfileValidation.enableValidation();
popupAddCardValidation.enableValidation();

// слушатели событий

profileOpenButton.addEventListener('click', () => {
    const { name, job } = userInfo.getUserInfo();
    editProfilePopup.open();
    editProfilePopup.setFormValues({ name, job });
    popupProfileValidation.resetValidation();
});
buttonOpenAdd.addEventListener('click', () => {
  addCardPopup.open();
});

cardsContainer.renderItems();
