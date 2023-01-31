import Popup from "./Popup.js";

export class PopupWithImage extends Popup {
  open(name, link) {
    const popupImageFull = this._popup.querySelector('.popup__image');
    const popupSubtitleImage = this._popup.querySelector('.popup__subtitle-img');
    popupImageFull.src = link;
    popupImageFull.alt = name;
    popupSubtitleImage.textContent = name;
    super.open();
  }
}
