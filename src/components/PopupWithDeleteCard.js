import Popup from "./Popup.js";

export class PopupWithDeleteCard extends Popup {
  constructor (popupSelector, handlePopupFormSubmit) {
    super(popupSelector);
    this._handlePopupFormSubmit = handlePopupFormSubmit;
    this._popupForm = this._popup.querySelector('.popup__form')
    this._deleteButton = this._popup.querySelector('.popup__button');

  }

  open(cardItem) {
    super.open();
    this._card = cardItem;

  }

  handleFormSubmit(submit) {
    this._handleFormSubmit = submit;
  }

  textButton(text) {
    this._deleteButton.textContent = text;
  }

  setEventListeners() {
    super.setEventListeners();

    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit();
    });
  }
}
