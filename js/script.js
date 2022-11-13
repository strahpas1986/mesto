// Открытие и закрытие попапа

const close = document.querySelector('.popup__close'),
      open = document.querySelector('.profile__btn-edit'),
      popup = document.querySelector('.popup'),
      saveClose = document.querySelector('.popup__button');

function openPopUp() {
  popup.classList.add('popup_opened');
}

function closePopUp() {
  popup.classList.remove('popup_opened');
}

function closeSavePopUp() {
  popup.classList.remove('popup_opened');
}

open.addEventListener('click', openPopUp);
close.addEventListener('click', closePopUp);

// Кнопка сохранения

// Находим форму в DOM
let formElement = document.querySelector('.popup__container');
// Находим поля формы в DOM
let nameInput = document.querySelector('.popup__name');
let jobInput = document.querySelector('.popup__job');
let profileName = document.querySelector('.profile__name');
let profileText = document.querySelector('.profile__text');


function formSubmitHandler (evt) {
    evt.preventDefault();

    profileName.textContent = nameInput.value;
    profileText.textContent = jobInput.value;

    saveClose.addEventListener('click', closeSavePopUp);

}
formElement.addEventListener('submit', formSubmitHandler);


