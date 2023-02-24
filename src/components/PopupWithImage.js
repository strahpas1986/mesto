import Popup from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImageFull = this._popup.querySelector('.popup__image');
    this._popupSubtitleImage = this._popup.querySelector('.popup__subtitle-img');
  }
  open(name, link) {
    // const popupImageFull = this._popup.querySelector('.popup__image');
    // const popupSubtitleImage = this._popup.querySelector('.popup__subtitle-img');
    this._popupImageFull.src = link;
    this._popupImageFull.alt = name;
    this._popupSubtitleImage.textContent = name;
    super.open();
  }
}
