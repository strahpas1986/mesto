// Открытие и закрытие попапа

const close = document.querySelector('.popup__close'),
      open = document.querySelector('.profile__btn-edit'),
      popup = document.querySelector('.popup'),
      saveClose = document.querySelector('.popup__button');

function openPopUp() {
  popup.classList.add('popup_opened');
  nameInput.value = profileName.textContent;
  jobInput.value = profileText.textContent;
}

function closePopUp() {
  popup.classList.remove('popup_opened');
}
// Находим форму в DOM
let formElement = document.querySelector('.popup__form');
// Находим поля формы в DOM
let nameInput = document.querySelector('.popup__input_form_name');
let jobInput = document.querySelector('.popup__input_form_job');
let profileName = document.querySelector('.profile__name');
let profileText = document.querySelector('.profile__text');

function formSubmitHandler (evt) {
    evt.preventDefault();

    profileName.textContent = nameInput.value;
    profileText.textContent = jobInput.value;

    closePopUp();
}

open.addEventListener('click', openPopUp);
close.addEventListener('click', closePopUp);
formElement.addEventListener('submit', formSubmitHandler);


