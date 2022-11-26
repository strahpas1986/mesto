const close = document.querySelectorAll('.popup__close'),
      open = document.querySelector('.profile__btn-edit'),
      openAddBtn = document.querySelector('.profile__button'),
      popup = document.querySelector('.popup'),
      popupAdd = document.querySelector('.popup_add'),
      saveClose = document.querySelector('.popup__button');

let formElement = document.querySelector('.popup__form');
let nameInput = document.querySelector('.popup__input_form_name');
let jobInput = document.querySelector('.popup__input_form_job');
let profileName = document.querySelector('.profile__name');
let profileText = document.querySelector('.profile__text');
let titleInput = document.querySelector('.popup__input_form_title');
let linkInput = document.querySelector('.popup__input_form_link');

function openPopUp() {
  popup.classList.add('popup_opened');
  nameInput.value = profileName.textContent;
  jobInput.value = profileText.textContent;
}

function openPopupAdd() {
  popupAdd.classList.add('popup_opened');
}

function closePopUp() {
  if (popup.classList.contains('popup_opened')) {
    popup.classList.remove('popup_opened');
  } else if (popupAdd.classList.contains('popup_opened')) {
    popupAdd.classList.remove('popup_opened');
  }
}

function formSubmitHandler (evt) {
    evt.preventDefault();

    profileName.textContent = nameInput.value;
    profileText.textContent = jobInput.value;

    closePopUp();
}

open.addEventListener('click', openPopUp);
openAddBtn.addEventListener('click', openPopupAdd);
close.forEach(evt => evt.addEventListener('click', closePopUp));
formElement.addEventListener('submit', formSubmitHandler);


