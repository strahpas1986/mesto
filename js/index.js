// Переменные для кнопок открытия попапов

const ButtonsClosePopup = document.querySelectorAll('.popup__close');
const ButtonOpenPopup = document.querySelector('.profile__btn-edit');
const ButtonOpenAdd = document.querySelector('.profile__button');
const openImage = document.querySelector('.element__image');

// Переменные для вызова попапов

const popupEditProfile = document.querySelector('.popup');
const popupAddCard = document.querySelector('.popup_add-card');
const popupImage = document.querySelector('.popup_image-visible');
const saveClose = document.querySelector('.popup__button'); // возможно удалить

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
const addElementInDisplay = document.querySelector('#popup__form_add');
const elementTemplate = document.querySelector('#element-template').content.querySelector('.element');

// Функция открытия

function openPopUp(evt) {
  evt.classList.add('popup_opened');
  // nameInput.value = profileName.textContent;
  // jobInput.value = profileText.textContent;
}

// function openPopupAdd() {
//   popupAddCard.classList.add('popup_opened');
// }

// function openPopupImage() {
//   popupImage.classList.add('popup_opened');
// }

function closePopUp() {
  if (popupEditProfile.classList.contains('popup_opened')) {
    popupEditProfile.classList.remove('popup_opened');
  } else if (popupAddCard.classList.contains('popup_opened')) {
    popupAddCard.classList.remove('popup_opened');
  } else if (popupImage.classList.contains('popup_opened')) {
    popupImage.classList.remove('popup_opened');
  }
}

const handleSubmitProfilePopup = (evt) => {
    evt.preventDefault();

    profileName.textContent = nameInput.value;
    profileText.textContent = jobInput.value;

    closePopUp();
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
  newElement.querySelector('.element__image').addEventListener('click', openPopupImageFull);
  image.addEventListener('click', openPopUp(popupImage));
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

const addNewElement = (evt) => {
  evt.preventDefault();
  const newElementDisplay = {
    name: elementInputTitle.value,
    link: elementInputLink.value
  }

  renderElement(newElementDisplay);
  closePopUp();
}



// слушатели событий

ButtonOpenPopup.addEventListener('click', openPopUp(popupEditProfile));
ButtonOpenAdd.addEventListener('click', openPopUp(popupAddCard));
ButtonsClosePopup.forEach(evt => evt.addEventListener('click', closePopUp));
formElement.addEventListener('submit', handleSubmitProfilePopup);
addElementInDisplay.addEventListener('submit', addNewElement);
