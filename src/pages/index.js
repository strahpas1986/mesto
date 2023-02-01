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
import { UserInfo } from '../components/UserInfo.js';

const popupOpenImage = new PopupWithImage('.popup_image-visible');
popupOpenImage.setEventListeners();

const handleCardClick = (name, link) => {
  popupOpenImage.open(name, link);
}

const userInfo = new UserInfo({name: '.profile__name', job: '.profile__text'});

const handleSubmitProfilePopup = (evt, values) => {
    evt.preventDefault();

    userInfo.setUserInfo(values.name, values.job);
    popupEditProfile.close();
}

const createCard = (name, link) => {
  const cardItem = new Card(name, link, '#element-template', handleCardClick);
    const cardElement = cardItem.generateElement();

  return cardElement;

}

const insertCard = (elem) => {
  cardsContainer.addItem(elem);
}

const cardsContainer = new Section ({
  items: initialCards,
  renderer: (item) => {
        createCard(item.name, item.link);
        insertCard(createCard(item.name, item.link));
  }
}, elementContainer);

// добавить новую карточку

const handleAddCard = (evt) => {
  evt.preventDefault();
  const newElementDisplay = {
    name: elementInputTitle.value,
    link: elementInputLink.value
  }


  insertCard(createCard(newElementDisplay.name, newElementDisplay.link))
  popupAddCard.close();
}

const popupAddCard = new PopupWithForm('.popup_add-card', handleAddCard);
popupAddCard.setEventListeners();

const popupEditProfile = new PopupWithForm('.popup_profile', handleSubmitProfilePopup);
popupEditProfile.setEventListeners();

// валидация форм через класс

const popupProfileValidation = new FormValidator(settingsValidation, formEditProfile);
const popupAddCardValidation = new FormValidator(settingsValidation, formAddCard);
popupProfileValidation.enableValidation();
popupAddCardValidation.enableValidation();

// слушатели событий

profileOpenButton.addEventListener('click', () => {
    const { name, job } = userInfo.getUserInfo();
    popupEditProfile.open();
    popupEditProfile.setFormValues({ name, job });
    popupProfileValidation.resetValidation();
});
buttonOpenAdd.addEventListener('click', () => {
  popupAddCard.open();
});

cardsContainer.renderItems();
