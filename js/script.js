const initialCards = [
  {
    name: 'Карачаевск',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Гора Эльбрус',
    link: './images/Elbrus.jpg'
  },
  {
    name: 'Домбай',
    link: './images/Dombay.jpg'
  },
  {
    name: 'Карелия',
    link: './images/Karelia.jpg'
  },
  {
    name: 'Камчатка',
    link: './images/Kamchatka.jpg'
  },
  {
    name: 'Карачаево-Черкессия',
    link: './images/Karachaevo.jpg'
  }
];
const close = document.querySelectorAll('.popup__close'),
      open = document.querySelector('.profile__btn-edit'),
      openAddBtn = document.querySelector('.profile__button'),
      openImage = document.querySelector('.element__image'),
      popup = document.querySelector('.popup'),
      popupAdd = document.querySelector('.popup_add'),
      popupImage = document.querySelector('.popup_image'),
      saveClose = document.querySelector('.popup__button');


let formElement = document.querySelector('.popup__form');
let nameInput = document.querySelector('.popup__input_form_name');
let jobInput = document.querySelector('.popup__input_form_job');
let profileName = document.querySelector('.profile__name');
let profileText = document.querySelector('.profile__text');


function openPopUp() {
  popup.classList.add('popup_opened');
  nameInput.value = profileName.textContent;
  jobInput.value = profileText.textContent;
}

function openPopupAdd() {
  popupAdd.classList.add('popup_opened');
}

function openPopupImage() {
  popupImage.classList.add('popup_opened');
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

const openPopupImageFull = (e) => {
  openPopupImage;
  popupImage.querySelector('.popup__subtitle-img').textContent = e.target.closest('.element').querySelector('.element__subtitle').textContent;
  const popupImageFull = popupImage.querySelector('.popup__image');
  popupImageFull.src = e.target.closest('.element').querySelector('.element__image').src;
  popupImageFull.alt = e.target.closest('.element').querySelector('.element__subtitle').textContent;
}

// добавление карточек

const elementContainer = document.querySelector('.elements');
const elementForm = document.querySelector('.popup__form');
const elementInputTitle = document.querySelector('.popup__input_form_title');
const elementInputLink = document.querySelector('.popup__input_form_link');
const addElementInDisplay = document.querySelector('#popup__form_add');

const elementTemplate = document.querySelector('#element-template').content.querySelector('.element');


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
  return newElement;
}

const likeElementButton = (evt) => {
  evt.target.classList.toggle('element__like_active');
}

const deleteElementButton = (evt) => {
  evt.target.closest('.element').remove();
}


const submitAddElementForm = (evt) => {
  evt.preventDefault();
  renderElement({title: input.value}, {link: input.value});
  input.value = '';
}

const renderElement = (item) => {
  elementContainer.prepend(generateElement(item));
};

elementForm.addEventListener('click', submitAddElementForm);

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

  elementContainer.prepend(generateElement(newElementDisplay));
  closePopUp();
}

addElementInDisplay.addEventListener('submit', addNewElement);


open.addEventListener('click', openPopUp);
openAddBtn.addEventListener('click', openPopupAdd);
openImage.addEventListener('click', openPopupImage);
close.forEach(evt => evt.addEventListener('click', closePopUp));
formElement.addEventListener('submit', formSubmitHandler);


